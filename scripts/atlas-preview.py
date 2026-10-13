"""Generate the Lab's factual, static 2022 map preview from existing Atlas files.
No downloads. This is a data illustration, not a browser screenshot.
"""
import json, math, sys
from pathlib import Path
from xml.sax.saxutils import escape
root=Path(sys.argv[1]); dest=Path('/private/tmp/lfsa-atlas-preview.svg')
g=json.loads((root/'dist/data/municipalities.geojson').read_text())
e=json.loads((root/'dist/data/elections-2022.json').read_text())
parties={c['id']:c['party'] for c in e['candidates']}
votes={}
for r in e['records']:
 if r[1]=='presidente' and r[2]==2: votes.setdefault(r[0],[]).append((r[4],parties.get(r[3],'')))
def xy(p):
 x,y=p;return ((x+74)*15+100,110-(math.log(math.tan(math.pi/4+math.radians(y)/2))*180/math.pi-5.4)*15)
def simplify(p,t=.65):
 if len(p)<3:return p
 a,b=p[0],p[-1];dx,dy=b[0]-a[0],b[1]-a[1];ll=dx*dx+dy*dy
 ds=[]
 for x,y in p[1:-1]:
  q=max(0,min(1,((x-a[0])*dx+(y-a[1])*dy)/ll)) if ll else 0
  ds.append((x-a[0]-q*dx)**2+(y-a[1]-q*dy)**2)
 k=max(range(len(ds)),key=ds.__getitem__)
 if ds[k]<=t*t:return [a,b]
 k+=1;return simplify(p[:k+1],t)[:-1]+simplify(p[k:],t)
paths=[]
for f in g['features']:
 v=sorted(votes.get(f['properties']['ibge'],[]),reverse=True);color='#aab2be'
 if v and sum(a for a,b in v):
  share=v[0][0]/sum(a for a,b in v);power=max(0,min(1,(share-.5)/.5));base=(194,30,43) if v[0][1]=='PT' else (19,96,186)
  color='#'+''.join(f'{round(225+(a-225)*power):02x}' for a in base)
 geo=f['geometry'];polys=[geo['coordinates']] if geo['type']=='Polygon' else geo['coordinates'];parts=[]
 for poly in polys:
  for ring in poly:
   p=simplify([xy(c) for c in ring]);parts.append('M'+'L'.join(f'{x:.1f},{y:.1f}' for x,y in p)+'Z')
 paths.append(f'<path fill="{color}" d="{"".join(parts)}"/>')
svg='''<svg xmlns="http://www.w3.org/2000/svg" width="1100" height="764" viewBox="0 0 1100 764" role="img" aria-labelledby="title desc"><title id="title">Atlas — Brazil presidential election, 2022 runoff</title><desc id="desc">Municipal winning-candidate map using TSE votes and IBGE geography. Red: Lula, PT. Blue: Bolsonaro, PL. Darker tones indicate a larger local vote share. Static data preview.</desc><rect width="1100" height="764" fill="#fbfbfc"/><rect width="1100" height="76" fill="#061640"/><text x="34" y="49" fill="#f4f4f5" font-family="Arial,sans-serif" font-size="27" font-weight="700">ATLAS</text><text x="166" y="47" fill="#cbd5e1" font-family="Arial,sans-serif" font-size="16">Votes &amp; violence · Brazil</text><text x="1040" y="47" text-anchor="end" fill="#f5c518" font-family="Arial,sans-serif" font-size="15">LFSA DIGITAL</text><text x="788" y="153" fill="#16181d" font-family="Arial,sans-serif" font-size="27" font-weight="700">How Brazil voted</text><text x="788" y="190" fill="#5b6472" font-family="Arial,sans-serif" font-size="16">President · 2022 runoff</text><text x="788" y="219" fill="#5b6472" font-family="Arial,sans-serif" font-size="16">Winner in each municipality</text><g stroke="#fbfbfc" stroke-width=".45" stroke-linejoin="round">'''+''.join(paths)+'''</g><rect x="789" y="288" width="14" height="14" rx="2" fill="#c21e2b"/><text x="817" y="301" font-family="Arial,sans-serif" font-size="17" fill="#16181d">Lula · PT</text><rect x="789" y="326" width="14" height="14" rx="2" fill="#1360ba"/><text x="817" y="339" font-family="Arial,sans-serif" font-size="17" fill="#16181d">Bolsonaro · PL</text><text x="788" y="389" font-family="Arial,sans-serif" font-size="14" fill="#5b6472">Darker = larger local vote share</text><line x1="32" x2="1068" y1="706" y2="706" stroke="#e3e6ec"/><text x="34" y="740" font-family="Arial,sans-serif" font-size="13" fill="#5b6472">Static data preview · Sources: IBGE geography / TSE 2022 election results</text><text x="1065" y="740" text-anchor="end" font-family="Arial,sans-serif" font-size="13" fill="#2278a8">atlas.lfsadigital.com</text></svg>'''
dest.write_text(svg);print(f'{dest}: {dest.stat().st_size} bytes; {len(paths)} municipalities; {len(votes)} vote records by municipality')

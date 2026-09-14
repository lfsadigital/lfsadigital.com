const escapeHtml=value=>String(value).replace(/[&<>"']/g,char=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
const safeHref=value=>/^(?:https:\/\/|[a-z0-9][a-z0-9./?=#-]*$)/i.test(value)?value:'#';
const icon=name=>{
  const paths={
    previous:'<path d="M15 18l-6-6 6-6M9 12h10"/>',
    next:'<path d="m9 18 6-6-6-6M15 12H5"/>',
    external:'<path d="M7 17 17 7M8 7h9v9"/>'
  };
  return `<svg class="ui-icon" aria-hidden="true" viewBox="0 0 24 24">${paths[name]}</svg>`;
};

const index=document.querySelector('#case-index');
const work=document.querySelector('#work');
index.innerHTML=window.CASES.map((item,position)=>`<li><a href="#${escapeHtml(item.id)}" data-index-link="${escapeHtml(item.id)}"><span>${String(position+1).padStart(2,'0')}</span><b>${escapeHtml(item.client)}</b></a></li>`).join('');

work.innerHTML=window.CASES.map((item,position)=>{
  const first=item.media[0];
  const links=item.links.map(link=>`<a class="case-link${link.primary?' primary':''}" href="${escapeHtml(safeHref(link.href))}"${link.href.startsWith('https://')?' target="_blank" rel="noopener noreferrer"':''}>${escapeHtml(link.label)}${icon('external')}</a>`).join('');
  const dots=item.media.map((media,i)=>`<button type="button" class="media-dot" data-slide="${i}" aria-label="Show image ${i+1}: ${escapeHtml(media.caption)}" aria-pressed="${i===0}"></button>`).join('');
  const controls=item.media.length>1?`<div class="media-controls" aria-label="Image controls">
          <button type="button" data-action="previous" aria-label="Previous image">${icon('previous')}</button>
          <button type="button" data-action="toggle">Pause</button>
          <button type="button" data-action="next" aria-label="Next image">${icon('next')}</button>
          <div class="media-dots">${dots}</div>
        </div>`:'';
  return `<article class="case-exhibit" id="${escapeHtml(item.id)}" data-case="${escapeHtml(item.id)}">
    <div class="case-stage">
      <figure class="case-media" data-carousel>
        <a class="media-open" href="${escapeHtml(first.src)}" target="_blank" rel="noopener" aria-label="Open current ${escapeHtml(item.client)} image"><img src="${escapeHtml(first.src)}" alt="${escapeHtml(first.alt)}" ${position===0?'fetchpriority="high"':'loading="lazy"'}></a>
        <figcaption><div class="caption-copy"><span class="media-caption">${escapeHtml(first.caption)}</span>${item.media.length>1?`<span class="media-count">1 / ${item.media.length}</span>`:''}</div>${controls}</figcaption>
        <span class="sr-only media-status" aria-live="polite" aria-atomic="true"></span>
      </figure>
      <section class="case-notes" aria-labelledby="${escapeHtml(item.id)}-title">
        <h2 id="${escapeHtml(item.id)}-title">${escapeHtml(item.title)}</h2>
        <p class="case-meta"><strong>${escapeHtml(item.client)}</strong><span>${escapeHtml(item.type)}</span></p>
        <dl class="case-facts"><div><dt>Problem</dt><dd>${escapeHtml(item.problem)}</dd></div><div><dt>Built</dt><dd>${escapeHtml(item.build)}</dd></div><div><dt>Observed</dt><dd>${escapeHtml(item.output)}</dd></div></dl>
        <p class="case-result">${escapeHtml(item.result)}</p>
        ${links?`<div class="case-links">${links}</div>`:''}
      </section>
    </div>
  </article>`;
}).join('');

const prefersReduced=matchMedia('(prefers-reduced-motion: reduce)');
const carousels=[];
document.querySelectorAll('[data-carousel]').forEach((carousel,casePosition)=>{
  const item=window.CASES[casePosition];
  const image=carousel.querySelector('img');
  const open=carousel.querySelector('.media-open');
  const caption=carousel.querySelector('.media-caption');
  const count=carousel.querySelector('.media-count');
  const toggle=carousel.querySelector('[data-action="toggle"]');
  const status=carousel.querySelector('.media-status');
  const dots=[...carousel.querySelectorAll('[data-slide]')];
  if(item.media.length===1)return;
  const state={index:0,userPaused:prefersReduced.matches,inView:false};
  const update=(next,userInitiated=false)=>{
    state.index=(next+item.media.length)%item.media.length;
    const media=item.media[state.index];
    image.src=media.src;image.alt=media.alt;open.href=media.src;
    open.setAttribute('aria-label',`Open current ${item.client} image: ${media.caption}`);
    caption.textContent=media.caption;count.textContent=`${state.index+1} / ${item.media.length}`;
    dots.forEach((dot,i)=>dot.setAttribute('aria-pressed',String(i===state.index)));
    if(userInitiated)status.textContent=`${item.client}: image ${state.index+1} of ${item.media.length}. ${media.caption}`;
  };
  const setPaused=paused=>{state.userPaused=paused;toggle.textContent=paused?'Play':'Pause';toggle.setAttribute('aria-pressed',String(paused));};
  setPaused(state.userPaused);
  carousel.querySelector('[data-action="previous"]').addEventListener('click',()=>update(state.index-1,true));
  carousel.querySelector('[data-action="next"]').addEventListener('click',()=>update(state.index+1,true));
  toggle.addEventListener('click',()=>setPaused(!state.userPaused));
  dots.forEach(dot=>dot.addEventListener('click',()=>update(Number(dot.dataset.slide),true)));
  const timer=setInterval(()=>{
    const interacting=carousel.matches(':hover')||carousel.contains(document.activeElement);
    if(!state.userPaused&&state.inView&&!document.hidden&&!interacting)update(state.index+1);
  },3000);
  carousels.push({carousel,state,timer,setPaused});
});

const mediaObserver=new IntersectionObserver(entries=>entries.forEach(entry=>{
  const found=carousels.find(item=>item.carousel===entry.target);
  if(found)found.state.inView=entry.isIntersecting&&entry.intersectionRatio>=.4;
}),{threshold:[0,.4,.8]});
carousels.forEach(item=>mediaObserver.observe(item.carousel));

prefersReduced.addEventListener('change',event=>{if(event.matches)carousels.forEach(item=>item.setPaused(true));});

const caseObserver=new IntersectionObserver(entries=>{
  const visible=entries.filter(entry=>entry.isIntersecting).sort((a,b)=>b.intersectionRatio-a.intersectionRatio)[0];
  if(!visible)return;
  document.querySelectorAll('[data-index-link]').forEach(link=>link.setAttribute('aria-current',String(link.dataset.indexLink===visible.target.id)));
},{rootMargin:'-25% 0px -55%',threshold:[0,.2,.5]});
document.querySelectorAll('.case-exhibit').forEach(item=>caseObserver.observe(item));

addEventListener('beforeunload',()=>carousels.forEach(item=>clearInterval(item.timer)));

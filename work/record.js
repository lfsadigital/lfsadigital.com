const escapeHtml=value=>String(value).replace(/\s*\u2014\s*/g,': ').replace(/[&<>"']/g,char=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
const requirementIcon=complete=>complete
  ? '<svg aria-hidden="true" viewBox="0 0 24 24"><path d="M5 12.5 9.2 17 19 7"/></svg>'
  : '<svg aria-hidden="true" viewBox="0 0 24 24"><path d="M12 7.5v6M12 17h.01"/></svg>';
const files=window.EVIDENCE.files;
const firstBase='slack-take-01/history/first-pass/';
const finalBase='slack-take-01/';

function parseCSV(text){
  const rows=[];let row=[],value='',quoted=false;
  for(let i=0;i<text.length;i++){
    const char=text[i];
    if(char==='"'){
      if(quoted&&text[i+1]==='"'){value+='"';i++;}else quoted=!quoted;
    }else if(char===','&&!quoted){row.push(value);value='';}
    else if(char==='\n'&&!quoted){row.push(value.replace(/\r$/,''));if(row.some(Boolean))rows.push(row);row=[];value='';}
    else value+=char;
  }
  if(value||row.length){row.push(value);rows.push(row);}
  const keys=rows[0];
  return rows.slice(1).map(values=>Object.fromEntries(keys.map((key,index)=>[key,values[index]||''])));
}

const firstRows=parseCSV(files[firstBase+'tracker.csv'].text);
const finalRows=parseCSV(files[finalBase+'tracker.csv'].text);
const order=['first','draft','updated'];
const params=new URLSearchParams(location.search);
const requested=params.get('snapshot');
const state={snapshot:order.includes(requested)?requested:'first',view:requested==='draft'?'followups':'review',client:'cedar'};

const snapshotLabels={first:'First review',draft:'Follow-up',updated:'Updated review'};
const snapshotIndex={first:0,draft:1,updated:2};
const workspaceTitle=document.querySelector('#workspace-title');
const clientList=document.querySelector('#client-list');
const inspection=document.querySelector('#inspection');
const historyPanel=document.querySelector('#history');
const queueCount=document.querySelector('#queue-count');

const currentRows=()=>state.snapshot==='updated'?finalRows:firstRows;
const currentRow=()=>currentRows().find(row=>row.client_id===state.client)||currentRows()[0];
const isReady=row=>row.collection_status.startsWith('READY');
const statusMarkup=(kind,label)=>`<span class="status ${kind}">${escapeHtml(label)}</span>`;

function renderQueue(){
  const rows=currentRows();
  const blocked=rows.filter(row=>!isReady(row)).length;
  queueCount.textContent=state.view==='followups'?(state.snapshot==='updated'?'0 active':'1 draft'):(blocked?`${blocked} blocked`:'3 ready');
  clientList.innerHTML=rows.map(row=>{
    let kind=isReady(row)?'ready':'blocked';
    let label=isReady(row)?'Ready':'Blocked';
    let sub=isReady(row)?'Required coverage present':'Two outstanding items';
    if(state.view==='followups'){
      if(row.client_id==='cedar'&&state.snapshot!=='updated'){kind='draft';label='Draft';sub='Awaiting human review';}
      else if(row.client_id==='cedar'){kind='withdrawn';label='Withdrawn';sub='Never sent';}
      else{kind='ready';label='None';sub='No follow-up needed';}
    }
    return `<button type="button" class="client-row" data-client="${escapeHtml(row.client_id)}" aria-pressed="${row.client_id===state.client}"><strong>${escapeHtml(row.client_name)}</strong>${statusMarkup(kind,label)}<small>${escapeHtml(sub)}</small></button>`;
  }).join('');
}

function evidenceParts(value){
  const split=value.indexOf(':');
  return split<0?{file:'No source file',detail:value}:{file:value.slice(0,split),detail:value.slice(split+1).trim()};
}

function requirement(label,status,evidence){
  const complete=status==='COMPLETE';
  const parts=evidenceParts(evidence);
  return `<article class="requirement"><span class="requirement-icon ${complete?'ready':'blocked'}">${requirementIcon(complete)}</span><div><h3>${escapeHtml(label)}</h3><p>${escapeHtml(parts.detail)}</p><p class="source-path">${escapeHtml(parts.file)}</p></div>${statusMarkup(complete?'ready':'blocked',complete?'Complete':status==='MISSING'?'Missing':'Incomplete')}</article>`;
}

function reviewView(row){
  const ready=isReady(row);
  const cedar=row.client_id==='cedar';
  let sources='';
  if(cedar&&state.snapshot!=='updated'){
    sources=`<div class="source-compare"><article class="source-card claim"><b>Email claim</b><p>“Everything for August should be in your folder now.”</p><small>inputs/cedar/email.txt · 2026-09-07 09:00</small></article><article class="source-card evidence"><b>File evidence</b><p>Bank coverage ends August 15. No Cedar sales export is present in the permitted input folder.</p><small>inputs/cedar/bank-august.txt · tracker first pass</small></article></div>`;
  }else if(cedar){
    sources=`<div class="source-compare"><article class="source-card evidence"><b>Replacement bank statement</b><p>Full August coverage; replaces the partial statement.</p><small>late-arrivals/cedar/bank-august-complete.txt · received 2026-09-07 11:00</small></article><article class="source-card evidence"><b>Sales export</b><p>Full August coverage is now present.</p><small>late-arrivals/cedar/sales-august.txt · received 2026-09-07 11:00</small></article></div>`;
  }else{
    const bank=evidenceParts(row.operating_bank_evidence);const sales=evidenceParts(row.sales_export_evidence);
    sources=`<div class="source-compare"><article class="source-card evidence"><b>Bank source</b><p>${escapeHtml(bank.detail)}</p><small>${escapeHtml(bank.file)}</small></article><article class="source-card evidence"><b>Sales source</b><p>${escapeHtml(sales.detail)}</p><small>${escapeHtml(sales.file)}</small></article></div>`;
  }
  const withdrawal=cedar&&state.snapshot==='updated'?`<div class="resolved-note"><strong>WITHDRAWN: NEVER SENT</strong><span>The former Cedar follow-up is obsolete; both requested items arrived.</span></div>`:'';
  return `<header class="inspection-head"><h2>${escapeHtml(row.client_name)}</h2>${statusMarkup(ready?'ready':'blocked',ready?'Ready for review':'Outstanding documents')}</header><div class="inspection-body"><div class="summary-banner"><strong>${ready?'Required document coverage is present.':'The files contradict the completeness claim.'}</strong><span>${ready?'Bookkeeper review is still required.':'2 items need follow-up.'}</span></div><div class="requirement-list">${requirement('Operating-account bank statement',row.operating_bank_status,row.operating_bank_evidence)}${requirement('Sales export',row.sales_export_status,row.sales_export_evidence)}</div>${sources}${withdrawal}</div>`;
}

function followupView(row){
  if(row.client_id!=='cedar')return `<header class="inspection-head"><h2>${escapeHtml(row.client_name)} follow-up</h2>${statusMarkup('ready','No draft')}</header><div class="empty-state"><div><strong>Nothing to send.</strong><p>This client’s required August coverage is present, so no follow-up draft was created.</p></div></div>`;
  const updated=state.snapshot==='updated';
  const source=updated?finalBase+'follow-up-cedar.txt':firstBase+'follow-up-cedar.txt';
  return `<header class="inspection-head"><h2>${updated?'Cedar withdrawal record':'Cedar follow-up draft'}</h2>${statusMarkup(updated?'withdrawn':'draft',updated?'Never sent':'Awaiting review')}</header><div class="inspection-body"><div class="draft-sheet"><div class="draft-toolbar"><b>${escapeHtml(source.split('/').at(-1))}</b><span>${updated?'Withdrawn record':'Local file'}</span></div><pre>${escapeHtml(files[source].text)}</pre></div><div class="draft-note"><strong>${updated?'No stale request remains active.':'Human approval required.'}</strong><span>${updated?'The replacement files resolved both requested items.':'This viewer contains no send control.'}</span></div></div>`;
}

function activityView(){
  const archive=files[firstBase+'archive-note.md'].text;
  return `<header class="inspection-head"><h2>Preserved first-pass audit trail</h2>${statusMarkup('ready','8 hashes verified')}</header><div class="inspection-body"><div class="summary-banner"><strong>Four first-pass files remain unchanged.</strong><span>Tracker, manager brief, queue and draft</span></div><div class="draft-sheet"><div class="draft-toolbar"><b>archive-note.md</b><span>Saved explanation</span></div><pre>${escapeHtml(archive)}</pre></div><div class="source-compare"><article class="source-card evidence"><b>Original state</b><p>The blocked tracker and unsent draft are preserved under history/first-pass/.</p><small>Four exact file copies</small></article><article class="source-card evidence"><b>Current state</b><p>The live tracker is ready and the live follow-up file records the withdrawal.</p><small>Four current output files</small></article></div></div>`;
}

function renderInspection(){
  const row=currentRow();
  inspection.innerHTML=state.view==='review'?reviewView(row):state.view==='followups'?followupView(row):activityView();
}

function renderHistory(){
  const active=snapshotIndex[state.snapshot];
  historyPanel.innerHTML=`<h2>Saved-run history</h2><ol class="timeline"><li class="${active===0?'active':''}"><b>Files reviewed</b>Email claim checked against document dates. Cedar has two gaps.<time>First-pass inputs</time></li><li class="${active===1?'active':''}"><b>One draft prepared</b>Only Cedar’s missing bank coverage and sales export are requested.<time>Local draft · never sent</time></li><li class="${active===2?'active':''}"><b>Late files resolve gaps</b>Complete files received September 7 at 11:00. Draft withdrawn.<time>Updated outputs</time></li></ol><div class="history-proof"><strong>${state.snapshot==='updated'?'All three clients ready':'Cedar remains blocked in this view'}</strong><p>${state.snapshot==='updated'?'Original first-pass outputs remain preserved and hash-verified.':'This view intentionally shows the original first-pass evidence.'}</p></div>`;
}

function render(){
  workspaceTitle.textContent=snapshotLabels[state.snapshot];
  document.querySelectorAll('[data-snapshot]').forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.snapshot===state.snapshot)));
  document.querySelectorAll('[data-view]').forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.view===state.view)));
  renderQueue();renderInspection();renderHistory();
}

document.querySelectorAll('[data-snapshot]').forEach(button=>button.addEventListener('click',()=>{
  state.snapshot=button.dataset.snapshot;
  state.view=state.snapshot==='draft'?'followups':'review';
  state.client='cedar';
  const url=new URL(location.href);url.searchParams.set('snapshot',state.snapshot);history.replaceState({},'',url);
  render();
}));
document.querySelectorAll('[data-view]').forEach(button=>button.addEventListener('click',()=>{state.view=button.dataset.view;render();}));
clientList.addEventListener('click',event=>{const button=event.target.closest('[data-client]');if(!button)return;state.client=button.dataset.client;render();});

const guide=document.querySelector('#recording-guide');
document.querySelector('#open-guide').addEventListener('click',()=>guide.showModal());
document.addEventListener('keydown',event=>{
  if(guide.open||event.ctrlKey||event.metaKey||event.altKey)return;
  if(!['ArrowLeft','ArrowRight'].includes(event.key))return;
  event.preventDefault();
  const next=Math.max(0,Math.min(2,snapshotIndex[state.snapshot]+(event.key==='ArrowRight'?1:-1)));
  document.querySelector(`[data-snapshot="${order[next]}"]`).click();
});

render();
if(params.get('guide')==='1')guide.showModal();

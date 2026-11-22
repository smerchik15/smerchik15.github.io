(() => {
'use strict';
const data=window.PORTFOLIO;
const $=s=>document.querySelector(s);
const projects=Array.isArray(data.projects)?data.projects:[];
const state={category:'all',id:projects[0]?.id||''};
const kind={tick:'Браузерная игра',forge:'Генератор персонажей',voice:'Голос и речь',workshop:'Идеи и совместная работа'};
function element(tag,cls,text){const n=document.createElement(tag);if(cls)n.className=cls;if(text)n.textContent=text;return n;}
function url(value){try{const u=new URL(value);return ['http:','https:'].includes(u.protocol)?u.href:null;}catch{return null;}}
function external(text,href,cls){const a=element('a',cls,text);a.href=url(href)||'#';a.target='_blank';a.rel='noopener noreferrer';return a;}
function categoryName(p){return kind[p.id]||({games:'Игра',training:'Тренинг',useful:'Приложение',sites:'Сайт/лендинг'}[p.category]||'Проект');}
function icon(p){const n=element('span','project-icon icon-'+p.id);n.setAttribute('aria-hidden','true');if(p.id==='tick'){const img=element('img');img.src='tick-original.svg';img.alt='';n.append(img);}else{n.innerHTML=({forge:'<svg viewBox="0 0 40 40" fill="none"><path d="m20 4 15 9-3 19-12 5L7 30 5 13 20 4Zm0 0-8 13 16 0L20 4ZM5 13l7 4 8 15 8-15 7-4M7 30l13 2 12 0M20 32v5" stroke="currentColor" stroke-width="1.7"/></svg>',voice:'<svg viewBox="0 0 40 40" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"><path d="M7 17v6m7-12v18m6-24v30m6-24v18m7-12v6"/></svg>',workshop:'<svg viewBox="0 0 40 40" fill="none" stroke="currentColor" stroke-width="1.7"><rect x="5" y="5" width="13" height="13" rx="2"/><rect x="23" y="5" width="12" height="21" rx="2"/><rect x="5" y="23" width="13" height="12" rx="2"/><path d="M23 32h12"/></svg>'})[p.id]||'<svg viewBox="0 0 40 40" fill="none" stroke="currentColor" stroke-width="2"><rect x="7" y="7" width="26" height="26" rx="5"/><path d="M14 20h12m-6-6v12"/></svg>';}return n;}
document.querySelectorAll('[data-name]').forEach(n=>n.textContent=data.name);
document.querySelectorAll('[data-github]').forEach(n=>n.href=url(data.github)||'#');
$('#tagline').textContent=(data.tagline||'Личные проекты').replace(new RegExp('^'+data.name+'\\s*\\n'),'');
$('#intro').textContent=data.intro;
$('#about-title').textContent=data.aboutTitle;
$('#about-text').textContent=data.about;
$('#approach-text').textContent=data.approach;
$('#year').textContent=new Date().getFullYear();
try{if(localStorage.getItem('portfolio-work-menu-v1')==='1'){const a=external('Черновик','https://vladislav-work-draft.vladislavmitro.chatgpt.site/','owner-draft-link');a.title='Закрытые рабочие проекты — вход через ChatGPT';$('.main-nav').append(a);}}catch{}
(data.traits||[]).forEach(t=>{const a=element('article','interest');a.append(element('h2','',t.title),element('p','',t.text));$('#traits').append(a);});
function visibleProjects(){return projects.filter(p=>state.category==='all'||p.category===state.category);}
function count(n){return n+' '+(n%10===1&&n%100!==11?'проект':n%10>=2&&n%10<=4&&(n%100<12||n%100>14)?'проекта':'проектов');}
function updateHash(id){history.replaceState(null,'','#/project/'+encodeURIComponent(id));}
function renderTabs(focusId){
 const list=visibleProjects(),tabs=$('#project-tabs');tabs.replaceChildren();
 list.forEach(p=>{const selected=p.id===state.id;const b=element('button','project-tab');b.type='button';b.id='project-tab-'+p.id;b.setAttribute('role','tab');b.setAttribute('aria-selected',String(selected));b.setAttribute('aria-controls','project-panel');b.tabIndex=selected?0:-1;
 const title=element('span','project-tab-copy');title.append(element('span','project-tab-name',p.title),element('span','project-tab-kind',categoryName(p)));b.append(icon(p),title);
 b.addEventListener('click',()=>select(p.id,true,true));b.addEventListener('keydown',e=>{const current=list.findIndex(x=>x.id===p.id);let index;if(e.key==='ArrowDown'||e.key==='ArrowRight')index=(current+1)%list.length;else if(e.key==='ArrowUp'||e.key==='ArrowLeft')index=(current-1+list.length)%list.length;else if(e.key==='Home')index=0;else if(e.key==='End')index=list.length-1;else return;e.preventDefault();select(list[index].id,true,true);});tabs.append(b);});
 if(focusId)document.getElementById('project-tab-'+focusId)?.focus({preventScroll:true});
 requestAnimationFrame(()=>{if(!matchMedia('(max-width:840px)').matches)return;const active=tabs.querySelector('[aria-selected=true]');if(!active)return;const outer=tabs.getBoundingClientRect(),inner=active.getBoundingClientRect();if(inner.left<outer.left)tabs.scrollLeft+=inner.left-outer.left-3;else if(inner.right>outer.right)tabs.scrollLeft+=inner.right-outer.right+3;});
}
function stage(p){
 const box=element('div','project-stage stage-'+p.id);
 if(p.id==='tick'){const image=element('img','tick-art');image.src='tick-original.svg';image.alt='Оригинальный клещ с янтарным брюшком и зелёным панцирем';image.width=420;image.height=310;box.append(image);}
 else if(p.id==='forge'||p.id==='voice'){const image=element('img','app-preview');image.src=p.id==='forge'?'forge-preview.png':'voice-preview.png';image.alt='Интерфейс '+p.title;image.width=p.id==='forge'?699:855;image.height=p.id==='forge'?662:664;box.append(image);}
 else if(p.id==='sergey-mitrofanov'){const image=element('img','app-preview');image.src='sergey-mitrofanov-preview.jpg';image.alt='Главная страница сайта застройщика Сергея Митрофанова';image.width=1265;image.height=713;box.append(image);}
 else if(p.id==='workshop'){const board=element('div','idea-board');board.setAttribute('aria-label','Идеи, обсуждение и план');const paper=element('div','idea-paper');paper.append(element('span','paper-rule'),element('strong','','Мастерская'),element('span','','Идеи и задачи'));const notes=element('div','idea-notes');['Идея','Обсуждение','План'].forEach(t=>notes.append(element('span','',t)));board.append(paper,notes);box.append(board);}
 else box.append(icon(p),element('span','generic-title',p.title));
 return box;
}
function renderPanel(){
 const panel=$('#project-panel'),p=projects.find(x=>x.id===state.id);panel.replaceChildren();
 if(!p)return;
 panel.setAttribute('aria-labelledby','project-tab-'+p.id);panel.dataset.project=p.id;
 const top=element('div','panel-heading');const title=element('div');title.append(element('p','project-kind',categoryName(p)),element('h2','project-title',p.title));const launch=external(p.cta,p.url,'primary-action');launch.setAttribute('aria-label',p.cta+' — '+p.title);top.append(title,launch);
 const body=element('div','panel-body');body.append(element('p','project-subtitle',p.subtitle),element('p','project-description',p.description));
 panel.append(top,body,stage(p));
 if(p.details?.length){const list=element('ul','capabilities');p.details.forEach(t=>list.append(element('li','',t)));panel.append(list);}
 const bottom=element('div','panel-bottom');const tags=element('div','project-tags');(p.tags||[]).forEach(t=>tags.append(element('span','',t)));bottom.append(tags);
 const actions=element('div','panel-links');const share=element('button','share-button','Скопировать ссылку');share.type='button';const message=element('span','share-status');message.setAttribute('role','status');
 share.addEventListener('click',async()=>{const text=new URL(location.href);text.hash='/project/'+p.id;try{await navigator.clipboard.writeText(text.href);message.textContent='Ссылка скопирована';}catch{message.textContent='Скопируйте адрес из строки браузера';} });
 actions.append(share,message);if(p.source)actions.append(external('Исходники',p.source,'source-link'));bottom.append(actions);panel.append(bottom);
}
function select(id,hash=false,focus=false){if(!projects.some(p=>p.id===id))return;state.id=id;renderTabs(focus?id:null);renderPanel();if(hash)updateHash(id);}
function filter(value){state.category=value;const list=visibleProjects();if(!list.some(p=>p.id===state.id))state.id=list[0]?.id||'';document.querySelectorAll('[data-filter]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.filter===value)));$('#filter-status').textContent=count(list.length);$('.catalog-layout').hidden=!list.length;$('#empty-projects').hidden=!!list.length;renderTabs();renderPanel();}
document.querySelectorAll('[data-filter]').forEach(b=>b.addEventListener('click',()=>{filter(b.dataset.filter);if(state.id)updateHash(state.id);}));
$('#show-all').addEventListener('click',()=>filter('all'));
function route(focus=false){
 const hash=location.hash,about=hash==='#/about';$('#home-page').hidden=about;$('#about-page').hidden=!about;document.title=data.name+(about?' — обо мне':' — личные проекты');
 document.querySelectorAll('[data-nav]').forEach(a=>{if(a.dataset.nav===(about?'about':'projects'))a.setAttribute('aria-current','page');else a.removeAttribute('aria-current');});
 let selected;try{selected=decodeURIComponent(hash.match(/^#\/project\/(.+)$/)?.[1]||'');}catch{}
 if(selected&&projects.some(p=>p.id===selected)){if(!visibleProjects().some(p=>p.id===selected))filter('all');select(selected);}
 if(about){window.scrollTo(0,0);if(focus)$('#about-title').focus({preventScroll:true});}
 else if(hash==='#projects'){requestAnimationFrame(()=>{$('#projects').scrollIntoView({block:'start'});if(focus){$('#projects').tabIndex=-1;$('#projects').focus({preventScroll:true});}});}
 else window.scrollTo(0,0);
}
const orientation=matchMedia('(max-width:840px)');function syncOrientation(){$('#project-tabs').setAttribute('aria-orientation',orientation.matches?'horizontal':'vertical');renderTabs();}orientation.addEventListener('change',syncOrientation);window.addEventListener('hashchange',()=>route(true));filter('all');syncOrientation();route();
})();
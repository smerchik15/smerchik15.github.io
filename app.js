(() => {
'use strict';
const d=window.PORTFOLIO,$=s=>document.querySelector(s);
function el(tag,cls,txt){const n=document.createElement(tag);if(cls)n.className=cls;if(txt)n.textContent=txt;return n;}
function safeUrl(v){try{const u=new URL(v);return ['https:','http:'].includes(u.protocol)?u.href:'#';}catch{return '#';}}
function link(label,url,cls){const n=el('a',cls,label);n.href=safeUrl(url);n.target='_blank';n.rel='noopener noreferrer';return n;}
document.querySelectorAll('[data-name]').forEach(n=>n.textContent=d.name);
document.querySelectorAll('[data-github]').forEach(n=>n.href=safeUrl(d.github));
[['#tagline','tagline'],['#intro','intro'],['#about-title','aboutTitle'],['#about-text','about'],['#approach-text','approach']].forEach(([s,k])=>$(s).textContent=d[k]);
// Local menu preference only; the linked Site independently requires owner authentication.
try{if(localStorage.getItem('portfolio-work-menu-v1')==='1'){const draftLink=link('Черновик ↗','https://vladislav-work-draft.vladislavmitro.chatgpt.site/','owner-draft-link');draftLink.title='Закрытые рабочие проекты · вход через ChatGPT';document.querySelector('header nav').append(draftLink);}}catch{}
document.title=d.name+' — личные проекты';$('#year').textContent=new Date().getFullYear();
$('#project-count').textContent=String(d.projects.length).padStart(2,'0');
const previews={forge:'forge-preview.png',voice:'voice-preview.png'};
d.projects.forEach((p,i)=>{
 const a=el('article','project'+(p.id==='tick'?' featured':''));a.dataset.category=p.category;
 const visual=link('',p.url,'project-visual cover-'+(['tick','forge','voice'].includes(p.id)?p.id:'generic'));visual.setAttribute('aria-label',p.cta+': '+p.title);
 visual.append(el('span','cover-number',String(i+1).padStart(2,'0')+' / '+({games:'ИГРА',training:'ПРАКТИКА',useful:'ИНСТРУМЕНТ'}[p.category]||'ПРОЕКТ')));
 if(p.id==='tick'){const image=el('img','tick-original');image.src='tick-original.svg';image.alt='Оригинальная иллюстрация клеща из игры';image.loading='lazy';visual.append(image,el('span','cover-label','BLOOD GAINS'));}
 else if(previews[p.id]){const frame=el('div','browser-frame');const bar=el('div','browser-bar');bar.append(el('span','','● ● ●'),el('span','',p.id==='forge'?'Character Forge':'Голос · личная студия'));const image=el('img');image.src=previews[p.id];image.alt='Снимок интерфейса '+p.title;image.loading='lazy';image.width=p.id==='voice'?855:699;image.height=p.id==='voice'?664:662;frame.append(bar,image);visual.append(frame);}
 else visual.append(el('span','generic-name',p.title));
 const body=el('div','project-body');body.append(el('p','eyebrow',p.type),el('h3','',p.title),el('p','project-subtitle',p.subtitle),el('p','project-description',p.description));
 const tags=el('div','tags');p.tags.forEach(t=>tags.append(el('span','',t)));body.append(tags);
 if(p.details?.length){const details=el('details','project-details');details.append(el('summary','','Что внутри'));const list=el('ul');p.details.forEach(t=>list.append(el('li','',t)));details.append(list);body.append(details);}
 const links=el('div','project-links');links.append(link(p.cta+' ↗',p.url,'project-cta'));if(p.source)links.append(link('Исходники ↗',p.source,'source-link'));body.append(links);a.append(visual,body);$('#project-list').append(a);
});
d.traits.forEach((t,i)=>{const n=el('article','trait');n.append(el('span','',String(i+1).padStart(2,'0')),el('h3','',t.title),el('p','',t.text));$('#traits').append(n);});
function countText(n){return n+' '+(n%10===1&&n%100!==11?'проект':n%10>=2&&n%10<=4&&(n%100<12||n%100>14)?'проекта':'проектов');}
function filter(category){let count=0;document.querySelectorAll('[data-filter]').forEach(n=>n.setAttribute('aria-pressed',String(n.dataset.filter===category)));document.querySelectorAll('.project').forEach(n=>{n.hidden=category!=='all'&&n.dataset.category!==category;if(!n.hidden)count++;});$('#filter-status').textContent=countText(count);$('#empty-projects').hidden=count!==0;}
document.querySelectorAll('[data-filter]').forEach(b=>b.addEventListener('click',()=>filter(b.dataset.filter)));
$('.filters sup').textContent=String(d.projects.length).padStart(2,'0');filter('all');
function route(focus=false){const hash=location.hash,about=hash==='#/about';$('#home-page').hidden=about;$('#about-page').hidden=!about;document.querySelectorAll('[data-nav]').forEach(n=>{const current=about?'about':hash==='#projects'?'projects':'';if(n.dataset.nav===current)n.setAttribute('aria-current','page');else n.removeAttribute('aria-current');});const target=about?$('#about-title'):hash==='#projects'?$('#projects'):hash==='#main'?$('#main'):null;requestAnimationFrame(()=>{if(target){target.scrollIntoView({behavior:'instant',block:about?'start':'start'});if(focus){target.setAttribute('tabindex','-1');target.focus({preventScroll:true});}}else window.scrollTo({top:0,behavior:'instant'});});}
window.addEventListener('hashchange',()=>route(true));route();
})();
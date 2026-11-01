(() => {
const d=window.PORTFOLIO, $=s=>document.querySelector(s);
const text=(s,v)=>$(s).textContent=v;
document.querySelectorAll('[data-name]').forEach(x=>x.textContent=d.name);
document.querySelectorAll('[data-github]').forEach(x=>x.href=safeUrl(d.github));
text('#tagline',d.tagline);text('#intro',d.intro);text('#about-title',d.aboutTitle);text('#about-text',d.about);text('#approach-text',d.approach);
document.title=d.name+' — мастерская проектов';
function safeUrl(v){try{const u=new URL(v);return ['https:','http:'].includes(u.protocol)?u.href:'#';}catch{return '#';}}
function el(tag,cls,txt){const n=document.createElement(tag);if(cls)n.className=cls;if(txt)n.textContent=txt;return n;}
const dice='<svg viewBox="0 0 130 120" aria-hidden="true"><path d="M65 7 119 39 109 94 65 115 18 91 10 39Z M65 7 38 48 92 48 65 7 M38 48 65 98 92 48 119 39 M10 39 38 48 18 91 65 98 109 94 92 48 M65 98 65 115" fill="none" stroke="currentColor" stroke-width="2"/><text x="65" y="76" text-anchor="middle" fill="currentColor" font-size="28">20</text></svg>';
const waves='<div class="wave" aria-hidden="true">'+ '<i></i>'.repeat(11)+'</div>';
d.projects.forEach((p,i)=>{
 const a=el('article','project');a.dataset.category=p.category;
 const cover=el('div','project-visual cover-'+(p.id==='tick'?'tick':p.id==='forge'?'forge':'voice'));
 cover.setAttribute('aria-hidden','true');
 cover.innerHTML='<span class="cover-number">0'+(i+1)+' / '+({games:'PLAY',useful:'CREATE',training:'PRACTICE'}[p.category]||'PROJECT')+'</span>';
 if(p.id==='tick')cover.innerHTML+='<img class="tick-original" src="tick-original.svg" alt=""><strong>КЛЕЩ</strong><small>BLOOD GAINS</small>';
 else if(p.id==='forge')cover.innerHTML+=dice+'<strong>Character Forge</strong><small>A NEW STORY AWAITS</small>';
 else cover.innerHTML+=waves+'<strong>Голос.</strong>';
 a.append(cover,el('p','project-type',p.type),el('h3','',p.title),el('p','subtitle',p.subtitle),el('p','description',p.description));
 const tags=el('div','tags');p.tags.forEach(t=>tags.append(el('span','',t)));a.append(tags);
 const links=el('div','project-links');const link=el('a','',p.cta+' ↗');link.href=safeUrl(p.url);link.target='_blank';link.rel='noopener noreferrer';links.append(link);
 if(p.source){const src=el('a','','Код ↗');src.href=safeUrl(p.source);src.target='_blank';src.rel='noopener noreferrer';links.append(src);}a.append(links);$('#project-list').append(a);
});
$('.filters sup').textContent=String(d.projects.length).padStart(2,'0');
(d.work||[]).forEach(w=>{const a=el('article','work-item');a.append(el('p','eyebrow',w.label),el('h3','',w.title),el('p','',w.text));if(w.url){const l=el('a','text-link',w.cta+' ↗');l.href=safeUrl(w.url);l.target='_blank';l.rel='noopener noreferrer';a.append(l);}$('#work-list').append(a);});
d.traits.forEach((t,i)=>{const n=el('div','trait');n.append(el('span','','0'+(i+1)),el('h3','',t.title),el('p','',t.text));$('#traits').append(n);});
document.querySelectorAll('[data-filter]').forEach(b=>b.addEventListener('click',()=>{document.querySelectorAll('[data-filter]').forEach(x=>x.setAttribute('aria-pressed',String(x===b)));document.querySelectorAll('.project').forEach(x=>x.hidden=b.dataset.filter!=='all'&&x.dataset.category!==b.dataset.filter);}));
function route(){const about=location.hash==='#/about';$('#home-page').hidden=about;$('#about-page').hidden=!about;document.querySelectorAll('[data-nav]').forEach(n=>{if((n.dataset.nav==='about')===about)n.setAttribute('aria-current','page');else n.removeAttribute('aria-current');});if(location.hash==='#projects')requestAnimationFrame(()=>$('#projects').scrollIntoView());else window.scrollTo(0,0);}
window.addEventListener('hashchange',route);route();
})();
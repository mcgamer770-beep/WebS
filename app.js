'use strict';
document.documentElement.classList.add('js');
const reduced=window.matchMedia('(prefers-reduced-motion: reduce)');
const revealItems=document.querySelectorAll('.reveal');
if('IntersectionObserver' in window){const observer=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target)}})},{threshold:.06});revealItems.forEach(el=>observer.observe(el))}else{revealItems.forEach(el=>el.classList.add('visible'))}
const progress=document.querySelector('.progress');const hero=document.querySelector('.hero-visual>img');let ticking=false;
function updateScroll(){const max=document.documentElement.scrollHeight-innerHeight;progress.style.transform=`scaleX(${max>0?scrollY/max:0})`;if(hero&&!reduced.matches){const rect=hero.parentElement.getBoundingClientRect();if(rect.bottom>0&&rect.top<innerHeight){const offset=Math.max(-60,Math.min(0,-(innerHeight-rect.top)*.045));hero.style.transform=`translateY(${offset}px)`}}ticking=false}
addEventListener('scroll',()=>{if(!ticking){requestAnimationFrame(updateScroll);ticking=true}},{passive:true});addEventListener('resize',updateScroll);updateScroll();
const dialog=document.getElementById('lightbox');const viewImg=document.getElementById('viewer-img');const viewTitle=document.getElementById('viewer-title');const imageBox=document.querySelector('.viewer-image');const zoom=document.getElementById('zoom');let trigger=null;
document.querySelectorAll('.drawing').forEach(button=>button.addEventListener('click',()=>{trigger=button;const img=button.querySelector('img');viewImg.src=img.src;viewImg.alt=img.alt;viewTitle.textContent=button.dataset.title;imageBox.classList.remove('zoomed');zoom.textContent='Zoom in +';dialog.showModal();document.body.style.overflow='hidden';document.getElementById('close-viewer').focus()}));
document.getElementById('close-viewer').addEventListener('click',()=>dialog.close());dialog.addEventListener('close',()=>{document.body.style.overflow='';if(trigger)trigger.focus()});zoom.addEventListener('click',()=>{const isZoomed=imageBox.classList.toggle('zoomed');zoom.textContent=isZoomed?'Fit to screen −':'Zoom in +';imageBox.scrollTop=0;imageBox.scrollLeft=0});
// Keep the chapter indicator within the current project.
const chapterLinks=[...document.querySelectorAll('.chapter-nav a')];
if(chapterLinks.length&&'IntersectionObserver' in window){
 const chapters=[...document.querySelectorAll('.project-chapter')];
 const setActive=id=>chapterLinks.forEach(link=>{const active=link.hash==='#'+id;link.classList.toggle('active',active);if(active)link.setAttribute('aria-current','location');else link.removeAttribute('aria-current')});
 setActive(chapters[0].id);
 const chapterObserver=new IntersectionObserver(entries=>{for(const entry of entries)if(entry.isIntersecting)setActive(entry.target.id)},{rootMargin:'-15% 0px -65% 0px',threshold:0});
 chapters.forEach(chapter=>chapterObserver.observe(chapter));
 chapterLinks.forEach(link=>link.addEventListener('click',()=>setActive(link.hash.slice(1))));
}

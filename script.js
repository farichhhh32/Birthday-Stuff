var slides=[].slice.call(document.querySelectorAll('.slide')),cur=0;
var dots=document.getElementById('dots');
slides.forEach(function(){dots.appendChild(document.createElement('i'))});
// title letters
var t=document.getElementById('title'),txt='Happy Birthday Cyndii!';
function buildTitle(){t.innerHTML='';txt.split('').forEach(function(c,i){var s=document.createElement('span');s.className='ch';s.style.setProperty('--i',i);s.setAttribute('aria-hidden','true');s.innerHTML=c===' '?'&nbsp;':c;t.appendChild(s)})}
buildTitle();
// floating emojis
['🎈','🎉','✨','🍵','🎬','💖','🎈','✨','🍵','🎉','💖','🎈'].forEach(function(e,i){
  var s=document.createElement('span');s.className='fl';s.textContent=e;
  s.style.left=(i*8.5+Math.random()*4)+'%';
  s.style.fontSize=(1.4+Math.random()*1.6)+'rem';
  s.style.animationDuration=(9+Math.random()*8)+'s';
  s.style.animationDelay=(-Math.random()*14)+'s';
  document.body.appendChild(s)});
// confetti
var cv=document.getElementById('cv'),cx=cv.getContext('2d'),P=[],run=false;
var RM=matchMedia('(prefers-reduced-motion:reduce)').matches;
function fit(){cv.width=innerWidth;cv.height=innerHeight}fit();addEventListener('resize',fit);
function loop(){run=true;cx.clearRect(0,0,cv.width,cv.height);
  P=P.filter(function(p){return p.l-->0});
  P.forEach(function(p){p.vy+=.28;p.vx*=.99;p.x+=p.vx;p.y+=p.vy;p.rot+=p.vr;
    cx.save();cx.translate(p.x,p.y);cx.rotate(p.rot);cx.fillStyle=p.c;cx.globalAlpha=Math.min(1,p.l/40);
    cx.fillRect(-p.r,-p.r/2,p.r*2,p.r);cx.restore()});
  if(P.length)requestAnimationFrame(loop);else{run=false;cx.clearRect(0,0,cv.width,cv.height)}}
function burst(x,y,n){if(RM)return;n=n||90;
  for(var i=0;i<n;i++){var a=Math.random()*6.283,s=4+Math.random()*9;
    P.push({x:x,y:y,vx:Math.cos(a)*s,vy:Math.sin(a)*s-6,r:4+Math.random()*5,c:'hsl('+Math.random()*360+' 90% 60%)',rot:Math.random()*6,vr:(Math.random()-.5)*.4,l:140+Math.random()*60})}
  if(!run)loop()}
// navigation
function go(i){slides[cur].classList.remove('on');cur=i;slides[cur].classList.add('on');
  [].forEach.call(dots.children,function(d,k){d.classList.toggle('on',k===i)});
  if(i===0)buildTitle();
  if(i===slides.length-1){[0,350,800,1300].forEach(function(d){setTimeout(function(){burst(innerWidth*(.2+Math.random()*.6),innerHeight*.35,100)},d)})}}
go(0);
[].forEach.call(document.querySelectorAll('[data-next]'),function(b){
  b.addEventListener('click',function(e){if(cur===0)playMusic();burst(e.clientX||innerWidth/2,e.clientY||innerHeight/2,50);go(cur+1)})});
// ===== MUSIC: put your song file next to index.html and name it music.mp3 (or change the name below) =====
var MUSIC_SRC='music.mp3';
var au=document.getElementById('au'),mb=document.getElementById('music'),want=true;
au.src=MUSIC_SRC;au.loop=true;au.volume=.6;
au.addEventListener('error',function(){mb.hidden=true});
au.addEventListener('canplay',function(){mb.hidden=false},{once:true});
function setMb(){mb.textContent=au.paused?'🔇':'🎵'}
function playMusic(){if(want&&au.paused){au.play().catch(function(){})}}
mb.addEventListener('click',function(){if(au.paused){want=true;au.play().catch(function(){})}else{want=false;au.pause()}});
au.addEventListener('play',setMb);au.addEventListener('pause',setMb);
var g=document.getElementById('gift');
g.addEventListener('click',function(){
  if(g.classList.contains('open')||g.classList.contains('shake'))return;
  g.classList.add('shake');
  setTimeout(function(){g.classList.remove('shake');g.classList.add('open');
    var r=g.getBoundingClientRect();burst(r.left+r.width/2,r.top+20,140);
    setTimeout(function(){go(cur+1)},1300)},700)});
document.getElementById('again').addEventListener('click',function(){g.classList.remove('open');go(0)});

const CTF_UNSTOP_URL="https://unstop.com/",ESCAPE_RUN_UNSTOP_URL="https://unstop.com/events/escape-rush-symbiosis-center-for-information-technology-scit-pune-1760128",SNAPCHAIN_UNSTOP_URL="https://unstop.com/events/snap-chain-symbiosis-center-for-information-technology-scit-pune-1760151 ",ENDGAME_UNSTOP_URL="https://unstop.com/events/end-game-symbiosis-center-for-information-technology-scit-pune-1760176";
const events=[
{number:"01",name:"CTF",url:CTF_UNSTOP_URL,logo:"assets/ctf.png",description:"[EVENT DESCRIPTION COMING SOON]"},{number:"02",name:"ESCAPE RUSH",url:ESCAPE_RUN_UNSTOP_URL,logo:"assets/escaperush.png",description:"A fortress has fallen.\nAEGIS was not cracked by skill,\nbut by weak passwords and human error.\nRecover the shattered key before the breach spreads."},
{number:"03",name:"SNAPCHAIN",url:SNAPCHAIN_UNSTOP_URL,logo:"assets/snapchain.png",description:"Snap Chain is a team-based cybersecurity relay challenge where every player becomes one link in the defence chain. Four players take on four different challenges, and every challenge must be completed correctly to keep the chain intact."},{number:"04",name:"ENDGAME",url:ENDGAME_UNSTOP_URL,logo:"assets/endgame.png",description:"End Game tests judgement, memory, coordination, control, and threat detection.\nRound 1 – Secure the Shot.\nRound 2 – The Last Mile.\nRound 3 – Straw Maze.\nRound 4 – The Deepfake Duel.\nThe enemy has evolved. Have you?"}];
const grid=document.getElementById("eventGrid");
grid.innerHTML=events.map(e=>`<a class="event-card reveal" href="${e.url}" target="_blank" rel="noopener noreferrer" aria-label="Open ${e.name} on Unstop"><div class="event-visual"><div class="gridlines"></div><img class="event-logo" src="${e.logo}" alt="${e.name} logo"></div><div class="event-content"><div class="event-number">${e.number} / CHAMBER</div><h3>${e.name}</h3><p>${e.description}</p><div class="contacts"><b>POINT OF CONTACT</b><span>Contact 01<br>[NAME TO BE ADDED]<br>[EMAIL TO BE ADDED]<br>[PHONE TO BE ADDED]</span><span>Contact 02<br>[NAME TO BE ADDED]<br>[EMAIL TO BE ADDED]<br>[PHONE TO BE ADDED]</span></div></div></a>`).join("");
const nav=document.getElementById("nav");
window.addEventListener("scroll",()=>nav.classList.toggle("scrolled",scrollY>20),{passive:true});
const countdownChip=document.getElementById("countdownChip");
const countdownValue=document.getElementById("countdownValue");
const countdownTarget=new Date("2026-10-03T00:00:00+05:30");
const countdownDateFormatter=new Intl.DateTimeFormat("en-IN",{day:"2-digit",month:"long",year:"numeric",timeZone:"Asia/Kolkata"});
function updateCountdown(){
  const diff=Math.max(countdownTarget.getTime()-Date.now(),0);
  const totalSeconds=Math.floor(diff/1000);
  const days=Math.floor(totalSeconds/86400);
  const hours=Math.floor((totalSeconds%86400)/3600);
  const minutes=Math.floor((totalSeconds%3600)/60);
  const seconds=totalSeconds%60;
  countdownValue.textContent=`${String(days).padStart(2,"0")}D ${String(hours).padStart(2,"0")}H ${String(minutes).padStart(2,"0")}M ${String(seconds).padStart(2,"0")}S`;
  if(countdownChip){countdownChip.title=`${countdownDateFormatter.format(countdownTarget)}`;}
}
updateCountdown();
setInterval(updateCountdown,1000);
const ob=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add("visible");ob.unobserve(e.target)}}),{threshold:.12});
document.querySelectorAll(".reveal").forEach(e=>ob.observe(e));
const canvas=document.getElementById("heroCanvas"),ctx=canvas.getContext("2d");let W,H,dpr,ps=[];const castle=new Image();castle.src="assets/castle.jpg";
function resize(){dpr=Math.min(devicePixelRatio||1,2);W=canvas.clientWidth;H=canvas.clientHeight;canvas.width=W*dpr;canvas.height=H*dpr;ctx.setTransform(dpr,0,0,dpr,0,0);ps=Array.from({length:W<600?35:75},()=>({x:Math.random()*W,y:Math.random()*H,s:1+Math.random()*5,vx:(Math.random()-.5)*.17,vy:(Math.random()-.5)*.17,r:Math.random()*6.28,color:Math.random()<.2?"#bfd7e4":Math.random()<.3?"#d9edf8":"#6ea7c7"}))}
function draw(t){ctx.clearRect(0,0,W,H);const cx=W*.5,cy=H*.52;
if(castle.complete){ctx.save();ctx.filter="saturate(0.8) brightness(0.82) contrast(1.1)";ctx.globalAlpha=.9;ctx.drawImage(castle,0,0,W,H);ctx.restore();const glow=ctx.createRadialGradient(cx,cy*0.8,60,cx,cy*0.8,Math.max(W,H)*0.7);glow.addColorStop(0,"rgba(8,12,18,0.06)");glow.addColorStop(1,"rgba(3,5,10,0.38)");ctx.fillStyle=glow;ctx.fillRect(0,0,W,H);}
ctx.fillStyle="#c9f8ff";ctx.shadowBlur=24;ctx.shadowColor="#54d9ff";ctx.beginPath();ctx.arc(cx,cy-65,4,0,7);ctx.fill();
for(const p of ps){let dx=cx-p.x,dy=cy-p.y,d=Math.hypot(dx,dy)||1;p.x+=p.vx+dx/d*.02;p.y+=p.vy+dy/d*.02;if(p.x<0||p.x>W||p.y<0||p.y>H){p.x=Math.random()*W;p.y=Math.random()*H}ctx.save();ctx.translate(p.x,p.y);ctx.rotate(p.r+=.002);ctx.globalAlpha=.16+Math.random()*.25;ctx.fillStyle=p.color;ctx.shadowBlur=10;ctx.shadowColor=p.color;ctx.beginPath();ctx.moveTo(0,-p.s*2.6);ctx.lineTo(p.s*1.1,p.s*1.8);ctx.lineTo(-p.s*1.1,p.s*1.8);ctx.closePath();ctx.fill();ctx.restore()}requestAnimationFrame(draw)}
resize();addEventListener("resize",resize);requestAnimationFrame(draw);
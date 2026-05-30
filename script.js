// Countdown Since 17 Dec 2025
(function(){
  const countdownEl = document.getElementById('countdown');
  function updateCountdown(){
    const startDate = new Date('December 17, 2025 00:00:00');
    const now = new Date();
    const diff = now - startDate;
    if(isNaN(diff)) return;
    const days = Math.floor(diff/(1000*60*60*24));
    const hours = Math.floor((diff%(1000*60*60*24))/(1000*60*60));
    const minutes = Math.floor((diff%(1000*60*60))/(1000*60));
    const seconds = Math.floor((diff%(1000*60))/1000);
    countdownEl.innerHTML = `❤️ Together Since 17 Dec 2025 ❤️<br><br>${days} Days ${hours} Hours ${minutes} Minutes ${seconds} Seconds`;
  }
  setInterval(updateCountdown,1000);
  updateCountdown();
})();

// YES button behavior
const yesBtn = document.getElementById('yesBtn');
const successMsg = document.getElementById('successMsg');
yesBtn.addEventListener('click', () => {
  // background change, show success, and fireworks
  document.body.style.background = 'linear-gradient(135deg,#ff4d6d,#ff758f,#ff8fa3)';
  successMsg.style.display = 'block';
  successMsg.focus?.();
  launchFireworks(window.innerWidth/2, window.innerHeight/3);
});

// NO button evasive behavior with bounds safety
const noBtn = document.getElementById('noBtn');
// start with sensible position if not positioned
noBtn.style.left = noBtn.style.left || '120px';

function moveNoButtonAway(e){
  const rect = noBtn.getBoundingClientRect();
  const centerX = rect.left + rect.width/2;
  const centerY = rect.top + rect.height/2;
  const distance = Math.hypot(e.clientX - centerX, e.clientY - centerY);
  const THRESHOLD = 120;
  if(distance < THRESHOLD){
    // compute safe area within window
    const padding = 12;
    const maxLeft = Math.max(window.innerWidth - rect.width - padding, padding);
    const maxTop = Math.max(window.innerHeight - rect.height - padding, padding + 40);
    const newLeft = Math.floor(padding + Math.random() * (maxLeft - padding));
    const newTop = Math.floor(padding + Math.random() * (maxTop - padding));
    noBtn.style.left = newLeft + 'px';
    noBtn.style.top = newTop + 'px';
  }
}

document.addEventListener('mousemove', moveNoButtonAway);

// also move when focused (keyboard) to keep playful behavior
noBtn.addEventListener('focus', (e)=>{
  const fakeEvent = {clientX: -9999, clientY: -9999};
  moveNoButtonAway(fakeEvent);
});

// Floating hearts and flowers (lightweight)
function createFloating(icon, interval){
  return setInterval(()=>{
    const el = document.createElement('div');
    el.className = 'heart';
    el.textContent = icon;
    el.style.left = Math.random()*100 + 'vw';
    el.style.top = '100vh';
    el.style.opacity = 0.9;
    el.style.pointerEvents = 'none';
    const dur = 5 + Math.random()*6;
    el.style.transition = `transform ${dur}s linear, opacity ${dur}s linear, top ${dur}s linear`;
    document.body.appendChild(el);
    // animate
    requestAnimationFrame(()=>{
      el.style.top = '-10vh';
      el.style.opacity = 0;
      el.style.transform = `translateY(-110vh) rotate(${Math.random()*720}deg)`;
    });
    setTimeout(()=>el.remove(), (dur+0.5)*1000);
  }, interval);
}

const heartsInterval = createFloating('💖', 800);
const flowersInterval = createFloating('🌹', 600);

// Rose petal animation (user-supplied behavior)
function createRose(){
  const rose = document.createElement('div');
  rose.innerHTML = '🌹';
  rose.className = 'rose';
  rose.style.left = Math.random()*100 + 'vw';
  rose.style.fontSize = (20 + Math.random()*20) + 'px';
  document.body.appendChild(rose);
  setTimeout(()=>rose.remove(), 10000);
}
setInterval(createRose, 200);

// Soft sparkle effect for neon ambiance
function createSpark(){
  const spark = document.createElement('div');
  spark.className = 'spark';
  const size = 4 + Math.random()*5;
  spark.style.width = size + 'px';
  spark.style.height = size + 'px';
  spark.style.left = Math.random()*90 + '5vw';
  spark.style.top = window.innerHeight * (0.4 + Math.random()*0.4) + 'px';
  spark.style.background = ['#ff8cb6','#ffd369','#ff6ba5','#ffb5d8'][Math.floor(Math.random()*4)];
  document.body.appendChild(spark);
  setTimeout(()=>spark.remove(), 2200);
}
setInterval(createSpark, 1100);

// Open letter toggle
const openLetterBtn = document.getElementById('openLetterBtn');
const letter = document.getElementById('letter');
openLetterBtn.addEventListener('click', () => {
  if(letter.style.display === 'none' || !letter.style.display){
    letter.style.display = 'block';
    openLetterBtn.style.display = 'none';
  }
});

// Simple fireworks/confetti effect
function launchFireworks(x, y){
  const colors = ['#ffecb3','#ffd54f','#ff8a80','#ff80ab','#b39ddb','#8c9eff'];
  for(let i=0;i<40;i++){
    const piece = document.createElement('div');
    piece.className = 'firework-piece';
    const color = colors[Math.floor(Math.random()*colors.length)];
    piece.style.background = color;
    piece.style.left = x + 'px';
    piece.style.top = y + 'px';
    document.body.appendChild(piece);
    const angle = Math.random()*Math.PI*2;
    const dist = 50 + Math.random()*200;
    const destX = x + Math.cos(angle)*dist;
    const destY = y + Math.sin(angle)*dist;
    piece.style.transition = `transform 900ms ease-out, opacity 900ms ease-out`;
    requestAnimationFrame(()=>{
      piece.style.transform = `translate(${destX - x}px, ${destY - y}px) scale(${0.5+Math.random()})`;
      piece.style.opacity = '0';
    });
    setTimeout(()=>piece.remove(), 1000);
  }
}

// Music toggle (requires user-provided file)
const musicBtn = document.getElementById('musicBtn');
const audio = document.getElementById('romanceAudio');
const chooseMusicBtn = document.getElementById('chooseMusicBtn');
const musicFileInput = document.getElementById('musicFileInput');
const trackName = document.getElementById('trackName');

function setTrackFromFile(file){
  if(!file) return;
  const url = URL.createObjectURL(file);
  audio.src = url;
  audio.load();
  trackName.textContent = file.name;
  musicBtn.disabled = false;
}

chooseMusicBtn.addEventListener('click', ()=>musicFileInput.click());
musicFileInput.addEventListener('change', (e)=>{
  const f = e.target.files && e.target.files[0];
  if(f) setTrackFromFile(f);
});

musicBtn.addEventListener('click', async ()=>{
  if(!audio) return;
  try{
    if(audio.paused){
      await audio.play();
      musicBtn.textContent = 'Pause Music';
      musicBtn.setAttribute('aria-pressed','true');
    } else {
      audio.pause();
      musicBtn.textContent = 'Play Music';
      musicBtn.setAttribute('aria-pressed','false');
    }
  }catch(err){
    console.warn('Playback failed', err);
    trackName.textContent = 'Playback failed — choose another file or allow audio playback.';
  }
});

audio.addEventListener('error', ()=>{
  trackName.textContent = 'Unable to play the selected track.';
  musicBtn.disabled = true;
});

// If there's an existing file at the static path, enable play
fetch('your-romantic-song.mp3', {method:'HEAD'}).then(r=>{
  if(r.ok){
    musicBtn.disabled = false;
    trackName.textContent = 'your-romantic-song.mp3';
  }
}).catch(()=>{});

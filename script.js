// ================= EFEITO SPOTLIGHT NA FOTO =================
const container = document.getElementById('photoContainer');
const reveal = document.getElementById('photoReveal');
const glow = document.getElementById('photoGlow');

container.addEventListener('mousemove', (e) => {
  const rect = container.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  
  reveal.style.setProperty('--mx', x + 'px');
  reveal.style.setProperty('--my', y + 'px');
  glow.style.setProperty('--mx', x + 'px');
  glow.style.setProperty('--my', y + 'px');
});

container.addEventListener('mouseleave', () => {
  reveal.style.setProperty('--mx', '-999px');
  reveal.style.setProperty('--my', '-999px');
  glow.style.setProperty('--mx', '-999px');
  glow.style.setProperty('--my', '-999px');
});

container.addEventListener('touchmove', (e) => {
  const rect = container.getBoundingClientRect();
  const touch = e.touches[0];
  const x = touch.clientX - rect.left;
  const y = touch.clientY - rect.top;
  
  reveal.style.setProperty('--mx', x + 'px');
  reveal.style.setProperty('--my', y + 'px');
  glow.style.setProperty('--mx', x + 'px');
  glow.style.setProperty('--my', y + 'px');
  e.preventDefault();
}, { passive: false });

container.addEventListener('touchend', () => {
  reveal.style.setProperty('--mx', '-999px');
  reveal.style.setProperty('--my', '-999px');
  glow.style.setProperty('--mx', '-999px');
  glow.style.setProperty('--my', '-999px');
});

// ================= ANIMAÇÃO AO ROLAR A PÁGINA =================
const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

revealElements.forEach(el => revealObserver.observe(el));

// ================= EFEITO 3D SUAVE COM O MOUSE =================
const heroContent = document.getElementById('heroContent');

let requestID;
document.addEventListener('mousemove', (e) => {
  if (requestID) cancelAnimationFrame(requestID);
  
  requestID = requestAnimationFrame(() => {
    const xAxis = (window.innerWidth / 2 - e.clientX) / 50; 
    const yAxis = (window.innerHeight / 2 - e.clientY) / 50;
    heroContent.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
  });
});

document.addEventListener('mouseleave', () => {
  heroContent.style.transform = `rotateY(0deg) rotateX(0deg)`;
  heroContent.style.transition = 'transform 0.5s ease';
});
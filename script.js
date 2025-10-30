// real-products-script.js - interactions, form handling, FAB behavior, reveals
document.addEventListener('DOMContentLoaded', function(){
  // logo pulse
  const logo = document.getElementById('brandLogo');
  if(logo){
    logo.style.transition = 'box-shadow 0.4s ease';
    logo.style.boxShadow = '0 10px 30px rgba(255,92,92,0.08)';
    setTimeout(()=>{ logo.style.boxShadow = '0 20px 60px rgba(255,92,92,0.16)'; }, 600);
    setTimeout(()=>{ logo.style.boxShadow = '0 10px 30px rgba(255,92,92,0.08)'; }, 2200);
  }

  // smooth scroll
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', function(e){
      const href = this.getAttribute('href');
      if(href.length > 1){
        const target = document.querySelector(href);
        if(target){ e.preventDefault(); target.scrollIntoView({behavior:'smooth', block:'start'}); }
      }
    });
  });

  // form handling
  const form = document.getElementById('contactForm');
  const msg = document.getElementById('formMessage');
  if(form){
    form.addEventListener('submit', function(e){
      e.preventDefault();
      const data = new FormData(form);
      if(!data.get('phone') || !data.get('email')){
        msg.textContent = 'Please provide phone and email.';
        return;
      }
      const submit = form.querySelector('button[type="submit"]');
      submit.disabled = true;
      submit.textContent = 'Sending…';
      setTimeout(()=>{
        submit.textContent = 'Sent ✓';
        msg.textContent = `Thanks ${data.get('name') || ''}! We'll call you shortly.`;
        form.reset();
        submit.disabled = false;
        submit.textContent = 'Send Request';
      }, 900);
    });
  }

  // clear button
  const clearBtn = document.getElementById('clearForm');
  if(clearBtn){ clearBtn.addEventListener('click', ()=>{ form.reset(); msg.textContent=''; }); }

  // FAB menu
  const fabBtn = document.getElementById('fabBtn');
  const fabMenu = document.getElementById('fabMenu');
  if(fabBtn && fabMenu){
    fabBtn.addEventListener('click', function(e){
      const open = fabMenu.style.display === 'block';
      fabMenu.style.display = open ? 'none' : 'block';
      fabBtn.setAttribute('aria-expanded', String(!open));
    });
    document.addEventListener('click', function(e){
      if(!fabMenu.contains(e.target) && !fabBtn.contains(e.target)){
        fabMenu.style.display = 'none';
        fabBtn.setAttribute('aria-expanded','false');
      }
    });
  }

  // reveal on scroll for cards
  const observer = new IntersectionObserver(entries=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        entry.target.style.opacity = 1;
        entry.target.style.transform = 'none';
      }
    });
  }, {threshold:0.12});

  document.querySelectorAll('.service-card, .media-card, .about-image, .map-card, .contact-card').forEach(el=>{
    el.style.opacity = 0; el.style.transform = 'translateY(12px)'; el.style.transition = 'opacity 600ms ease, transform 600ms ease';
    observer.observe(el);
  });
});
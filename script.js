document.addEventListener('DOMContentLoaded', () => {

  document.querySelector('.nav-toggle')?.addEventListener('click', ()=>{
    const list = document.querySelector('.nav-list');
    if(getComputedStyle(list).display === 'flex') list.style.display = '';
    else { list.style.display = 'flex'; list.style.gap = '1rem'; list.style.flexDirection = 'column'; }
  });

  document.getElementById('year').innerText = new Date().getFullYear();

  const filterBtns = document.querySelectorAll('.filter-btn');
  const cards = document.querySelectorAll('.card');
  filterBtns.forEach(btn=>{
    btn.addEventListener('click', ()=>{
      document.querySelector('.filter-btn.active').classList.remove('active');
      btn.classList.add('active');
      const f = btn.dataset.filter;
      cards.forEach(c=>{
        const show = (f==='all' || c.dataset.category===f);
        c.style.display = show ? '' : 'none';
        if(show){ requestAnimationFrame(()=> c.classList.add('show')); }
      });
    });
  });

  const modal = document.getElementById('modal');
  const iframe = document.getElementById('modalIframe');
  const mTitle = document.getElementById('modalTitle');
  const mDesc = document.getElementById('modalDesc');
  const mCat = document.getElementById('modalCategory');
  const viewOnYT = document.getElementById('viewOnYT');

  document.getElementById('grid').addEventListener('click',(e)=>{
    const card = e.target.closest('.card');
    if(!card) return;
    const id = card.dataset.videoid;
    const url = id.startsWith('http') ? id : `https://www.youtube.com/embed/${id}?autoplay=1&rel=0`;
    iframe.src = url;
    mTitle.textContent = card.dataset.title || card.querySelector('h3')?.innerText || 'Project';
    mDesc.textContent = card.querySelector('.card-body p')?.innerText || '';
    mCat.textContent = card.dataset.category || '';
    viewOnYT.href = `https://www.youtube.com/watch?v=${id}`;
    modal.classList.add('show'); modal.setAttribute('aria-hidden','false');
    document.body.style.overflow='hidden';
  });

  function closeModal(){
    modal.classList.remove('show'); modal.setAttribute('aria-hidden','true');
    iframe.src=''; document.body.style.overflow='';
  }
  document.getElementById('modalClose').addEventListener('click', closeModal);
  modal.addEventListener('click', (e)=>{ if(e.target===modal) closeModal(); });
  document.addEventListener('keydown', (e)=>{ if(e.key==='Escape' && modal.classList.contains('show')) closeModal(); });

  const revealEls = document.querySelectorAll('.reveal, .card, .fbox');
  const io = new IntersectionObserver(entries=>{
    entries.forEach(en=>{
      if(en.isIntersecting){
        en.target.classList.add('show');
        io.unobserve(en.target);
      }
    });
  },{threshold:0.15});
  revealEls.forEach(el=> io.observe(el));
  document.querySelectorAll('.card').forEach((c,i)=> c.style.transitionDelay = (i*0.08)+'s');

  const form = document.getElementById('contactForm');
  const msg = document.getElementById('formMsg');
  form.addEventListener('submit',(e)=>{
    e.preventDefault();
    if(!form.checkValidity()){
      msg.textContent = 'Please fill all required fields correctly.';
      msg.style.color = '#ffd1d1';
      return;
    }
    msg.textContent = 'Thanks! Your message has been sent.';
    msg.style.color = '#a7f3d0';
    form.reset();
  });
});

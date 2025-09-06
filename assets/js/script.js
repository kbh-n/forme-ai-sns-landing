(function () {
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Intersection Observer: reveal animations
  const revealElements = document.querySelectorAll('.reveal');
  if (!prefersReduced && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      }
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

    revealElements.forEach((el) => observer.observe(el));
  } else {
    revealElements.forEach((el) => el.classList.add('visible'));
  }

  // Smooth scroll for in-page anchors
  document.addEventListener('click', (e) => {
    const target = e.target.closest('a[href^="#"]');
    if (!target) return;
    const id = target.getAttribute('href').slice(1);
    const el = document.getElementById(id);
    if (el) {
      e.preventDefault();
      el.scrollIntoView({ behavior: prefersReduced ? 'auto' : 'smooth', block: 'start' });
    }
  });

  // Simple form validation
  const form = document.getElementById('contact-form');
  const feedback = document.getElementById('form-feedback');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const formData = new FormData(form);
      const name = String(formData.get('name') || '').trim();
      const email = String(formData.get('email') || '').trim();
      const message = String(formData.get('message') || '').trim();

      if (name.length < 2) {
        showFeedback('이름을 2자 이상 입력해주세요.', true);
        return;
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        showFeedback('올바른 이메일을 입력해주세요.', true);
        return;
      }
      if (message.length < 5) {
        showFeedback('문의 내용을 5자 이상 입력해주세요.', true);
        return;
      }

      // Demo submit: just show success message
      form.reset();
      showFeedback('신청이 접수되었습니다! 24시간 내 연락드릴게요.', false);
    });
  }

  function showFeedback(text, isError) {
    if (!feedback) return;
    feedback.textContent = text;
    feedback.classList.remove('hidden');
    feedback.style.color = isError ? '#ffd7d7' : '#ffffff';
  }
})();

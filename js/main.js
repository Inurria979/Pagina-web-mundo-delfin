document.addEventListener('DOMContentLoaded',  () => {

    document.querySelectorAll('[data-bs-toggle="tooltip"]').forEach( (el) =>  {
        new bootstrap.Tooltip(el);
    });

    function animateCounter(el) {
        const target = parseInt(el.dataset.target, 10);
        const duration = 1500;
        const step = target / (duration / 16);
        let current = 0;

        const timer = setInterval(function () {
            current += step;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            el.textContent = Math.floor(current) + '+';
        }, 16);
    }

    const counterObserver = new IntersectionObserver( (entries, obs) =>  {
        entries.forEach( (entry) =>  {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                obs.unobserve(entry.target);
            }
        });
    }, { threshold: 0.4 });

    document.querySelectorAll('.stat-number').forEach( (el) =>  {
        counterObserver.observe(el);
    });

    document.querySelectorAll('.modal').forEach( (modalEl) =>  {
        modalEl.addEventListener('shown.bs.modal',  () =>  {
            modalEl.querySelectorAll('.progress-animated').forEach( (bar) =>  {
                bar.style.transition = 'width 0.9s ease';
                bar.style.width = bar.dataset.width;
            });
        });
        modalEl.addEventListener('hidden.bs.modal',  () =>  {
            modalEl.querySelectorAll('.progress-animated').forEach( (bar) =>  {
                bar.style.transition = 'none';
                bar.style.width = '0%';
            });
        });
    });

    const form = document.getElementById('formNewsletter');
    if (form) {
        form.addEventListener('submit',  (e) =>  {
            e.preventDefault();
            const input = document.getElementById('emailInput');
            if (!form.checkValidity()) {
                form.classList.add('was-validated');
                return;
            }
            form.classList.remove('was-validated');
            input.value = '';
            const msg = document.getElementById('successMsg');
            msg.classList.remove('d-none');
            setTimeout( () => { msg.classList.add('d-none'); }, 4000);
        });
    }

    const sections = document.querySelectorAll('section[id], div[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll',  () =>  {
        let current = '';
        sections.forEach( (section) =>  {
            if (window.scrollY >= section.offsetTop - 80) {
                current = section.getAttribute('id');
            }
        });
        navLinks.forEach( (link) =>  {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    });

    const carouselEl = document.getElementById('delfinCarousel');
    if (carouselEl) {
        const carouselInstance = bootstrap.Carousel.getOrCreateInstance(carouselEl);
        carouselEl.addEventListener('mouseenter',  () =>  { carouselInstance.pause(); });
        carouselEl.addEventListener('mouseleave',  () =>  { carouselInstance.cycle(); });
    }

});

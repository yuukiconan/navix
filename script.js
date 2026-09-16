document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.getElementById('menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');

    lucide.createIcons();

    menuToggle.addEventListener('click', () => {
        const isOpen = mobileMenu.classList.toggle('is-open');
        menuToggle.setAttribute('aria-expanded', String(isOpen));
        menuToggle.innerHTML = `<i data-lucide="${isOpen ? 'x' : 'menu'}"></i>`;
        lucide.createIcons();
    });

    mobileMenu.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
        mobileMenu.classList.remove('is-open');
        menuToggle.setAttribute('aria-expanded', 'false');
        menuToggle.innerHTML = '<i data-lucide="menu"></i>';
        lucide.createIcons();
    }));

    if (window.Lenis) {
        const lenis = new Lenis({ lerp: 0.08, smoothWheel: true });
        const raf = (time) => { lenis.raf(time); requestAnimationFrame(raf); };
        requestAnimationFrame(raf);
    }

    if (window.gsap) {
        gsap.to('.reveal', { duration: 1, opacity: 1, y: 0, stagger: 0.09, ease: 'power3.out', delay: 0.15 });
        gsap.to('.hero-image-wrap', { duration: 1.4, clipPath: 'inset(0 0 0 0)', ease: 'power4.inOut', delay: 0.05 });
    } else {
        document.querySelectorAll('.reveal').forEach((element) => { element.style.opacity = '1'; element.style.transform = 'none'; });
    }
});
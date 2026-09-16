document.addEventListener('DOMContentLoaded', () => {
    if (window.lucide) lucide.createIcons();
    const menuToggle = document.getElementById('menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    menuToggle.addEventListener('click', () => {
        const isOpen = mobileMenu.classList.toggle('is-open');
        menuToggle.setAttribute('aria-expanded', String(isOpen));
        menuToggle.innerHTML = `<i data-lucide="${isOpen ? 'x' : 'menu'}"></i>`;
        if (window.lucide) lucide.createIcons();
    });
    if (window.Lenis) {
        const lenis = new Lenis({ lerp: 0.08, smoothWheel: true });
        const raf = (time) => { lenis.raf(time); requestAnimationFrame(raf); };
        requestAnimationFrame(raf);
    }
    if (window.gsap) gsap.to('.reveal', { duration: 1, opacity: 1, y: 0, stagger: 0.08, ease: 'power3.out', delay: 0.12 });
    else document.querySelectorAll('.reveal').forEach((element) => { element.style.opacity = '1'; element.style.transform = 'none'; });
});

document.addEventListener('DOMContentLoaded', () => {
    const loadingOverlay = document.getElementById('loading-overlay');
    setTimeout(() => {
        loadingOverlay.style.opacity = '0';
        setTimeout(() => {
            loadingOverlay.style.display = 'none';
        }, 500);
    }, 2000);

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');

    burger.addEventListener('click', () => {
        nav.classList.toggle('nav-active');

        navLinks.forEach((link, index) => {
            if (link.style.animation) {
                link.style.animation = '';
            } else {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
            }
        });

        burger.classList.toggle('toggle');
    });

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.section-transition').forEach(section => {
        sectionObserver.observe(section);
    });

    window.addEventListener('scroll', () => {
        const scrollPosition = window.pageYOffset;
        document.querySelector('.hero').style.backgroundPositionY = `${scrollPosition * 0.7}px`;
    });

    window.addEventListener('scroll', () => {
        const header = document.querySelector('header');
        if (window.scrollY > 100) {
            header.style.backgroundColor = 'rgba(44, 62, 80, 0.9)';
        } else {
            header.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
        }
    });

    const testimonialSlider = document.querySelector('.testimonial-slider');
    const testimonials = document.querySelectorAll('.testimonial');
    let currentTestimonial = 0;
    let testimonialInterval;

    function showTestimonial(index) {
        testimonialSlider.style.transform = `translateX(-${index * 100}%)`;
        updateIndicators(index);
    }

    function nextTestimonial() {
        currentTestimonial = (currentTestimonial + 1) % testimonials.length;
        showTestimonial(currentTestimonial);
    }

    function prevTestimonial() {
        currentTestimonial = (currentTestimonial - 1 + testimonials.length) % testimonials.length;
        showTestimonial(currentTestimonial);
    }

    function startAutoScroll() {
        stopAutoScroll(); // Ensure only one interval is running
        testimonialInterval = setInterval(nextTestimonial, 5000);
    }

    function stopAutoScroll() {
        clearInterval(testimonialInterval);
    }

    const testimonialSection = document.querySelector('.testimonials');
    const indicatorContainer = document.createElement('div');
    indicatorContainer.className = 'testimonial-nav';
    testimonials.forEach((_, index) => {
        const indicator = document.createElement('div');
        indicator.className = 'testimonial-indicator';
        indicator.addEventListener('click', () => {
            currentTestimonial = index;
            showTestimonial(currentTestimonial);
            stopAutoScroll();
            startAutoScroll();
        });
        indicatorContainer.appendChild(indicator);
    });
    testimonialSection.appendChild(indicatorContainer);

    function updateIndicators(activeIndex) {
        const indicators = document.querySelectorAll('.testimonial-indicator');
        indicators.forEach((indicator, index) => {
            if (index === activeIndex) {
                indicator.classList.add('active');
            } else {
                indicator.classList.remove('active');
            }
        });
    }

    startAutoScroll();

    testimonialSection.addEventListener('mouseenter', stopAutoScroll);
    testimonialSection.addEventListener('mouseleave', startAutoScroll);
});

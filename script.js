document.addEventListener('DOMContentLoaded', () => {
    const navSlide = () => {
        const burger = document.querySelector('.burger');
        const nav = document.querySelector('.nav-links');
        const navLinks = document.querySelectorAll('.nav-links li');

        burger.addEventListener('click', () => {
            // Toggle Nav
            nav.classList.toggle('nav-active');

            // Animate Links
            navLinks.forEach((link, index) => {
                if (link.style.animation) {
                    link.style.animation = '';
                } else {
                    link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
                }
            });

            // Burger Animation
            burger.classList.toggle('toggle');
        });
    };

    const smoothScroll = () => {
        const links = document.querySelectorAll('a[href^="#"]');
        links.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const href = link.getAttribute('href');
                const offsetTop = document.querySelector(href).offsetTop - 80;

                scroll({
                    top: offsetTop,
                    behavior: "smooth"
                });

                // Close mobile menu if open
                const nav = document.querySelector('.nav-links');
                const burger = document.querySelector('.burger');
                if (nav.classList.contains('nav-active')) {
                    nav.classList.remove('nav-active');
                    burger.classList.remove('toggle');
                }
            });
        });
    };

    const handleContactForm = () => {
        const form = document.getElementById('contact-form');
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const formData = new FormData(form);
            const data = Object.fromEntries(formData);

            // Here you would typically send the data to a server
            console.log('Form submitted with data:', data);

            // Clear the form
            form.reset();

            // Show a success message
            const successMessage = document.createElement('div');
            successMessage.textContent = 'Thank you for your message. We will get back to you soon!';
            successMessage.style.color = '#4a90e2';
            successMessage.style.marginTop = '1rem';
            form.appendChild(successMessage);

            // Remove the success message after 5 seconds
            setTimeout(() => {
                successMessage.remove();
            }, 5000);
        });
    };

    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.service-card, .portfolio-item, .testimonial');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animation = `fadeInUp 1s ease-out`;
                } else {
                    entry.target.style.animation = 'none';
                }
            });
        }, { threshold: 0.1 });

        elements.forEach(element => {
            observer.observe(element);
        });
    };

    const initTestimonialSlider = () => {
        const slider = document.querySelector('.testimonial-slider');
        let isDown = false;
        let startX;
        let scrollLeft;

        slider.addEventListener('mousedown', (e) => {
            isDown = true;
            slider.classList.add('active');
            startX = e.pageX - slider.offsetLeft;
            scrollLeft = slider.scrollLeft;
        });

        slider.addEventListener('mouseleave', () => {
            isDown = false;
            slider.classList.remove('active');
        });

        slider.addEventListener('mouseup', () => {
            isDown = false;
            slider.classList.remove('active');
        });

        slider.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - slider.offsetLeft;
            const walk = (x - startX) * 2;
            slider.scrollLeft = scrollLeft - walk;
        });
    };

    navSlide();
    smoothScroll();
    handleContactForm();
    animateOnScroll();
    initTestimonialSlider();
});
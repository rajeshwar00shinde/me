document.addEventListener('DOMContentLoaded', () => {
    // Initialize WOW.js for scroll animations
    new WOW().init();

    // Preloader
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        window.addEventListener('load', () => {
            setTimeout(() => {
                preloader.style.opacity = '0';
                setTimeout(() => {
                    preloader.style.display = 'none';
                }, 700); // Matches opacity transition duration
            }, 500); // Minimum display time for preloader
        });
    }

    // Navbar Shrink on Scroll & Active Link Highlighting
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.nav-links a.smoothScroll');
    const sections = document.querySelectorAll('section[id]');

    function updateNavbarAndLinks() {
        // Navbar shrink effect
        if (window.scrollY > 80) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Active link highlighting
        let currentActiveSectionId = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - navbar.offsetHeight - 60;
            const sectionHeight = section.clientHeight;

            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                currentActiveSectionId = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentActiveSectionId}`) {
                link.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', updateNavbarAndLinks);
    updateNavbarAndLinks();

    // Smooth Scrolling for internal links
    document.querySelectorAll('a.smoothScroll').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            const navbarHeight = navbar.offsetHeight;

            if (targetElement) {
                const offsetPosition = targetElement.offsetTop - navbarHeight - 20;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });

                // Close mobile menu after clicking a link
                const menuToggle = document.querySelector('.menu-toggle');
                const mainNavLinks = document.getElementById('main-nav-links');
                if (mainNavLinks.classList.contains('active')) {
                    mainNavLinks.classList.remove('active');
                    menuToggle.classList.remove('active');
                    menuToggle.setAttribute('aria-expanded', 'false');
                }
            }
        });
    });

    // Mobile Navigation Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const mainNavLinks = document.getElementById('main-nav-links');

    if (menuToggle && mainNavLinks) {
        menuToggle.addEventListener('click', () => {
            const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
            menuToggle.setAttribute('aria-expanded', !isExpanded);
            mainNavLinks.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });
    }

    // Skill Bar Animation on Scroll
    const skillBars = document.querySelectorAll('.skills-section .progress-bar');
    const skillsSection = document.querySelector('.skills-section');

    const skillObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                skillBars.forEach(bar => {
                    const percentage = bar.getAttribute('data-progress');
                    bar.style.width = percentage + '%';
                });
                observer.unobserve(skillsSection);
            }
        });
    }, { threshold: 0.4 });

    if (skillsSection) {
        skillObserver.observe(skillsSection);
    }

    // --- Certificate Carousel Functionality (from cert.js) ---
    const carouselTrack = document.querySelector('.certification-carousel .carousel-track');
    const certificationItems = Array.from(document.querySelectorAll('.certification-carousel .certification-item'));
    const prevButton = document.querySelector('.certification-carousel .carousel-nav.prev');
    const nextButton = document.querySelector('.certification-carousel .carousel-nav.next');
    const indicatorsContainer = document.querySelector('.certification-carousel .carousel-indicators');

    if (carouselTrack && certificationItems.length > 0) {
        let currentIndex = 0;
        const totalCertifications = certificationItems.length;

        // Create indicators
        if (indicatorsContainer) {
            for (let i = 0; i < totalCertifications; i++) {
                const indicator = document.createElement('div');
                indicator.classList.add('indicator');
                indicator.dataset.index = i;
                indicatorsContainer.appendChild(indicator);
                indicator.addEventListener('click', () => {
                    moveToSlide(i);
                });
            }
        }

        const indicators = Array.from(document.querySelectorAll('.certification-carousel .indicator'));

        function updateCarousel() {
            if (certificationItems.length === 0) return;
            const itemWidth = certificationItems[0].offsetWidth;
            const translationValue = -currentIndex * itemWidth;
            carouselTrack.style.transform = `translateX(${translationValue}px)`;

            // Update active indicator
            indicators.forEach((indicator, index) => {
                if (index === currentIndex) {
                    indicator.classList.add('active');
                } else {
                    indicator.classList.remove('active');
                }
            });
        }

        function moveToSlide(index) {
            if (index >= 0 && index < totalCertifications) {
                currentIndex = index;
                updateCarousel();
            }
        }

        if (prevButton) {
            prevButton.addEventListener('click', () => {
                if (currentIndex > 0) {
                    moveToSlide(currentIndex - 1);
                } else {
                    moveToSlide(totalCertifications - 1);
                }
            });
        }

        if (nextButton) {
            nextButton.addEventListener('click', () => {
                if (currentIndex < totalCertifications - 1) {
                    moveToSlide(currentIndex + 1);
                } else {
                    moveToSlide(0);
                }
            });
        }

        // Initialize and handle resize
        updateCarousel();
        window.addEventListener('resize', updateCarousel);
    }

    // --- Common Website Functionality ---
    
    // Back to top button visibility
    const backToTopButton = document.querySelector('.back-to-top');
    if (backToTopButton) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                backToTopButton.classList.add('visible');
            } else {
                backToTopButton.classList.remove('visible');
            }
        });
    }

    // Theme toggle
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        // Check for saved theme in localStorage
        const currentTheme = localStorage.getItem('theme');
        if (currentTheme) {
            document.documentElement.setAttribute('data-theme', currentTheme);
            if (currentTheme === 'dark') {
                themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
            } else {
                themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
            }
        }

        themeToggle.addEventListener('click', () => {
            let theme = document.documentElement.getAttribute('data-theme');
            if (theme === 'dark') {
                document.documentElement.removeAttribute('data-theme');
                localStorage.setItem('theme', 'light');
                themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
            } else {
                document.documentElement.setAttribute('data-theme', 'dark');
                localStorage.setItem('theme', 'dark');
                themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
            }
        });
    }

    // Scroll progress bar
    const progressBar = document.querySelector('.scroll-progress .progress-bar');
    if (progressBar) {
        window.addEventListener('scroll', () => {
            const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrollProgress = (window.scrollY / totalHeight) * 100;
            progressBar.style.width = scrollProgress + '%';
        });
    }

    // Update current year in footer
    const currentYearSpan = document.getElementById('current-year');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }
});

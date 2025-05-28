document.addEventListener('DOMContentLoaded', function() {
    // --- Common Website Functionality ---

    // Smooth scrolling for navigation links
    document.querySelectorAll('a.smoothScroll').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });

            // Close mobile menu if open
            const navbarCollapse = document.querySelector('.nav-links'); // Corrected selector from .navbar-collapse
            const menuToggle = document.querySelector('.menu-toggle');
            if (navbarCollapse && navbarCollapse.classList.contains('active')) {
                navbarCollapse.classList.remove('active');
                menuToggle.setAttribute('aria-expanded', 'false');
            }
        });
    });

    // Toggle mobile menu
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const expanded = navLinks.classList.contains('active');
            menuToggle.setAttribute('aria-expanded', expanded);
        });
    }

    // Preloader
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        window.addEventListener('load', () => {
            preloader.style.display = 'none';
        });
    }

    // Back to top button visibility
    const backToTopButton = document.querySelector('.back-to-top');
    if (backToTopButton) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) { // Show button after scrolling 300px
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

    // --- Certifications Carousel Functionality ---
    const carouselTrack = document.querySelector('.certification-carousel .carousel-track');
    const certificationItems = Array.from(document.querySelectorAll('.certification-carousel .certification-item'));
    const prevButton = document.querySelector('.certification-carousel .carousel-nav.prev');
    const nextButton = document.querySelector('.certification-carousel .carousel-nav.next');
    const indicatorsContainer = document.querySelector('.certification-carousel .carousel-indicators');

    if (carouselTrack && certificationItems.length > 0) {
        let currentIndex = 0;
        const totalCertifications = certificationItems.length;

        // Create indicators
        for (let i = 0; i < totalCertifications; i++) {
            const indicator = document.createElement('div');
            indicator.classList.add('indicator');
            indicator.dataset.index = i;
            indicatorsContainer.appendChild(indicator);
            indicator.addEventListener('click', () => {
                moveToSlide(i);
            });
        }

        const indicators = Array.from(document.querySelectorAll('.certification-carousel .indicator'));

        function updateCarousel() {
            if (certificationItems.length === 0) return; // Exit if no items
            // Ensure first item exists and has a defined width
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

        prevButton.addEventListener('click', () => {
            if (currentIndex > 0) {
                moveToSlide(currentIndex - 1);
            } else {
                moveToSlide(totalCertifications - 1); // Loop to last item
            }
        });

        nextButton.addEventListener('click', () => {
            if (currentIndex < totalCertifications - 1) {
                moveToSlide(currentIndex + 1);
            } else {
                moveToSlide(0); // Loop to first item
            }
        });

        // Initial update and adjust carousel on window resize
        updateCarousel();
        window.addEventListener('resize', updateCarousel);
    }

    // --- Contact Form Validation (if you have one) ---
    // Example: You might have a form with an ID like 'contactForm'
    // const contactForm = document.getElementById('contactForm');
    // if (contactForm) {
    //     contactForm.addEventListener('submit', function(e) {
    //         e.preventDefault();
    //         // Add your form validation logic here
    //         // Example: check if fields are not empty
    //         const nameInput = document.getElementById('name');
    //         if (!nameInput.value.trim()) {
    //             // Show error message
    //             console.log('Name is required');
    //         }
    //         // If valid, you might send data via Fetch API or XMLHttpRequest
    //     });
    // }
});

// Hero Slider Functionality
(function() {
    'use strict';
    
    let currentSlide = 0;
    let slideInterval = null;
    let slides = [];
    let dots = [];

    // Function to initialize slider
    function initSlider() {
        slides = document.querySelectorAll('.slide');
        dots = document.querySelectorAll('.dot');
        
        if (slides.length === 0) {
            console.error('No slides found');
            return;
        }

        // Function to show specific slide
        function showSlide(index) {
            if (index < 0 || index >= slides.length) return;
            
            // Remove active class from all slides and dots
            slides.forEach(slide => slide.classList.remove('active'));
            dots.forEach(dot => dot.classList.remove('active'));

            // Add active class to current slide and dot
            if (slides[index]) {
                slides[index].classList.add('active');
            }
            if (dots[index]) {
                dots[index].classList.add('active');
            }
            
            currentSlide = index;
        }

        // Function to go to next slide
        function nextSlide() {
            const next = (currentSlide + 1) % slides.length;
            showSlide(next);
        }

        // Function to start auto-play
        function startSlider() {
            // Clear any existing interval
            if (slideInterval) {
                clearInterval(slideInterval);
            }
            slideInterval = setInterval(nextSlide, 4000); // Change slide every 2 seconds
        }

        // Function to stop auto-play
        function stopSlider() {
            if (slideInterval) {
                clearInterval(slideInterval);
                slideInterval = null;
            }
        }

        // Add click event to dots
        dots.forEach((dot, index) => {
            dot.addEventListener('click', function() {
                showSlide(index);
                stopSlider();
                startSlider(); // Restart auto-play after manual navigation
            });
        });

        // Pause slider on hover
        const slider = document.querySelector('.hero-slider');
        if (slider) {
            slider.addEventListener('mouseenter', stopSlider);
            slider.addEventListener('mouseleave', startSlider);
        }

        // Start the slider
        startSlider();
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initSlider);
    } else {
        // DOM is already ready
        initSlider();
    }
})();


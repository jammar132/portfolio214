// Ensure the DOM is fully loaded before running the script
document.addEventListener('DOMContentLoaded', () => {
    // Portfolio elements
    const portfolioContainer = document.querySelector('.portfolio-container');
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    let currentSlide = 0;

    // Keyboard Navigation
    document.addEventListener('keydown', function (e) {
        if (e.key === 'ArrowRight') {
            scrollPortfolio('next');
        } else if (e.key === 'ArrowLeft') {
            scrollPortfolio('prev');
        }
    });

    // Clickable Area Navigation (ensure elements exist before adding event listeners)
    const clickableAreaLeft = document.querySelector('.clickable-area.left');
    const clickableAreaRight = document.querySelector('.clickable-area.right');

    if (clickableAreaLeft) {
        clickableAreaLeft.addEventListener('click', () => {
            scrollPortfolio('prev');
        });
    }

    if (clickableAreaRight) {
        clickableAreaRight.addEventListener('click', () => {
            scrollPortfolio('next');
        });
    }

    // Scroll to the next or previous slide
    function scrollPortfolio(direction) {
        if (direction === 'next' && currentSlide < slides.length - 1) {
            currentSlide++;
        } else if (direction === 'prev' && currentSlide > 0) {
            currentSlide--;
        }
        updateSlide();
    }

    // Update active slide and navigation dots
    function updateSlide() {
        portfolioContainer.scrollLeft = currentSlide * window.innerWidth;

        slides.forEach((slide, index) => {
            slide.classList.toggle('active', index === currentSlide);
        });

        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentSlide);
        });
    }

    // Add click event to dots for navigation
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentSlide = index;
            updateSlide();
        });
    });

    // Detect scroll to update dots and current slide
    let scrollTimeout;
    portfolioContainer.addEventListener('scroll', () => {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
            const slideWidth = window.innerWidth;
            currentSlide = Math.round(portfolioContainer.scrollLeft / slideWidth);
            updateSlide();
        }, 150);
    });

    // Update slide on window resize
    window.addEventListener('resize', () => {
        portfolioContainer.scrollLeft = currentSlide * window.innerWidth;
    });

    // Populate the project descriptions
    if (typeof projectDescriptions !== 'undefined') {
        // Frog Game Description
        const frogDescriptionElement = document.getElementById('frog-description');
        if (frogDescriptionElement) {
            frogDescriptionElement.innerHTML = projectDescriptions.frog;
        }

        // Quantum Computing Description and Button
        const quantumCDescriptionElement = document.getElementById('quantumC-description');
        const visitWebsiteButton = document.getElementById('visit-website');
        if (quantumCDescriptionElement) {
            quantumCDescriptionElement.innerHTML = projectDescriptions.quantumC;
        }
        if (visitWebsiteButton) {
            visitWebsiteButton.addEventListener('click', () => {
                window.open('https://sites.google.com/asdubai.org/quantumcomputing?usp=sharing', '_blank');
            });
        }

        // BMI Calculator Description
        const bmiDescriptionElement = document.getElementById('bmi-description');
        if (bmiDescriptionElement) {
            bmiDescriptionElement.innerHTML = projectDescriptions.bmiCalculator;
        }

        // Ancient Egypt Description
        const ancientEgyDescriptionElement = document.getElementById('ancientEgy-description');
        if (ancientEgyDescriptionElement) {
            ancientEgyDescriptionElement.innerHTML = projectDescriptions.ancientEgy;
        }

        // Calculator Description
        const calculatorDescriptionElement = document.getElementById('calculator-description');
        if (calculatorDescriptionElement) {
            calculatorDescriptionElement.innerHTML = projectDescriptions.calculator;
        }

        // HBxFC Description
        const HBxFCDescriptionElement = document.getElementById('HBxFC-description');
        if (HBxFCDescriptionElement) {
            HBxFCDescriptionElement.innerHTML = projectDescriptions.HBxFC;
        }

        // Cactus NFT Description
        const cactusNFTDescriptionElement = document.getElementById('cactusNFT-description');
        if (cactusNFTDescriptionElement) {
            cactusNFTDescriptionElement.innerHTML = projectDescriptions.cactusNFT;
        }

        // Self Portrait Description (if needed)
        const selfPortraitDescriptionElement = document.getElementById('self-portrait-description');
        if (selfPortraitDescriptionElement && projectDescriptions.selfPortrait) {
            selfPortraitDescriptionElement.innerHTML = projectDescriptions.selfPortrait;
        }
    }

    // Modal functionality for contact info
    const modal = document.getElementById('contact-modal');
    const contactButton = document.getElementById('contact-button');
    const closeButton = document.querySelector('.close-button');

    if (contactButton && modal && closeButton) {
        // When the user clicks the button, open the modal
        contactButton.addEventListener('click', () => {
            modal.style.display = 'block';
        });

        // When the user clicks on <span> (x), close the modal
        closeButton.addEventListener('click', () => {
            modal.style.display = 'none';
        });

        // When the user clicks anywhere outside of the modal, close it
        window.addEventListener('click', (event) => {
            if (event.target === modal) {
                modal.style.display = 'none';
            }
        });
    }

    // Image paths array for the carousel
    const images = [
        'images/SelfPortrait1.jpg', // Image 1
        'images/SelfPortrait2.jpg'  // Image 2
    ];

    // Boolean flag to track which image is displayed
    let isImageOne = true;

    // Debounce flag to prevent multiple rapid clicks
    let isTransitioning = false;

    // Get the image element and buttons
    const carouselImage = document.getElementById('carousel-image');
    const carouselButtonLeft = document.getElementById('carousel-left');
    const carouselButtonRight = document.getElementById('carousel-right');

    // Function to toggle the displayed image
    function toggleImage() {
        if (isTransitioning) return; // Prevent toggling if an update is in progress
        isTransitioning = true;

        if (isImageOne) {
            carouselImage.src = images[1]; // Show Image 2
        } else {
            carouselImage.src = images[0]; // Show Image 1
        }

        isImageOne = !isImageOne; // Toggle the flag

        // Set a short delay to allow the image to update before another click is processed
        setTimeout(() => {
            isTransitioning = false;
        }, 300); // Adjust delay if necessary
    }

    // Add event listeners for carousel buttons if elements exist
    if (carouselButtonLeft && carouselButtonRight && carouselImage) {
        carouselButtonLeft.addEventListener('click', toggleImage);
        carouselButtonRight.addEventListener('click', toggleImage);

        // Initial call to display the first image
        carouselImage.src = images[0];
    }

    // Initialize BMI calculator canvas (ensure the function exists)
    if (typeof drawBMITable === 'function') {
        drawBMITable();
    }
});
/** @format */

// Versatile continuous ticker animation for any content
document.addEventListener("DOMContentLoaded", function () {
	// Function to initialize and animate a ticker
	function initTicker(selector, speed = 1) {
		const ticker = document.querySelector(selector);

		if (!ticker) {
			return;
		}

		// Get all direct children (works for both spans and images)
		const items = ticker.children;

		if (items.length === 0) {
			return;
		}

		// Clone items and append to ensure continuous flow
		// We'll add multiple copies to ensure there's always enough content
		for (let i = 0; i < 3; i++) {
			Array.from(items).forEach((item) => {
				ticker.appendChild(item.cloneNode(true));
			});
		}

		// Get the total width of one set of items
		const calculateSetWidth = () => {
			let width = 0;
			for (let i = 0; i < items.length; i++) {
				width += items[i].offsetWidth;
			}
			return width;
		};

		const itemSetWidth = calculateSetWidth();

		// Animation variables
		let position = 0;

		// Animation function
		function animate() {
			position -= speed;

			// When we've scrolled past one complete set of items, reset position
			if (position <= -itemSetWidth) {
				position += itemSetWidth;
			}

			// Apply the transformation
			ticker.style.transform = `translateX(${position}px)`;

			// Continue animation
			requestAnimationFrame(animate);
		}

		// Start the animation
		animate();
	}

	// Function to initialize testimonial scrolling with mouse/touch events
	function initTestimonialScroll(selector) {
		const container = document.querySelector(selector);

		if (!container) {
			return;
		}

		let isDown = false;
		let startX;
		let scrollLeft;

		// Mouse events
		container.addEventListener("mousedown", (e) => {
			isDown = true;
			container.classList.add("active");
			startX = e.pageX - container.offsetLeft;
			scrollLeft = container.scrollLeft;
		});

		container.addEventListener("mouseleave", () => {
			isDown = false;
			container.classList.remove("active");
		});

		container.addEventListener("mouseup", () => {
			isDown = false;
			container.classList.remove("active");
		});

		container.addEventListener("mousemove", (e) => {
			if (!isDown) return;
			e.preventDefault();
			const x = e.pageX - container.offsetLeft;
			const walk = (x - startX) * 2; // Adjust scrolling speed
			container.scrollLeft = scrollLeft - walk;
		});

		// Touch events
		container.addEventListener("touchstart", (e) => {
			isDown = true;
			container.classList.add("active");
			startX = e.touches[0].pageX - container.offsetLeft;
			scrollLeft = container.scrollLeft;
		});

		container.addEventListener("touchend", () => {
			isDown = false;
			container.classList.remove("active");
		});

		container.addEventListener("touchmove", (e) => {
			if (!isDown) return;
			const x = e.touches[0].pageX - container.offsetLeft;
			const walk = (x - startX) * 2;
			container.scrollLeft = scrollLeft - walk;
		});

		// Add styling for better user experience
		container.style.cursor = "grab";
		container.style.userSelect = "none";
		container.style.overflowX = "auto";
		container.style.overflowY = "hidden";
		container.style.scrollBehavior = "smooth";

		// Hide scrollbar but keep functionality
		container.style.scrollbarWidth = "none"; // Firefox
		container.style.msOverflowStyle = "none"; // IE/Edge

		// For Chrome/Safari
		const style = document.createElement("style");
		style.textContent = `
      ${selector}::-webkit-scrollbar {
        display: none;
      }
      ${selector}.active {
        cursor: grabbing;
      }
    `;
		document.head.appendChild(style);
	}

	function initHomeHeroScroll() {
		const scrollingText = document.querySelector(".hero-scroll-container");
		const textItems = document.querySelectorAll(".hero-above-heading-text");

		if (!scrollingText) {
			return;
		}

		if (!textItems) {
			return;
		}

		// Calculate the total height of all text items
		let totalHeight = 0;

		textItems.forEach((item) => {
			totalHeight += item.offsetHeight;
		});

		// Clone the text items and append them to create a seamless loop
		textItems.forEach((item) => {
			const clone = item.cloneNode(true);
			scrollingText.appendChild(clone);
		});

		// Set up the animation with delay using keyframes
		// Adjust these values to control speed and delay:
		const scrollDuration = 2; // seconds to scroll one item
		const delayDuration = 3; // seconds to pause on each item
		const totalItems = textItems.length;
		const totalDuration = (scrollDuration + delayDuration) * totalItems;

		// Calculate percentages for keyframes
		let keyframes = "";
		const itemHeight = totalHeight / totalItems;

		for (let i = 0; i < totalItems; i++) {
			// Calculate percentage points for this item
			const startPosition = i * itemHeight;
			const itemStartPercent = ((i * (scrollDuration + delayDuration)) / totalDuration) * 100;
			const scrollEndPercent = itemStartPercent + (scrollDuration / totalDuration) * 100;
			const delayEndPercent = scrollEndPercent + (delayDuration / totalDuration) * 100;

			// Add keyframles for scroll movement and delay (pause)
			keyframes += `
					${itemStartPercent}% {
						transform: translateY(-${startPosition}px);
					}
					${scrollEndPercent}% {
						transform: translateY(-${startPosition + itemHeight}px);
					}
					${delayEndPercent}% {
						transform: translateY(-${startPosition + itemHeight}px);
					}
				`;
		}

		// Create keyframe animation using a style element
		const style = document.createElement("style");

		style.textContent = `
				@keyframes smoothScrollWithDelay {
					0% {
						transform: translateY(0);
					}
					${keyframes}
					100% {
						transform: translateY(-${totalHeight}px);
					}
				}
				.hero-scroll-container {
					animation: smoothScrollWithDelay 45s linear infinite;
				}
			`;

		document.head.appendChild(style);

		// Function to reset animation if needed
		function resetAnimation() {
			scrollingText.style.animation = "none";
			scrollingText.offsetHeight; // Trigger reflow
			scrollingText.style.animation = `smoothScrollWithDelay 45s linear infinite`;
		}
	}

	// Initialize both tickers
	initTicker(".communities-ticker-inner", 1);
	initTicker(".clients-ticker-inner", 1);
	initTestimonialScroll(".testimonial-container");
	initTestimonialScroll(".features-container");
	initHomeHeroScroll();
});

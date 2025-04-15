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

	// Initialize both tickers
	initTicker(".communities-ticker-inner", 1);
	initTicker(".clients-ticker-inner", 1);
	initTestimonialScroll(".testimonial-container");
	initTestimonialScroll(".features-container");
});

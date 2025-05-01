/** @format */

// Versatile continuous ticker animation for any content
document.addEventListener("DOMContentLoaded", function () {
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
	initTestimonialScroll(".testimonial-container");
});

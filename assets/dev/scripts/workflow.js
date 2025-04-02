document.addEventListener('DOMContentLoaded', function() {
	const answers = document.querySelectorAll('.poll-answer');
	
	answers.forEach(answer => {
		const percent = answer.getAttribute('data-percent');
		const span = answer.querySelector('span');
		
		answer.addEventListener('click', function() {
			const overlay = this.querySelector('.poll-overlay');

			overlay.style.display = 'block';
			overlay.style.width = percent + '%';
			overlay.style.animationDuration = percent / 100 + 's';
			overlay.style.setProperty('--percent', percent / 100);

			span.style.display = 'inline';
			span.textContent = percent + '%';
		});
	});
});

document.addEventListener('DOMContentLoaded', function() {
	const modalWindowDownload = document.querySelector('.modal-window-download');
	const modalWindowLetsGo = document.querySelector('.modal-window-lets-go');
	const closeModal = document.querySelector('.modal-close-button');
	const letsGoModal = document.querySelector('.modal-lets-go-button');
	const addComment = document.querySelector('.poll-add-comment input');
	const blurDivs = document.querySelectorAll('[class^=poll-]');

	if ( null !== addComment ) {
		addComment.addEventListener('click', function() {
			modalWindowDownload.style.display = 'block';
			
			blurDivs.forEach(blurDiv => {
				if ( '' !== blurDiv.style.cssText ){
					blurDiv.removeAttribute('style');
				}

				blurDiv.classList.toggle('modal-blur-divs');
			});
		});
	}

	if ( null !== closeModal ) {
		closeModal.addEventListener('click', function() {
			modalWindowDownload.style.display = 'none';
	
			blurDivs.forEach(blurDiv => {
				blurDiv.style.filter = 'blur(0)';
				blurDiv.classList.toggle('modal-blur-divs');
			});
		});
	}

	if ( null !== letsGoModal ) {
		letsGoModal.addEventListener('click', function() {
			modalWindowLetsGo.style.display = 'none';

			blurDivs.forEach(blurDiv => {
				blurDiv.style.filter = 'blur(0)';
			});
		});
	}
});
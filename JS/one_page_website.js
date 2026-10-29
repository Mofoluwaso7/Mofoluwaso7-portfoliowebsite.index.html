const galleryImages = Array.from(
    document.querySelectorAll('#gallery img[data-large-src]')
);

if (galleryImages.length > 0) {
    const lightbox = document.querySelector('.lightbox');
    const image = lightbox.querySelector('.lightbox-image');
    const caption = lightbox.querySelector('.lightbox-caption');
    const closeButton = lightbox.querySelector('.lightbox-close');
    let currentIndex = 0;
    let previouslyFocused;

    const showImage = (index) => {
        currentIndex = (index + galleryImages.length) % galleryImages.length;
        const galleryImage = galleryImages[currentIndex];
        image.src = galleryImage.dataset.largeSrc;
        image.alt = galleryImage.alt;
        caption.textContent = galleryImage.alt;
    };

    const closeLightbox = () => {
        lightbox.hidden = true;
        document.body.style.overflow = '';
        previouslyFocused?.focus();
    };

    galleryImages.forEach((galleryImage, index) => {
        galleryImage.tabIndex = 0;
        galleryImage.addEventListener('click', () => {
            previouslyFocused = galleryImage;
            showImage(index);
            lightbox.hidden = false;
            document.body.style.overflow = 'hidden';
            closeButton.focus();
        });
        galleryImage.addEventListener('keydown', (event) => {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                galleryImage.click();
            }
        });
    });

    closeButton.addEventListener('click', closeLightbox);
    lightbox.querySelector('.lightbox-previous').addEventListener('click', () => {
        showImage(currentIndex - 1);
    });
    lightbox.querySelector('.lightbox-next').addEventListener('click', () => {
        showImage(currentIndex + 1);
    });
    lightbox.addEventListener('click', (event) => {
        if (event.target === lightbox) {
            closeLightbox();
        }
    });
    document.addEventListener('keydown', (event) => {
        if (lightbox.hidden) {
            return;
        }

        if (event.key === 'Escape') {
            closeLightbox();
        } else if (event.key === 'ArrowLeft') {
            showImage(currentIndex - 1);
        } else if (event.key === 'ArrowRight') {
            showImage(currentIndex + 1);
        }
    });
}

const contactForm = document.querySelector('#contact-form');

contactForm?.addEventListener('submit', (event) => {
    event.preventDefault();

    const formData = new FormData(contactForm);
    const name = formData.get('name');
    const email = formData.get('email');
    const message = formData.get('message');
    const subject = encodeURIComponent(`Portfolio message from ${name}`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);
    const status = document.querySelector('#form-status');

    status.textContent = 'Opening your email app to send this message.';
    window.location.href = `mailto:drfoluso@yahoo.com?subject=${subject}&body=${body}`;
});

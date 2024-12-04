document.addEventListener('DOMContentLoaded', function () {
    const images = document.querySelectorAll('.expandable-image');
    images.forEach((image) => {
        image.addEventListener('click', function () {
            if (this.classList.contains('expanded')) {
                // Revert to thumbnail
                this.src = this.dataset.thumb;
                this.style.width = '';
                this.style.maxHeight = '';
                this.classList.remove('expanded');
            } else {
                // Expand to full-size image
                this.src = this.dataset.full;
                this.style.width = 'auto';
                this.style.maxHeight = '90vh';
                this.classList.add('expanded');
            }
        });
    });
});

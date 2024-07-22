class FixedDiv extends HTMLElement {
  constructor() {
      super();
      this.toggle = this.toggle.bind(this);
      this.closeOnOutsideClick = this.closeOnOutsideClick.bind(this);
      this.closeOnEscape = this.closeOnEscape.bind(this);
  }

  connectedCallback() {
      const buttons = document.querySelectorAll('.toggleButton');
      buttons.forEach(button => {
          if (button.getAttribute('data-target') === this.id) {
              button.addEventListener('click', this.toggle);
          }
      });
      document.addEventListener('click', this.closeOnOutsideClick);
      document.addEventListener('keydown', this.closeOnEscape);
  }

  disconnectedCallback() {
      const buttons = document.querySelectorAll('.toggleButton');
      buttons.forEach(button => {
          if (button.getAttribute('data-target') === this.id) {
              button.removeEventListener('click', this.toggle);
          }
      });
      document.removeEventListener('click', this.closeOnOutsideClick);
      document.removeEventListener('keydown', this.closeOnEscape);
  }

    toggle(event) {
        event.stopPropagation();

        const currentlyOpen = document.querySelector('fixed-wrapper[open]');
        if (currentlyOpen && currentlyOpen !== this) {
            currentlyOpen.removeAttribute('open');
            currentlyOpen.style.display = 'none';   

            const currentlyOpenOverlay = document.getElementById(`hover-overlay-${currentlyOpen.id}`);
            if (currentlyOpenOverlay) {
                currentlyOpenOverlay.classList.add('hidden');
                currentlyOpenOverlay.classList.remove('flex');
            }
        }

        const overlay = document.getElementById(`hover-overlay-${this.id}`);
        if (this.style.display === 'none' || this.style.display === '') {
          this.style.display = 'block';
          this.setAttribute('open', '');
          if (overlay) {
            overlay.classList.remove('hidden');
            overlay.classList.add('flex');
          }

        } else {
          this.style.display = 'none';
          this.removeAttribute('open');
          if (overlay) {
            overlay.classList.add('hidden');
            overlay.classList.remove('flex');
          }
        }
    }

  closeOnOutsideClick(event) {
        const overlay = document.getElementById(`hover-overlay-${this.id}`);
        if (this.style.display === 'block' && !this.contains(event.target)) {
            this.style.display = 'none';
            this.removeAttribute('open');
            if (overlay) {
                overlay.classList.add('hidden');
                overlay.classList.remove('flex');
            }
        }
  }

  closeOnEscape(event) {
        if (event.key === 'Escape') {
            const currentlyOpen = document.querySelector('fixed-wrapper[open]');
            if (currentlyOpen) {
                currentlyOpen.style.display = 'none';
                currentlyOpen.removeAttribute('open');
            }
            const overlay = document.getElementById(`hover-overlay-${this.id}`);
            if (overlay) {
                overlay.classList.add('hidden');
                overlay.classList.remove('flex');
            }
        }
  }
}
customElements.define('fixed-wrapper', FixedDiv);


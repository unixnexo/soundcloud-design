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
      }
      
      if (this.style.display === 'none' || this.style.display === '') {
        this.style.display = 'block';
        this.setAttribute('open', '');
      } else {
        this.style.display = 'none';
        this.removeAttribute('open');
      }
    }

    closeOnOutsideClick(event) {
      if (this.style.display === 'block' && !this.contains(event.target)) {
        this.style.display = 'none';
        this.removeAttribute('open');
      }
    }

    closeOnEscape(event) {
      if (event.key === 'Escape') {
        const currentlyOpen = document.querySelector('fixed-wrapper[open]');
        if (currentlyOpen) {
          currentlyOpen.style.display = 'none';
          currentlyOpen.removeAttribute('open');
        }
      }
    }
}
customElements.define('fixed-wrapper', FixedDiv);
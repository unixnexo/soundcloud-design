class SliderItem extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        const imgUrl = this.getAttribute('img');
        const mainText = this.getAttribute('main-text');
        const secondaryText = this.getAttribute('secondary-text');

        this.innerHTML = `
        <div class="flex flex-col w-[130px] md:w-[170px]">
            <!-- img and overlay -->
            <div class="w-[130px] md:size-[170px] overflow-hidden">
                <img src="${imgUrl}" class="size-full object-cover" alt="${mainText}" />
            </div>
            <!-- infos -->
            <div>
                <p class="text-white whitespace-normal line-clamp-1">${mainText}</p>
                <p class="text-xs  whitespace-normal line-clamp-1">${secondaryText}</p>
            </div>
        </div>
        `
    }
}
customElements.define('slider-item', SliderItem);


class Slider extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        const sliderItems = Array.from(this.children)
            .filter(child => child.tagName.toLowerCase() === 'slider-item')
            .map(sliderItem => sliderItem.outerHTML)
            .join('');

        this.innerHTML = `
            <div class="relative whitespace-nowrap">

                <!-- previous btn -->
                <div class="prevBtn absolute top-0 -left-3 h-full pr-10 group pt-20 cursor-pointer select-none touch-none z-30">
                    <div class="size-[32px] flex items-center justify-center bg-soundcloud-main-bg rounded-sm border border-soundcloud-divide group-hover:border-soundcloud-orange group-hover:*:stroke-soundcloud-orange">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="white" class="size-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                        </svg>                              
                    </div>
                </div>
                <!-- next btn -->
                <div class="nextBtn absolute top-0 -right-3 h-full pl-10 group pt-20 cursor-pointer select-none touch-none z-30">
                    <div class="size-[32px] flex items-center justify-center bg-soundcloud-main-bg rounded-sm border border-soundcloud-divide group-hover:border-soundcloud-orange group-hover:*:stroke-soundcloud-orange">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="white" class="size-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                        </svg>                                                           
                    </div>
                </div>

                <div class="slider overflow-x-auto scrollbar-hide">
                    <div class="inner-slider flex space-x-3 md:space-x-4 transition-transform will-change-auto">
                    ${sliderItems}
                    </div>
                </div>

            </div>
        `

        // logic for btns state and scrollbar
        const slider = this.querySelector('.slider');
        const prevBtn = this.querySelector('.prevBtn');
        const nextBtn = this.querySelector('.nextBtn');

        function updateButtonStates() {
            // Check if the slider has reached the end of the left
            if (slider.scrollLeft <= 50) {
                prevBtn.classList.add('hidden');
            } else {
                prevBtn.classList.remove('hidden');
            }
            // Check if the slider has reached the end of the right
            if (slider.scrollLeft + slider.clientWidth >= slider.scrollWidth - 50) {
                nextBtn.classList.add('hidden');
            } else {
                nextBtn.classList.remove('hidden');
            }
        }

        if (window.innerWidth >= 768) {
            updateButtonStates();
            slider.addEventListener('scroll', () => updateButtonStates());
        }

        nextBtn.addEventListener('click', () => {
            slider.scrollBy({left: 500, behavior: 'smooth'});
            updateButtonStates();
        });

        prevBtn.addEventListener('click', () => {
            slider.scrollBy({left: -500, behavior: 'smooth'});
            updateButtonStates();
        });
    }
}
customElements.define('custom-slider', Slider);
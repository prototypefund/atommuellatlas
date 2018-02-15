import DomUtil from '/core/util/DomUtil';

export default class StickyController {
    /**
     * @param targetElement Assumes that the parent of the sticky target contains ONLY the sticky target and can
     *                      be allowed to mirror the dimensions of it.
     */
    constructor(targetElement) {
        this.target = targetElement;
        this.parent = targetElement.parentElement;


        this.resizeHandler = this.onResize.bind(this);
        this.scrollHandler = this.onScroll.bind(this);

        window.addEventListener("resize", this.resizeHandler);
        window.addEventListener("scroll", this.scrollHandler);

        // fix init pos calc
        setTimeout(() => {
            this.onResize();
        }, 100);
    }

    onResize() {
        this.scrollTop = DomUtil.scrollOffset.top;
        this.height = window.innerHeight;

        this.targetRect = this.target.getBoundingClientRect();
        this.targetRect = {
            top: this.targetRect.top + this.scrollTop,
            bottom: this.targetRect.bottom + this.scrollTop,
            width: this.targetRect.right - this.targetRect.left,
            height: this.targetRect.bottom - this.targetRect.top
        };
        
        this.parentRect = this.parent.getBoundingClientRect();
        this.parentRect = {
            top: this.parentRect.top + this.scrollTop,
            bottom: this.parentRect.bottom + this.scrollTop,
            width: this.parentRect.right - this.parentRect.left,
            height: this.parentRect.bottom - this.parentRect.top
        };

        this.centeringOffset = (this.height - this.targetRect.height) / 2;

        this.target.style.width = "auto";
        this.target.style.width = this.targetRect.width + "px";

        this.onScroll();
    }

    onScroll() {
        this.scrollTop = DomUtil.scrollOffset.top;
        
        this.setVerticalPosition();
    }

    setVerticalPosition() {

        // switch to sticky when this y reaches the map
        let diffLineTop = this.scrollTop + this.centeringOffset;
        let diffLineBottom = this.scrollTop + this.height - this.centeringOffset;
        
        let isBelowTop = diffLineTop > this.targetRect.top;
        let isAboveBottom = this.parentRect.bottom > diffLineBottom;

        if (isBelowTop && isAboveBottom) {
            this.target.style.top = this.centeringOffset + "px"; // used by sticky positioning

            DomUtil.setSticky(this.target);
        }
        else {
            if (isBelowTop && !isAboveBottom) {
                this.target.style.top = (this.parentRect.height - this.targetRect.height) + "px";
            } else {
                this.target.style.top = 0;  //this.centeringOffset + "px";
            }
            DomUtil.removeSticky(this.target)
        }
    }

    destroy() {
        window.removeEventListener("resize", this.resizeHandler);
        window.removeEventListener("scroll", this.scrollHandler);
    }
}
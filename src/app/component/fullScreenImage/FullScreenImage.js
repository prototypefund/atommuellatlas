import * as Log from 'loglevel';
import {TweenLite} from "gsap"
import BaseComponent from '/core/component/BaseComponent';
import DomUtil from '/core/util/DomUtil';

import template from './template.twig';
import style from './_style.scss';

import iconInfo from './../../../../static/assets/icons/alert-circle-outline.svg';

const SECTION_HEIGHT = 2000;

export default class FullScreenImage extends BaseComponent {
    // NOTE: markers elements must be available when whatever uses this class appends it. 
    // These elements must match data-marker="id" to keys in data.images in order to trigger show/hide image.
    constructor(data) {
        data.icon = {
            info: iconInfo
        };
        super(template, style, data);
        this.setStickyMarkerContent = data.stickyContent | false;

        this._resizeHandler = this._onResize.bind(this);
        this._scrollHandler = this._onScroll.bind(this);
        this._jumpHandler = this._onJump.bind(this);
        this._attributionHandler = this._onAttributionClick.bind(this);
        this._windowClickHandler = this._onWindowClick.bind(this);
        
        window.addEventListener("click", this._windowClickHandler);
    }

    postRender() {
        super.postRender();
        
        window.addEventListener("resize", this._resizeHandler);
        window.addEventListener("scroll", this._scrollHandler);
        window.addEventListener("keyup", this._jumpHandler);

        this.gradient = this.element.querySelector(".full-screen-image-gradient");

        this.images = [];
        for (let imageId in this.data.images) {
            let image = this.element.querySelector("." + imageId + " > img");
            let marker = document.querySelector(`[data-marker="${imageId}"]`);
            if (!marker) throw new Error("Missing marker element for id: " + imageId);
            let attributionButton  = this.element.querySelector("." + imageId + " .attribution-button");
            let attributionInfo = this.element.querySelector("." + imageId + " .attribution-info");
            
            attributionButton.addEventListener("click", this._attributionHandler);

            this.images.push({
                image: image, // image to trigger
                marker: marker, // when marker is in view
                attributionButton: attributionButton, // clickable
                attributionInfo: attributionInfo // show/hide on click
            });
        }

        setTimeout(() => {
            this._onResize();
        }, 10)
    }

    jumpUp(smooth = false) {
        if (smooth) {

        } else {
            window.scrollBy(0, -SECTION_HEIGHT);
        }
    }

    jumpDown(smooth = false) {
        if (smooth) {
            
        } else {
            window.scrollBy(0, SECTION_HEIGHT);
        }
    }

    showImage(image = this._current) {
        if (!image) throw new Error("Requires an image to be previously set OR a valid image object param.");
        if (this._current) DomUtil.setHidden(this._current.attributionInfo);
        this._current = image;

        DomUtil.removeHidden([image.image, image.attributionButton, this.gradient]);
        if (this.setStickyMarkerContent) {
            DomUtil.removeCollapsed(image.marker);
            TweenLite.to(this.gradient, 0.3, {delay: 1.5, opacity: 1});
        }
    }

    hideImage() {
        if (this._current) {
            DomUtil.setHidden([this._current.image, this._current.attributionButton, this.gradient]);

            if (this.setStickyMarkerContent) {
                DomUtil.setCollapsed(this._current.marker);
                TweenLite.to(this.gradient, 0.3, {opacity: 0});
            }
        }
    }

    _onAttributionClick(event) {
        event.stopPropagation();
        
        DomUtil.removeHidden(this._current.attributionInfo);
    }

    _onWindowClick() {
        if (this._current) {
            DomUtil.setHidden(this._current.attributionInfo);
        }
    }

    _onJump(event) {
        switch (event.keyCode) {
            case 38:
                this.jumpUp();
                break;
            case 40:
                this.jumpDown();
                break;
            default:
                break;
        }

        this._onScroll()
    }

    _onScroll() {
        let image = this._getImageInView();
        if (image) {
            this.hideImage();
            this.showImage(image);
        } else {
            this.hideImage();
        }
    }

    _onResize() {
        this._setMarkerOffsetsY(); // recalculate marker positions
        this._onScroll(); // run hide/show checks
    }

    _setMarkerOffsetsY() {
        let scrollTop = DomUtil.scrollOffset.top;

        for (let image of this.images) {
            let rect = image.marker.getBoundingClientRect();

            image.showAtY = rect.top + scrollTop;
            //TODO: add end-marker functionality

            if (this.setStickyMarkerContent) {
                image.marker.style["min-height"] = SECTION_HEIGHT + "px"; //keep page height
                image.marker.firstElementChild.style["max-width"] = (rect.right - rect.left) + "px"; //keep text as it was
                DomUtil.setSticky(image.marker);
                DomUtil.setCollapsed(image.marker);
            }
        }
    }

    /**
     * Get image based on its marker being in view.
     * Selects top of marker closest to mid in cases where several are in view.
     *
     * Currently shows image if position is at or below the marker, but never hides again as we go further.
     *
     * @private
     * @return {Object} Image containing
     */
    _getImageInView() {
        let scrollTop = DomUtil.scrollOffset.top;
        let height = window.innerHeight;
        let inView = [];

        // select candidates in view
        for (let image of this.images) {
            if (!image.showAtY) throw new Error("Image marker does not have an offset assigned (image.showAtY): ", image);

            // show if we are at or below the marker
            if (image.showAtY < scrollTop + height) {

                let centerOffset = Math.abs((scrollTop + height / 2) - image.showAtY);
                inView.push({image: image, offset: centerOffset});
            }
        }

        // resolve conflict when multiple are in view
        inView.sort((a, b) => {
            return a.offset - b.offset;
        });

        return inView[0] ? inView[0].image : null;
    }

    destroy() {
        super.destroy();

        window.removeEventListener("resize", this._resizeHandler);
        window.removeEventListener("scroll", this._scrollHandler);
        window.removeEventListener("keyup", this._jumpHandler);
        window.removeEventListener("click", this._windowClickHandler);
        
        for (let image of this.images) {
            image.attributionButton.removeEventListener("click", this._attributionHandler)
        }
    }
}
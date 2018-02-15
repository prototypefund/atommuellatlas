import * as Log from 'loglevel';
import BaseComponent from '/core/component/BaseComponent';
import DomUtil from '/core/util/DomUtil';

import template from './template.twig';
import style from './_style.scss';

export default class FullScreenImage extends BaseComponent {
    // NOTE: markers elements must be available when whatever uses this class appends it. 
    // These elements must match data-marker="id" to keys in data.images in order to trigger show/hide image.
    constructor(data) {
        super(template, style, data);

        this._resizeHandler = this._onResize.bind(this);
        this._scrollHandler = this._onScroll.bind(this);
    }

    postRender() {
        super.postRender();
        
        window.addEventListener("resize", this._resizeHandler);
        window.addEventListener("scroll", this._scrollHandler);
        
        this.gradient = this.element.querySelector(".full-screen-image-gradient");
        
        this.images = [];
        for (let imageId in this.data.images) {
            let image = this.element.querySelector("." + imageId);
            let marker = document.querySelector(`[data-marker="${imageId}"]`);
            if (!marker) throw new Error("Missing marker element for id: " + imageId);

            this.images.push({
                image: image, // image to trigger
                marker: marker // when marker is in view
            });
        }

        setTimeout(() => {
            this._onResize();
        }, 10)
    }

    showImage(image = this._current) {
        if (!image) throw new Error("Requires an image to be previously set OR a valid image object param.");
        this._current = image;
        
        DomUtil.removeHidden([image.image, this.gradient]);
    }

    hideImage() {
        if (this._current) {
            DomUtil.setHidden(this._current.image);
            DomUtil.setHidden(this.gradient);
        }
    }

    _onScroll() {

        let image = this._getImageInView();
        if (image) {
            this.hideImage();
            this.showImage(image);
        } else {
            this.hideImage();
        }
        // check marker positions to hide/show images
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
            let string = JSON.stringify(image);
            console.log(image.showAtY, string, image);
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
    }
}
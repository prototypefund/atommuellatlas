import * as Log from 'loglevel';
import {TweenLite} from 'gsap';
import DomUtil from '/core/util/DomUtil';
import BaseView from '/core/component/BaseView';
import OverlayButton from '/app/component/overlayButton/OverlayButton';
import ViewButton from '/app/component/viewButton/ViewButton';
import FullScreenImage from '/app/component/fullScreenImage/FullScreenImage';
import ContentModel from '/app/model/ContentModel';
import Footer from '/app/component/footer/Footer';

import template from './template.twig';
import style from './_style.scss';

const ATTR_OVERLAY = "data-overlay-button";

export default class History extends BaseView {
    constructor(id, data = {}) {
        super(id, template, style, data);
    }
    
    postRender() {
        super.postRender();
        
        this.fullScreenImage = new FullScreenImage(this.data.components.fullScreenImage);
        this.fullScreenImage.appendTo(this.element);

        let btnData = ContentModel.componentData.overlayButton;

        this.overlayBtns = Array.from(this.element.querySelectorAll(".extra-info")).map(element => {return {"wrapper": element}});
        for (let overlay of this.overlayBtns) {
            let target = DomUtil.getAttribute(overlay.wrapper, ATTR_OVERLAY);
            
            overlay.button = new OverlayButton(btnData[target]);
            overlay.button.appendTo(overlay.wrapper);
        }
        
        let viewBtnWrapper = this.element.querySelector(".next-chapter");
        this.viewButton = new ViewButton(this.data.components.viewButton);
        this.viewButton.appendTo(viewBtnWrapper);
        
        this.footer = new Footer(ContentModel.componentData.footer);
        this.footer.appendTo(this.element)
    }
    
    destroy() {
        super.destroy();
        
        this.viewButton.destroy();
        this.fullScreenImage.destroy();
        for (let overlay of this.overlayBtns) {
            overlay.button.destroy();
        }
        
        this.footer.destroy();
        
    }
}
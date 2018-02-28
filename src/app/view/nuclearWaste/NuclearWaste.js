import * as Log from 'loglevel';
import BaseView from '/core/component/BaseView';
import EventDispatcher from '/core/event/EventDispatcher';
import ViewEvent from '/core/event/ViewEvent';
import ContentModel from '/app/model/ContentModel';
import OverlayButton from '/app/component/overlayButton/OverlayButton';
import LinkButton from '/app/component/linkButton/LinkButton';
import ViewButton from '/app/component/viewButton/ViewButton';
import DomUtil from '/core/util/DomUtil';
import Footer from '/app/component/footer/Footer';
import {TweenLite} from 'gsap';

import template from './template.twig';
import style from './_style.scss';

import iconAtom from '../../../../static/assets/icons/atom.svg';
import iconHazard from '../../../../static/assets/icons/nuclear_hazard.svg';
import iconReactor from '../../../../static/assets/icons/reactor.svg';

const CLASS_ANIM_VIBRATE = "vibrate";

const ATTR_OVERLAY = "data-overlay-button";
const ATTR_LINK = "data-link-button";
const ATTR_VIEW = "data-view";

export default class NuclearWaste extends BaseView {
    constructor(id, data = {}) {
        data.icon = Object.assign({}, data.icon, {
            atom: iconAtom,
            nuclear_hazard: iconHazard,
            nuclear_reactor: iconReactor
        });
        super(id, template, style, data);
        
        this._viewJumpHandler = this._onViewLink.bind(this);
    }

    postRender() {
        super.postRender();

        let viewBtnWrapper = this.element.querySelector(".next-chapter");
        this.viewButton = new ViewButton(this.data.components.viewButton);
        this.viewButton.appendTo(viewBtnWrapper);

        this.footer = new Footer(ContentModel.componentData.footer);
        this.footer.appendTo(this.element);


        let overlayBtnData = ContentModel.componentData.overlayButton;
        this.overlayBtns = Array.from(this.element.querySelectorAll(`.extra-info[${ATTR_OVERLAY}]`)).map(element => {return {"wrapper": element}});
        for (let overlay of this.overlayBtns) {
            let target = DomUtil.getAttribute(overlay.wrapper, ATTR_OVERLAY);

            overlay.button = new OverlayButton(overlayBtnData[target]);
            overlay.button.appendTo(overlay.wrapper);
        }

        let linkBtnData = ContentModel.componentData.linkButton;
        this.linkBtns = Array.from(this.element.querySelectorAll(`.extra-info[${ATTR_LINK}]`)).map(element => {return {"wrapper": element}});
        for (let link of this.linkBtns) {
            let target = DomUtil.getAttribute(link.wrapper, ATTR_LINK);

            link.button = new LinkButton(linkBtnData[target]);
            link.button.appendTo(link.wrapper);
        }
        
        this.viewLinks = this.element.querySelectorAll(".view-link");
        for (let viewLink of this.viewLinks) {
            viewLink.addEventListener("click", this._viewJumpHandler);
        }

        this._atomNuclei = this.element.querySelectorAll(".atom-p:not(.legend), .atom-n:not(.legend)");
        this._atomElectrons = this.element.querySelectorAll(".atom-e");
        this.setAtomAnimation();
    }

    setAtomAnimation(offset = 0.135) {
        for (let x = 0; x < this._atomNuclei.length; x++) {
            TweenLite.delayedCall(x * offset, () => {
                DomUtil.addClass(this._atomNuclei[x], CLASS_ANIM_VIBRATE);
            });
        }
    }
    
    _onViewLink(event) {
        EventDispatcher.dispatchEvent(ViewEvent.LOAD, event.target.getAttribute(ATTR_VIEW));
    }

    destroy() {
        super.destroy();
        
        this.viewButton.destroy();
        this.footer.destroy();
        for (let overlay of this.overlayBtns) {
            overlay.button.destroy();
        }
        for (let link of this.linkBtns) {
            link.button.destroy();
        }
        for (let viewLink of this.viewLinks) {
            viewLink.removeEventListener("click", this._viewJumpHandler);
        }
    }
}
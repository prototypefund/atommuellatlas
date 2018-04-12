import * as Log from 'loglevel';
import BaseView from '/core/component/BaseView';
import EventDispatcher from '/core/event/EventDispatcher';
import ViewEvent from '/core/event/ViewEvent';
import ContentModel from '/app/model/ContentModel';
import ViewButton from '/app/component/viewButton/ViewButton';
import Footer from '/app/component/footer/Footer';

import template from './template.twig';
import style from './_style.scss';
import OverlayButton from "../../component/overlayButton/OverlayButton";
import DomUtil from "../../../core/util/DomUtil";


const ATTR_OVERLAY = "data-overlay-button";
const ATTR_VIEW = "data-view";

export default class Participation extends BaseView {
    constructor(id, data = {}) {
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
        this.overlayBtns = Array.from(this.element.querySelectorAll(`.extra-info[${ATTR_OVERLAY}]`)).map(element => {
            return {"wrapper": element}
        });
        for (let overlay of this.overlayBtns) {
            let target = DomUtil.getAttribute(overlay.wrapper, ATTR_OVERLAY);

            overlay.button = new OverlayButton(overlayBtnData[target]);
            overlay.button.appendTo(overlay.wrapper);
        }

        this.viewLinks = this.element.querySelectorAll(".view-link");
        for (let viewLink of this.viewLinks) {
            viewLink.addEventListener("click", this._viewJumpHandler);
        }

    }

    _onViewLink(event) {
        EventDispatcher.dispatchEvent(ViewEvent.LOAD, event.target.getAttribute(ATTR_VIEW));
    }

    destroy() {
        super.destroy();

        this.viewButton.destroy();
        this.footer.destroy();
    }
}
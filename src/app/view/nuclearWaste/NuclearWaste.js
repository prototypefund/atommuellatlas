import * as Log from 'loglevel';
import BaseView from '/core/component/BaseView';
import EventDispatcher from '/core/event/EventDispatcher';
import ViewEvent from '/core/event/ViewEvent';
import ContentModel from '/app/model/ContentModel';
import OverlayButton from '/app/component/overlayButton/OverlayButton';

import template from './template.twig';
import style from './_style.scss';

export default class NuclearWaste extends BaseView {
    constructor(id, data = {}) {
        super(id, template, style, data);
    }

    postRender() {
        super.postRender();
        
        let btnData = ContentModel.componentData.overlayButton;

        this.elementStuff = this.element.querySelector(".p3");
        this.infoStuff = new OverlayButton(btnData.c1p3);
        this.infoStuff.appendTo(this.elementStuff);
    }

    destroy() {
        super.destroy();
    }
}
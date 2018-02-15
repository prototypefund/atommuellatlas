import * as Log from 'loglevel';
import BaseView from '/core/component/BaseView';
import EventDispatcher from '/core/event/EventDispatcher';
import ViewEvent from '/core/event/ViewEvent';
import FullScreenImage from '/app/component/fullScreenImage/FullScreenImage';

import template from './template.twig';
import style from './_style.scss';

export default class History extends BaseView {
    constructor(id, data = {}) {
        data.image = Object.assign({}, data.image, {});
        super(id, template, style, data);
    }
    
    postRender() {
        super.postRender();
        
        this.fullScreenImage = new FullScreenImage(this.data.components.fullScreenImage);
        this.fullScreenImage.appendTo(this.element);
    }
    
    destroy() {
        super.destroy();
        
        this.fullScreenImage.destroy();
    }
}
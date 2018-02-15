import BaseComponent from '/core/component/BaseComponent';
import EventDispatcher from '/core/event/EventDispatcher';
import OverlayEvent from '/core/event/OverlayEvent';

import template from './template.twig';
import style from './_style.scss';

import iconInfo from './../../../../static/assets/icons/question.svg';

export default class OverlayButton extends BaseComponent {
    constructor(data) {
        data.icon = iconInfo;
        super(template, style, data);
        
        this.clickHandler = this._onClick.bind(this);
    }
    
    postRender() {
        super.postRender();
        
        this.element.addEventListener("click", this.clickHandler);
    }
    
    _onClick(event) {
        event.stopPropagation();
        
        EventDispatcher.dispatchEvent(OverlayEvent.OPEN, "c1p3")
    }
    
    destroy() {
        super.destroy();
        
        this.element.removeEventListener("click", this.clickHandler);
    }
}
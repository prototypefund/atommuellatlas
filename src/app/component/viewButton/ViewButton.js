import BaseComponent from '/core/component/BaseComponent';
import EventDispatcher from '/core/event/EventDispatcher';
import ViewEvent from '/core/event/ViewEvent';
import DomUtil from '/core/util/DomUtil';


import template from './template.twig';
import style from './_style.scss';

import iconNext from './../../../../static/assets/icons/next-track-button.svg';

export default class ViewButton extends BaseComponent {
    constructor(data, icon) {
        data.icon = icon || iconNext;
        super(template, style, data);
        
        this._clickHandler = this._onClick.bind(this);
        
        window.addEventListener("resize", this._resizeHandler);
    }
    
    postRender() {
        this.element.addEventListener("click", this._clickHandler);
    }
    
    _onClick(event) {
        EventDispatcher.dispatchEvent(ViewEvent.LOAD, event.target.dataset.target);
        EventDispatcher.dispatchEvent(ViewEvent.SCROLL, "below_nav");
    }
    
    destroy() {
        super.destroy();

        this.element.removeEventListener("click", this._clickHandler);
    }
}
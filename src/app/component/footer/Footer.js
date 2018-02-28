import BaseComponent from '/core/component/BaseComponent';
import OverlayButton from '/app/component/overlayButton/OverlayButton';
import EventDispatcher from '/core/event/EventDispatcher';
import OverlayEvent from '/core/event/OverlayEvent';

import template from './template.twig';
import style from './_style.scss';

import iconPrototype from './../../../../static/assets/icons/logo-prototype.svg';
import iconBMBF from './../../../../static/assets/icons/logo-bmbf.svg';


export default class Footer extends BaseComponent {
    constructor(data) {
        data.icon = {
            prototype: iconPrototype,
            bmbf: iconBMBF
        };
        super(template, style, data);
        
        this._clickHandler = this._onClick.bind(this);
    }
    
    postRender() {
        super.postRender();
        
        this.impressumLink = this.element.querySelector(".impressum");
        this.impressumLink.addEventListener("click", this._clickHandler)
    }
    
    _onClick() {
        EventDispatcher.dispatchEvent(OverlayEvent.OPEN, this.data.impressum.overlay)
    } 
    
    destroy() {
        this.impressumLink.removeEventListener("click", this._clickHandler)
    }
}
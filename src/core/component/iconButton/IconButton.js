import BaseComponent from '/core/component/BaseComponent';

import template from './template.twig';
import style from './_style.scss';

export default class IconButton extends BaseComponent{
    constructor(icon, className) {
        let data = {
            icon: icon,
            className: className
        };
        super(template, style, data);
        
        this._clickHandler = this._onClick.bind(this)
    }
    
    setCallback(callback) {
        this._callback = callback;
    }
    
    postRender() {
        this.element.addEventListener("click", this._clickHandler)
    }
    
    _onClick(event) {
        if (this._callback) {
            this._callback()
        }
    }
    
    destroy() {
        this.element.removeEventListener("click", this._clickHandler)
    }
}
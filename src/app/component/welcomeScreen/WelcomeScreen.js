import * as Log from 'loglevel';
import BaseComponent from '/core/component/BaseComponent';
import EventDispatcher from '/core/event/EventDispatcher';
import OverlayEvent from '/core/event/OverlayEvent';

import template from './template.twig';
import style from './_style.scss';

export default class WelcomeScreen extends BaseComponent {
    constructor(data) {
        super(template, style, data);
        
        this.aboutHandler = this._onAbout.bind(this); 
    }

    postRender() {
        super.postRender();
        
        this.navigationContainer = this.element.querySelector("nav");
        
        this.aboutBtn = this.element.querySelector(".welcome-screen-top-about a");
        this.aboutBtn.addEventListener("click", this.aboutHandler);
    }

    registerNavComponent(navComponent) {
        navComponent.appendTo(this.navigationContainer);
    }
    
    _onAbout() {
        EventDispatcher.dispatchEvent(OverlayEvent.OPEN, "about");
    }
}
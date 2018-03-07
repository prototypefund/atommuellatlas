import * as Log from 'loglevel';
import BaseComponent from '/core/component/BaseComponent';
import EventDispatcher from '/core/event/EventDispatcher';
import OverlayEvent from '/core/event/OverlayEvent';

import template from './template.twig';
import style from './_style.scss';
import iconLogo from './../../../../static/assets/icons/logo.svg';
import iconHero from './../../../../static/assets/icons/logo-bg-block.svg';

export default class WelcomeScreen extends BaseComponent {
    constructor(data) {
        data = Object.assign({}, data, {
            icon: {
                hero: iconHero,
                logo: iconLogo
            }
        });
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
    
    get height() {
        let rect = this.element.getBoundingClientRect();
        return rect.bottom - rect.top;
    }
    
    _onAbout() {
        EventDispatcher.dispatchEvent(OverlayEvent.OPEN, "about");
    }
    
    destroy() {
        super.destroy();
        
        this.aboutBtn.removeEventListener("click", this.aboutHandler);
    }
}
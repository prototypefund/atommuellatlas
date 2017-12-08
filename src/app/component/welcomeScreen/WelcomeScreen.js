import * as Log from 'loglevel';
import BaseComponent from '/core/component/BaseComponent';

import template from './template.twig';
import style from './_style.scss';

export default class WelcomeScreen extends BaseComponent {
    constructor(data) {
        super(template, style, data);
    }

    postRender() {
        super.postRender();
        
        this.navigationContainer = this.element.querySelector("nav");
    }

    registerNavComponent(navComponent) {
        navComponent.appendTo(this.navigationContainer);
    }
}
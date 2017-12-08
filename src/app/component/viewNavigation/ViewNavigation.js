import * as Log from 'loglevel';
import BaseComponent from '/core/component/BaseComponent';
import EventDispatcher from '/core/event/EventDispatcher';
import ViewEvent from '/core/event/ViewEvent';

import template from './template.twig';
import style from './_style.scss';


export default class ViewNavigation extends BaseComponent {
    constructor(data) {
        super(template, style, data);

        this.navItemHandler = this._onViewNavigation.bind(this);
    }

    postRender() {
        this._navBar = this.element.querySelectorAll(".view-navigation-bar");
        this._navItems = this.element.querySelectorAll(".view-navigation-bar-item");

        for (let item of this._navItems) {
            item.addEventListener("click", this.navItemHandler);
        }
    }

    _onViewNavigation(event) {
        event.preventDefault();

        EventDispatcher.dispatchEvent(ViewEvent.LOAD, event.target.dataset.target);
    }

    destroy() {
        for (let item of this._navItems) {
            item.removeEventListener("click", this.viewNavHandler);
        }
    }
}
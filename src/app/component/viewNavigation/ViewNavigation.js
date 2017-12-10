import * as Log from 'loglevel';
import {TweenLite} from 'gsap';
import BaseComponent from '/core/component/BaseComponent';
import EventDispatcher from '/core/event/EventDispatcher';
import ViewEvent from '/core/event/ViewEvent';
import DomUtil from '/core/util/DomUtil';

import template from './template.twig';
import style from './_style.scss';


export default class ViewNavigation extends BaseComponent {
    constructor(data) {
        super(template, style, data);
        this._transitionDuration = 0.5;

        this.navItemHandler = this._onViewNavigation.bind(this);

        EventDispatcher.addEventListener(ViewEvent.LOAD, event => this.selectNavItem(event.id));
    }

    postRender() {
        this._navBar = this.element.querySelector(".view-navigation-bar");
        this._navItems = this.element.querySelectorAll(".view-navigation-bar-item");
        this._navItemLabels = this.element.querySelectorAll(".view-navigation-bar-item-label");

        for (let item of this._navItems) {
            item.addEventListener("click", this.navItemHandler);
        }
    }

    selectNavItem(id) {
        let i = 0, max = this._navItems.length;
        for (i; i < max; i++) {
            if (this._navItems[i].getAttribute("data-target") === id) {
                this._onSelectNavItem(this._navItems[i]);
                return;
            }
        }

        Log.error(`Invalid nav item target: ${id}`);
    }

    _onViewNavigation(event) {
        event.preventDefault();

        this._onSelectNavItem(event.target);
        EventDispatcher.dispatchEvent(ViewEvent.LOAD, event.target.dataset.target);
    }

    _onSelectNavItem(item,) {
        DomUtil.setActive(item, this._navItems);
    }

    setStaticPosition() {
        DomUtil.removeCollapsed(this.element);
        DomUtil.removeSticky(this.element);
        TweenLite.to(this.element, this._transitionDuration, {y: 0}); // reset previous tweening

        this._resetItemTransitions();
    }

    setTransitionPosition(y) {
        let duration = this._transitionDuration;
        if (DomUtil.isSticky(this.element)) {
            DomUtil.removeSticky(this.element);
            duration = 0;
        }
        DomUtil.setCollapsed(this.element);
        TweenLite.to(this.element, duration, {y: Math.round(y)});

        this._resetItemTransitions();
    }

    setStickyPosition(y) {
        DomUtil.setCollapsed(this.element);
        DomUtil.setSticky(this.element);
        TweenLite.to(this.element, 0, {y: Math.round(y)});

        this._transitionItems();
    }

    _transitionItems() {
        if (!this._isTransitioned) {

            this._isTransitioned = true
        }
    }

    OLD_transitionItems() {
        if (!this._isTransitioned) {
            // width should initially be uniform across items
            let rect = this._navItems[0].getBoundingClientRect();
            this._initialItemWidth = rect.right - rect.left;
            
            
            let i = 0, max = this._navItems.length, item, labelWidth;
            for (i; i < max; i++) {
                item = this._navItems[i];
                rect = this._navItemLabels[i].getBoundingClientRect(); // needs to match with this._navItems, 1to1
                labelWidth = rect.right - rect.left; 
                TweenLite.to(item, this._transitionDuration + (i * 0.1), {width: labelWidth});
            }

            this._isTransitioned = true
        }
    }

    _resetItemTransitions() {
        if (this._isTransitioned) {
            let i = 0, max = this._navItems.length, item;
            for (i; i < max; i++) {
                item = this._navItems[i];
                TweenLite.to(item, this._transitionDuration, {width: this._initialItemWidth});
            }

            this._isTransitioned = false;
        }
    }

    destroy() {
        for (let item of this._navItems) {
            item.removeEventListener("click", this.navItemHandler);
        }
    }
}
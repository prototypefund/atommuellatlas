import {TweenLite} from 'gsap';
import DomUtil from '/core/util/DomUtil';
import BaseComponent from '/core/component/BaseComponent';
import style from '/core/component/_baseView.scss';

const CLASS_VIEW = "view";
const CLASS_TRANSITION_ENABLED = "view-transition";
const CLASS_TRANSITION_RIGHT = "view-transition-to-right";
const CLASS_TRANSITION_LEFT = "view-transition-to-left";
const TRANSITION_DURATION = 0; //0.3;

export default class BaseView extends BaseComponent {
    constructor(id, template, style, data) {
        super(template, style, data);
        this._id = id;
        this._order = data.order;
        this._hasAnimation = true;
    }

    get id() {
        return this._id;
    }

    get order() {
        return this._order;
    }

    appendTo(target, viewClass = CLASS_VIEW) {
        super.appendTo(target, viewClass);
    }

    show(callback) {
        let delay = 0;

        if (this._hasAnimation) {
            delay = TRANSITION_DURATION;
            //DomUtil.addClass(this.element, CLASS_HIDDEN);

            //this.element.style.display = ""; // TODO make visible too soon?

            this.runSlideTransition(true);
        }

        TweenLite.delayedCall(delay, () => {
            //DomUtil.removeClass(this.element, CLASS_HIDDEN);
            if (callback) callback();
        });

    }

    hide(callback) {
        let delay = 0;

        if (this._hasAnimation) {
            delay = TRANSITION_DURATION;

            this.runSlideTransition(false);
        }

        TweenLite.delayedCall(delay, () => {
            //this.element.style.display = "none";
            //DomUtil.addClass(this.element, CLASS_HIDDEN);

            if (callback) callback();
        });
    }

    set isAnimated(bool) {
        this._hasAnimation = bool;
    }

    set isTransitionForward(bool) {
        //console.log("TRANSITION DIRECTION", bool, this._id);
        this._isTransitionForward = bool;
    }

    runSlideTransition(isInbound) {
        // TODO transition should occur diffently, like a carousel, if we want slides
        
        //let transitionClass = this._isTransitionForward ? CLASS_TRANSITION_RIGHT : CLASS_TRANSITION_LEFT;


        //console.log("RUN TRANSITION", transitionClass);
        
        /*
        if (isInbound) {
            DomUtil.removeClass(this.element, CLASS_TRANSITION_ENABLED); // disable transitions
            DomUtil.addClass(this.element, transitionClass); // set outside positioning state
            DomUtil.addClass(this.element, CLASS_TRANSITION_ENABLED); // enable transitions
            setTimeout(() => {
                DomUtil.removeClass(this.element, transitionClass); // transition to original state
            }, 10)
        } else {
            DomUtil.addClass(this.element, CLASS_TRANSITION_ENABLED); // enable transitions
            DomUtil.addClass(this.element, transitionClass); // transition to outbound state
        }
        */
        

        /*
         if (isInbound) {
         let operator = this._isTransitionForward ? "-" : "+";

         TweenLite.fromTo(this.element, TRANSITION_DURATION,
         {x: `${operator}120%`},
         {x: 0}
         )

         } else {
         let operator = this._isTransitionForward ? "+" : "-";

         TweenLite.fromTo(this.element, TRANSITION_DURATION,
         {x: 0},
         {x: `${operator}120%`}
         )

         }
         */
    }
}
import WelcomeScreen from '/app/component/welcomeScreen/WelcomeScreen';
import ViewNavigation from '/app/component/viewNavigation/ViewNavigation';
import ContentModel from '/app/model/ContentModel';
import AppStateModel from '/app/model/AppStateModel';
import EventDispatcher from '/core/event/EventDispatcher';
import ViewEvent from '/core/event/ViewEvent';

export default class MainController {
    constructor(introTarget) {
        
        let navData = Object.assign(ContentModel.componentData.viewNavigation, {items: ContentModel.viewData});
        this.viewNavigation = new ViewNavigation(navData);

        this.welcomeScreen = new WelcomeScreen(ContentModel.componentData.welcomeScreen);
        this.welcomeScreen.appendTo(introTarget);
        this.welcomeScreen.registerNavComponent(this.viewNavigation);

        this._iniNavRect = this.viewNavigation.element.getBoundingClientRect();
        this._iniHeaderRect = this.welcomeScreen.element.getBoundingClientRect();

        this._lockNavHeight();
        
        
        this.scrollHandler = this._onScroll.bind(this);
        this.resizeHandler = this._onResize.bind(this);

        window.addEventListener("resize", this.resizeHandler);
        window.addEventListener("scroll", this.scrollHandler);

        EventDispatcher.addEventListener(ViewEvent.CHANGED, event => this._onViewChange(event));
    }

    _onViewChange(event) {
        AppStateModel.currentViewID = event.id;
    }

    _onScroll(event) {
        this._setNavPosition();
    }

    _onResize(event) {
        this._setNavPosition();
    }

    _lockNavHeight() {
        // so we can set absolute/fixed nav position without collapsing its parent 
        this.viewNavigation.element.parentElement.style["min-height"] = `${this._iniNavRect.bottom - this._iniNavRect.top}px`;
    }

    _setNavPosition() {
        let scrollY = window.scrollY;

        if (scrollY >= this._iniNavRect.top) {
            let headerRect = this.welcomeScreen.element.getBoundingClientRect();
            let headerBottom = headerRect.bottom - headerRect.top;
            if (scrollY > headerBottom - 5) { // sticky position
                this.viewNavigation.setStickyPosition(0);

            } else { // position nav below header
                let topOffsetY = this._iniHeaderRect.bottom - this._iniNavRect.top;
                this.viewNavigation.setTransitionPosition(topOffsetY);
            }

        } else { // original position
            this.viewNavigation.setStaticPosition();
        }
    }
}
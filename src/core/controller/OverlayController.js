import * as Log from 'loglevel';
import DomUtil from '/core/util/DomUtil';
import EventDispatcher from '/core/event/EventDispatcher';
import OverlayEvent from '/core/event/OverlayEvent';

const CLASS_HIDDEN = "hidden";

export default class OverlayController {
    constructor(targetNode, viewFactory) {
        if (!targetNode) throw new Error(`Requires a target element: ${targetNode}`);
        this.container = targetNode;
        this.viewFactory = viewFactory;

        EventDispatcher.addEventListener(OverlayEvent.OPEN, event => this.openOverlay(event));
        EventDispatcher.addEventListener(OverlayEvent.CLOSE, event => this.closeOverlay(event));

        this.closeHandler = this._onClose.bind(this);
        this.container.addEventListener("click", this.closeHandler);
    }

    openOverlay(event) {
        this._current = this.viewFactory.getOverlayInstance(event.id);
        
        
        this.closeOverlay();
        this._current.appendTo(this.container);
        DomUtil.removeClass(this.container, CLASS_HIDDEN);
    }

    closeOverlay(event) {
        DomUtil.addClass(this.container, CLASS_HIDDEN);
        this._destroyCurrent();
        this.container.innerHTML = "";
    }

    _destroyCurrent() {
        if (this._current) this._current.destroy();
    }

    _onClose(event) {
        if (event.target === this.container || !event) {
            this.closeOverlay();
        }
    }
}
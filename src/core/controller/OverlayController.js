import * as Log from 'loglevel';
import DomUtil from '/core/util/DomUtil';
import EventDispatcher from '/core/event/EventDispatcher';
import OverlayEvent from '/core/event/OverlayEvent';


// TODO this compent should be a core component
import IconButton from '/core/component/iconButton/IconButton'

import iconClose from '../../../static/assets/icons/cross.svg';

export default class OverlayController {
    constructor(targetNode, viewFactory) {
        if (!targetNode) throw new Error(`Requires a target element: ${targetNode}`);
        this.container = targetNode;
        this.viewFactory = viewFactory;

        EventDispatcher.addEventListener(OverlayEvent.OPEN, event => this.openOverlay(event));
        EventDispatcher.addEventListener(OverlayEvent.CLOSE, event => this.closeOverlay(event));

        this.closeHandler = this._onClose.bind(this);
        this.keyUpHandler = this._onKeyUp.bind(this);

        this.container.addEventListener("click", this.closeHandler);
        window.addEventListener("keyup", this.keyUpHandler);

    }

    openOverlay(event) {
        this._current = this.viewFactory.getOverlayInstance(event.id, event.params.id);

        this.closeOverlay();
        
        this._current.appendTo(this.container);
        
        
        DomUtil.removeHidden(this.container);

        this._closeButton = this._getCloseButton();
        this._closeButton.appendTo(this._current._element);
        
        this.scrollLock = true;
    }

    closeOverlay(event) {
        DomUtil.setHidden(this.container);
        if (this._closeButton) this._closeButton.destroy();
        this._destroyCurrent();
        this.container.innerHTML = "";
        this.scrollLock = false;
    }

    _getCloseButton() {
        let btn = new IconButton(iconClose, "close-button");
        btn.setCallback(this.closeOverlay.bind(this));
        return btn
    }

    set scrollLock(bool) {
        if (bool) {
            DomUtil.setScrollLock(document.body);
        } else {
            DomUtil.removeScrollLock(document.body);
        }
    }

    _destroyCurrent() {
        if (this._current) this._current.destroy();
    }

    _onClose(event) {
        if (event.target === this.container || !event) {
            this.closeOverlay();
        }
    }

    _onKeyUp(event) {
        if (event.keyCode === 27) {
            this.closeOverlay();
        }
    }
}
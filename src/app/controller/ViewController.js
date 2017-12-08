import * as Log from 'loglevel';
import EventDispatcher from '/core/event/EventDispatcher';
import ViewEvent from '/core/event/ViewEvent';

export default class ViewController {
    constructor(targetNode, viewFactory) {
        if (!targetNode) throw new Error(`Requires a target element: ${targetNode}`);
        ViewController._targetNode = targetNode;
        ViewController._viewFactory = viewFactory;
        ViewController._currentView = null;
        ViewController._isTransitionRunning = false;
        
        EventDispatcher.addEventListener(ViewEvent.LOAD, event => ViewController.loadView(event));
        EventDispatcher.addEventListener(ViewEvent.UNLOAD, event => ViewController.hideCurrentView(() => this._removeCurrentView()));
    }

    static loadView(event) {
        
        if (ViewController._isTransitionRunning) {
            return;
        }

        ViewController._isTransitionRunning = true;

        
        // create new view
        let id = event.id;
        let params = event.params;
        let view = ViewController._viewFactory.getViewInstance(id, params);

        if (!view) {
            Log.error('loadview - view does not exists');
            return;
        }

        Log.debug('Load new view:', view.constructor.name);

        EventDispatcher.dispatchEvent(new ViewEvent(ViewEvent.START_LOADING));

        // render the template before preloading
        view.appendTo(ViewController._targetNode);


        ViewController.hideCurrentView(() => ViewController._showNewView(view));
    }

    static hideCurrentView(callback) {

        if (ViewController._currentView) {
            Log.debug('Hide current view:', ViewController._currentView.constructor.name);
            ViewController._currentView.hide(() => callback());
        } else {
            callback();
        }
    }

    static _showNewView(view) {
        if (ViewController._currentView) {
            ViewController._removeCurrentView();
        }

        Log.debug('Show new view:', view.constructor.name);

        this._currentView = view;
        this._currentView.show(() => this._showViewCallback(view.id));
    }

    static _showViewCallback(viewId) {
        this._isTransitionRunning = false;
        EventDispatcher.dispatchEvent(new ViewEvent(ViewEvent.CHANGED, viewId));
    }

    static _removeCurrentView() {
        Log.debug('Remove current view:', this._currentView.constructor.name);

        this._currentView.destroy();
        this._currentView.removeFromParent();
        this._currentView = null;
    }
}
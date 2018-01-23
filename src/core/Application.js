import "/app/view/_base.scss";
import * as Log from 'loglevel';
import EventDispatcher from '/core/event/EventDispatcher';
import ViewEvent from '/core/event/ViewEvent';
import ViewFactory from '/core/view/ViewFactory';
import ViewController from '/core/controller/ViewController';
import OverlayController from '/core/controller/OverlayController';
import MainController from '/app/controller/MainController';
import ContentModel from '/app/model/ContentModel';
    
export default class Application {
    constructor(content) {
        ContentModel.content = content;

        Log.setLevel(ContentModel.logLevel);
        Log.debug("content:", ContentModel.content);

        this._viewFactory = new ViewFactory();
    }
    
    initHeader(navContainer, introContainer) {
        
        this._mainController = new MainController(navContainer, introContainer);
    }
    
    initView(viewContainer, viewMap) {

        this._viewFactory.viewMap = viewMap;
        this._viewController = new ViewController(viewContainer, this._viewFactory);
    }
    
    initOverlay(overlayContainer, overlayMap) {
        this._viewFactory.overlayMap = overlayMap;
        this._overlayController = new OverlayController(overlayContainer, this._viewFactory);
    }
    
    start(viewID) {
        EventDispatcher.dispatchEvent(ViewEvent.LOAD, viewID);
    }
}

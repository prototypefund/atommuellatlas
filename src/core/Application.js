import "/app/view/_base.scss";
import * as Log from 'loglevel';
import EventDispatcher from '/core/event/EventDispatcher';
import ViewEvent from '/core/event/ViewEvent';
import ViewFactory from '/core/view/ViewFactory';
import ViewController from '/app/controller/ViewController';
import MainController from '/app/controller/MainController';
import ContentModel from '/app/model/ContentModel';
    
export default class Application {
    constructor(content) {
        ContentModel.content = content;

        Log.setLevel(ContentModel.logLevel);
        Log.debug("content:", ContentModel.content);
    }
    
    initHeader(navContainer, introContainer) {
        
        this._mainController = new MainController(navContainer, introContainer);
    }
    
    initView(viewContainer, viewMap) {

        this._viewFactory = new ViewFactory(viewMap);
        this._viewController = new ViewController(viewContainer, this._viewFactory);
    }
    
    start(viewID) {
        EventDispatcher.dispatchEvent(ViewEvent.LOAD, viewID);
    }
}

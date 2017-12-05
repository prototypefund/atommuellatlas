import * as Log from 'loglevel';
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
    
    init(targetNode, viewMap) {

        this._viewFactory = new ViewFactory(viewMap);
        this._viewController = new ViewController(targetNode, this._viewFactory);
        this._mainController = new MainController();
    }
}
import './global.scss';
import * as Log from 'loglevel';
import Application from '/core/Application';
import EventDispatcher from '/core/event/EventDispatcher';
import ViewEvent from '/core/event/ViewEvent';
import ContentModel from '/app/model/ContentModel';
import content from 'content';

import NuclearWaste from '/app/view/nuclearWaste/NuclearWaste';
import History from '/app/view/history/History'


new class App extends Application {
    constructor() {
        super(content);

        const viewContainer = document.querySelector('main');
        const viewMap = { // match keys to content.view[key]
            "nuclearWaste": NuclearWaste,
            "history": History
        };

        if(!viewContainer || !viewMap) throw new Error("Main Initialization error");

        this.init(viewContainer, viewMap);
        EventDispatcher.dispatchEvent(ViewEvent.LOAD, Object.keys(viewMap)[0]);
    }
};
import '/global.scss';
import Application from '/core/Application';

// content.json
import content from 'content';

// chapters
import NuclearWaste from '/app/view/nuclearWaste/NuclearWaste';
import History from '/app/view/history/History';
import Search from '/app/view/search/Search';
import Participation from '/app/view/participation/Participation';
import Future from '/app/view/future/Future';


new class App extends Application {
    constructor() {
        super(content);

        const introContainer = document.querySelector(".introduction");
        const viewContainer = document.querySelector("main");
        const viewMap = { // match keys to content.view[key]
            "nuclearWaste": NuclearWaste,
            "history": History,
            "search": Search,
            "participation": Participation,
            "future": Future
        };

        if (!viewContainer || !viewMap) throw new Error("Main Initialization error");

        this.initHeader(introContainer);
        this.initView(viewContainer, viewMap);


        this.start("nuclearWaste");
    }
};
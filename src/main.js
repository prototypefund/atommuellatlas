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

// overlays
import Basic from '/app/overlay/basic/Basic';
import Info from '/app/overlay/info/Info';
import Dark from '/app/overlay/dark/Dark';


new class App extends Application {
    constructor() {
        super(content);

        const introContainer = document.querySelector(".introduction");
        const overlayContainer = document.querySelector(".overlay");
        const viewContainer = document.querySelector("main");
        const viewMap = { // match keys to content.view[key]
            "nuclearWaste": NuclearWaste,
            "history": History,
            "search": Search,
            "participation": Participation,
            "future": Future
        };
        
        const overlayMap = {
            "basic": Basic,
            "info": Info,
            "dark": Dark
        };

        if (!viewContainer || !introContainer || !overlayContainer) throw new Error("Initialization container-element missing");

        this.initStatic(introContainer);
        this.initView(viewContainer, viewMap);
        this.initOverlay(overlayContainer, overlayMap);


        this.start("search");
    }
};
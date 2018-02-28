export default class ViewEvent {
    static get _type() {
        if (!ViewEvent._eventMap) {
            ViewEvent._eventMap = {
                LOAD: "ViewEvent.load",
                UNLOAD: "ViewEvent.unload",
                SCROLL: "ViewEvent.scroll",
                CHANGED: "ViewEvent.changed",
                START_LOADING: "ViewEvent.startLoading",
                LOADING_COMPLETE: "ViewEvent.loadingComplete"
            }
        }
        return ViewEvent._eventMap;
    }

    static get LOAD() {
        return ViewEvent._type.LOAD;
    }

    static get UNLOAD() {
        return ViewEvent._type.UNLOAD;
    }
    
    static get SCROLL() {
        return ViewEvent._type.SCROLL;
    }

    static get CHANGED() {
        return ViewEvent._type.CHANGED;
    }

    
    static get START_LOADING() {
        return ViewEvent._type.START_LOADING;
    }
    
    static get LOADING_COMPLETE() {
        return ViewEvent._type.LOADING_COMPLETE;
    }
    
}
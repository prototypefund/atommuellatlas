export default class AppStateModel {
    static set currentViewID(id) {
        AppStateModel._currentViewId = id;
    }
    
    static get currentViewID() {
        return AppStateModel._currentViewId;
    }
    
    static setViewScrollPosY(id, offsetTop) {
        if (!AppStateModel._scrollOffset) AppStateModel._initViewScrollPosY();
        
        AppStateModel._scrollOffset[id] = offsetTop;
    }
    
    static getViewScrollPosY(id) {
        if (!AppStateModel._scrollOffset) AppStateModel._initViewScrollPosY();
        
        return AppStateModel._scrollOffset[id] || 0;
    }
    
    
    
    
    
    
    static _initViewScrollPosY() {
        AppStateModel._scrollOffset = {};
    }
}
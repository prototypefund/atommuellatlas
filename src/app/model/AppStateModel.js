export default class AppStateModel {
    static set currentViewID(id) {
        AppStateModel._currentViewId = id;
    }
    
    static get currentViewID() {
        return AppStateModel._currentViewId;
    }
}
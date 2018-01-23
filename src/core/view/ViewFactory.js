import ContentModel from '/app/model/ContentModel';

export default class ViewFactory {
    constructor() {
        
    }
    
    set viewMap(classMap) {
        this._viewMap = classMap;
    }
    
    set overlayMap(classMap) {
        this._overlayMap = classMap;
    }

    getViewByID(id) {
        let view = this._viewMap[id];
        if (!view) throw new Error (`Unknown view: ${id}`);
        return view;
    }
    
    getViewDataByID(id) {
        let data = ContentModel.viewData[id];
        if (!data) throw new Error (`Missing data for view: ${id}`);
        return data;   
    }

    getOverlayByID(id) {
        let overlay = this._overlayMap[id];
        if (!overlay) throw new Error (`Unknown overlay: ${id}`);
        return overlay;
    }

    getOverlayDataByID(id) {
        let data = ContentModel.overlayData[id];
        if (!data) throw new Error (`Missing data for overlay: ${id}`);
        return data;
    }
    
    getViewInstance(id) {
        let ViewClass = this.getViewByID(id);
        let data = this.getViewDataByID(id);

        return new ViewClass(id, data);
    }
    
    getOverlayInstance (id) {
        let overlayClass = this.getOverlayByID(id);
        let data = this.getOverlayDataByID(id);

        return new overlayClass(id, data);
    }
}
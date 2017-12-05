import ContentModel from '/app/model/ContentModel';

export default class ViewFactory {
    constructor(viewMap) {
        this._viewMap = viewMap;
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

    getViewInstance(id) {
        let ViewClass = this.getViewByID(id);
        let data = this.getViewDataByID(id);

        return new ViewClass(data);
    }
}
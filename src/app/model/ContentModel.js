export default class ContentModel {
    static set content(data) {
        ContentModel._content = data;
    }
    
    static get content() {
        return ContentModel._content;
    }
    
    static get imageData() {
        if (!ContentModel._content.image) throw new Error("Expected content.json format unmet: content.image");
        return ContentModel._content.image;
    }
    
    static get componentData() {
        if (!ContentModel._content.component) throw new Error("Expected content.json format unmet: content.component");
        return ContentModel._content.component;
    }
    
    static get viewData() {
        if (!ContentModel._content.view) throw new Error("Expected content.json format unmet: content.view");
        return ContentModel._content.view;
    }
    
    static get logLevel() {
        if (!ContentModel.content.view) throw new Error("No 'loglevel' setting found: content.logLevel");
        return ContentModel._content.logLevel;
    }
}
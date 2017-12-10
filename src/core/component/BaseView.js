import BaseComponent from '/core/component/BaseComponent';

export default class BaseView extends BaseComponent {
    constructor(id, template, style, data) {
        super(template, style, data);
        this._id = id;
    }
    
    get id () {
        return this._id;
    }
    
    render() {
        super.render();
    }

    show(callback) {
        this.element.style.display = "";
        // TODO transition

        if (callback) callback();
    }

    hide(callback) {
        this.element.style.display = "none";
        // TODO transition

        if (callback) callback();
    }
}
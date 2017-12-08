import BaseComponent from '/core/component/BaseComponent';

export default class BaseView extends BaseComponent {
    constructor(template, style, data) {
        super(template, style, data)
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
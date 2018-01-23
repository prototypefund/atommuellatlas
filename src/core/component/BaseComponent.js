import Log from 'loglevel';
import DomUtil from '/core/util/DomUtil';
import ContentModel from '/app/model/ContentModel';

export default class BaseComponent {
    constructor(template, style, data = {}) {
        this._template = template;
        this._style = style;
        this._data = data;
        this._images = ContentModel.imageData;

        Log.debug(`:::: new ${this.constructor.name} Component ::::`);
    }

    appendTo(parent, className) {
        if (!this.element) this.render();
        parent.appendChild(this.element);
        if(className) DomUtil.addClass(this.element, className);
        this.postRender();
    }

    render() {
        this._element = document.createElement("div");
        this._element.innerHTML = this._template({data: this._data, image: this._images, style: this._style});
        this._element = this._element.firstChild;
    }

    postRender() {
        // Add post-render processing
    }

    removeFromParent() {
        try {
            this.element.parentNode.removeChild(this.element);
        }
        catch (e) {
            Log.error("could not remove element", this.element);
        }
    }

    set onChangeCallback(callback) {
        this._onChangeCallback = callback;
    }

    _notifyChange(data = {}) {
        if (this._onChangeCallback) this._onChangeCallback(data);
    }

    get data() {
        return this._data;
    }

    get element() {
        return this._element;
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

    destroy() {

    }
}
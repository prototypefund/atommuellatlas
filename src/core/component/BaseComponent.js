import Log from 'loglevel';

export default class BaseComponent {
    constructor(template, style, data = {}) {
        this._template = template;
        this._style = style;
        this._data = data;

        Log.debug(`:::: new ${this.constructor.name} Component ::::`);
    }

    render(visible = true) {
        this._element = document.createElement("div");
        this._element.innerHTML = this._template({data: this._data, style: this._style});
        this._element = this._element.firstChild;
        if(!visible) this._element.style.display = 'none';
    }

    appendTo(parent) {
        if (!this.element) this.render();
        parent.appendChild(this.element);
    }

    removeFromParent() {
        try {
            this.element.parentNode.removeChild(this.element);
        }
        catch(e) {
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
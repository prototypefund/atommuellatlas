const CLASS = { // apply style per component to these classes
    active: "active",
    hover: "hover",
    hidden: "hidden",
    expand: "expand",
    collapse: "collapsed",
    sticky: "sticky",
    scrollLock: "scroll-lock"
};

export default class DomUtil {

    static hasAttribute(elementOrElements, attribute, value) {
        let result = false;
        if (DomUtil._isMany(elementOrElements)) {
            for (let element of elementOrElements) {
                if (DomUtil._hasAttr(element, attribute, value)) result = true; // if anyone has it, result is true
            }
        } else {
            result = DomUtil._hasAttr(elementOrElements, attribute, value);
        }
        return result;
    }

    static setAttribute(elementOrElements, attribute, value) {
        if (DomUtil._isMany(elementOrElements)) {
            for (let element of elementOrElements) element.setAttribute(attribute, value);
        } else {
            elementOrElements.setAttribute(attribute, value);
        }
    }
    
    static removeAttribute(elementOrElements, attribute) {
        if (DomUtil._isMany(elementOrElements)) {
            for (let element of elementOrElements) element.removeAttribute(attribute);
        } else {
            elementOrElements.removeAttribute(attribute);
        }
    }
    
    static getAttribute(element, attribute) {
        return element.getAttribute(attribute);
    }

    static get scrollOffset() {
        return {
            left: (window.pageXOffset || document.scrollLeft || 0) - (document.clientLeft || 0),
            top: (window.pageYOffset || document.scrollTop || 0) - (document.clientTop || 0)
        }
    }

    static addClass(elementOrElements, className) {
        if (DomUtil._isMany(elementOrElements)) {
            for (let element of elementOrElements) element.classList.add(className);
        } else {
            elementOrElements.classList.add(className);
        }
    }

    static removeClass(elementOrElements, className) {
        if (DomUtil._isMany(elementOrElements)) {
            for (let element of elementOrElements) element.classList.remove(className);
        } else {
            elementOrElements.classList.remove(className);
        }
    }

    static hasClass(elementOrElements, className) {
        let result = false;
        if (DomUtil._isMany(elementOrElements)) {
            for (let element of elementOrElements) {
                if (element.classList.contains(className)) result = true; // if anyone has it, result is true
            }
        } else {
            result = elementOrElements.classList.contains(className);
        }
        return result;
    }


    // presets (intention is to add to single/many, and remove on multiple)
    static setActive(elementOrElements, elementsToReset = []) {
        DomUtil._addStateClass(elementOrElements, elementsToReset, CLASS.active);
    }

    static setHover(elementOrElements, elementsToReset = []) {
        DomUtil._addStateClass(elementOrElements, elementsToReset, CLASS.hover);
    }

    static setHidden(elementOrElements, elementsToReset = []) {
        DomUtil._addStateClass(elementOrElements, elementsToReset, CLASS.hidden);
    }

    static setCollapsed(elementOrElements, elementsToReset = []) {
        DomUtil._addStateClass(elementOrElements, elementsToReset, CLASS.collapse);
    }

    static setExpanded(elementOrElements, elementsToReset = []) {
        DomUtil._addStateClass(elementOrElements, elementsToReset, CLASS.expand);
    }

    static setSticky(elementOrElements, elementsToReset = []) {
        DomUtil._addStateClass(elementOrElements, elementsToReset, CLASS.sticky);
    }

    static setScrollLock(elementOrElements, elementsToReset = []) {
        DomUtil._addStateClass(elementOrElements, elementsToReset, CLASS.scrollLock);
    }


    static removeActive(elementOrElements) {
        DomUtil._removeStateClass(elementOrElements, CLASS.active);
    }

    static removeHover(elementOrElements) {
        DomUtil._removeStateClass(elementOrElements, CLASS.hover);
    }

    static removeHidden(elementOrElements) {
        DomUtil._removeStateClass(elementOrElements, CLASS.hidden);
    }

    static removeCollapsed(elementOrElements) {
        DomUtil._removeStateClass(elementOrElements, CLASS.collapse);
    }

    static removeExpanded(elementOrElements) {
        DomUtil._removeStateClass(elementOrElements, CLASS.expand);
    }

    static removeSticky(elementOrElements) {
        DomUtil._removeStateClass(elementOrElements, CLASS.sticky);
    }

    static removeScrollLock(elementOrElements) {
        DomUtil._removeStateClass(elementOrElements, CLASS.scrollLock);
    }


    static isActive(element) {
        return DomUtil.hasClass(element, CLASS.active);
    }

    static isHover(element) {
        return DomUtil.hasClass(element, CLASS.hover);
    }

    static isHidden(element) {
        return DomUtil.hasClass(element, CLASS.hidden);
    }

    static isCollapsed(element) {
        return DomUtil.hasClass(element, CLASS.collapse);
    }

    static isExpanded(element) {
        return DomUtil.hasClass(element, CLASS.expand);
    }

    static isSticky(element) {
        return DomUtil.hasClass(element, CLASS.sticky);
    }

    static isScrollLock(element) {
        return DomUtil.hasClass(element, CLASS.scrollLock);
    }


    // preset helpers
    static _addStateClass(elementOrElements, elementsToReset, className) {
        if (DomUtil._isMany(elementOrElements)) {
            for (let element of elementOrElements) {
                DomUtil._multiClassReset(null, elementsToReset, className); // can still reset, just not without exempted element
                DomUtil.addClass(element, className);
            }
        } else {
            DomUtil._multiClassReset(elementOrElements, elementsToReset, className);
            DomUtil.addClass(elementOrElements, className);
        }
    }

    static _removeStateClass(elementOrElements, className) {
        if (DomUtil._isMany(elementOrElements)) {
            DomUtil._multiClassReset(null, elementOrElements, className)
        } else {
            DomUtil.removeClass(elementOrElements, className);
        }
    }

    static _multiClassReset(exceptionElement, elements, className) {
        let i = 0, limit = elements.length;
        for (i; i < limit; i++) {
            if (elements[i] !== exceptionElement) {
                DomUtil.removeClass(elements[i], className);
            }
        }
    }

    static _isMany(elementOrElements) {
        return Array.isArray(elementOrElements) || elementOrElements instanceof NodeList;
    }

    static _hasAttr(element, attribute, value) {
        if (value) {
            return element.getAttribute(attribute) === value;
        } else {
            return element.hasAttribute(attribute)
        }
    }
}
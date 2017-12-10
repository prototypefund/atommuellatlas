const CLASS = { // apply style per component to these classes
    active: "active",
    hover: "hover",
    hidden: "hidden",
    expand: "expand",
    collapse: "collapsed",
    sticky: "sticky"
};

export default class DomUtil {

    static addClass(element, className) {
        element.classList.add(className);
    }

    static removeClass(element, className) {
        element.classList.remove(className);
    }

    static hasClass(element, className) {
        return element.classList.contains(className);
    }


    // presets (intention is to add to single, and remove on multiple)
    static setActive(element, elementsToReset = []) {
        DomUtil._addStateClass(element, elementsToReset, CLASS.active);
    }

    static setHover(element, elementsToReset = []) {
        DomUtil._addStateClass(element, elementsToReset, CLASS.hover);
    }

    static setHidden(element, elementsToReset = []) {
        DomUtil._addStateClass(element, elementsToReset, CLASS.hidden);
    }
    
    static setCollapsed(element, elementsToReset = []) {
        DomUtil._addStateClass(element, elementsToReset, CLASS.collapse);
    }
    
    static setExpanded(element, elementsToReset = []) {
        DomUtil._addStateClass(element, elementsToReset, CLASS.expand);
    }

    static setSticky(element, elementsToReset = []) {
        DomUtil._addStateClass(element, elementsToReset, CLASS.sticky);
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


    // preset helpers
    static _addStateClass(element, elementsToReset, className) {
        DomUtil._multiClassReset(element, elementsToReset, className);
        DomUtil.addClass(element, className);
    }
    
    static _removeStateClass(elementOrElements, className) {
        if (Array.isArray(elementOrElements)) {
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
}
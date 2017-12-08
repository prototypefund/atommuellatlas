const CLASS = {
    active: "active",
    hidden: "hidden",
};

export default class DomUtil {
    static addClass(element, className) {
        element.classList.add(className);
    }
    
    static removeClass(element) {
        element.classList.remove(className);
    }
    
    static hasClass(element, className) {
        return element.classList.contains(className);
    }
    
    static setActive(element, removeFromElements = []) {
        DomUtil.addClass(element, CLASS.active);
        
        DomUtil._classRemoval(removeFromElements, CLASS.active);
    }

    static setHidden(element, removeFromElements = []) {
        DomUtil.addClass(element, CLASS.hidden);

        DomUtil._classRemoval(removeFromElements, CLASS.hidden);
    }
    
    
    
    
    
    
    
    
    static _classRemoval(elements, className) {
        let i = 0;
        for (i; i < elements.length; i++) {
            DomUtil.removeClass(elements[i], className);
        }
    }
}
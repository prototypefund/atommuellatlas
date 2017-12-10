export default class EventDispatcher {
    /**
     * @param type
     * @param listener
     * @param priority Optional, default to 0. Higher priority gets executed first.
     */
    static addEventListener(type, listener, priority = 0) {
        if (!EventDispatcher._listeners) EventDispatcher._listeners = {};

        if (EventDispatcher._listeners[type] === undefined) {
            EventDispatcher._listeners[type] = [];
        }
        
        let l = {
            listener: listener,
            priority: priority
        };

        if (EventDispatcher._listeners[type].indexOf(l) === -1) {
            EventDispatcher._listeners[type].push(l);

            // sort with desc prio
            EventDispatcher._listeners[type].sort((a, b) => {
                return b.priority - a.priority;
            });
        }
    }

    static removeEventListener(type, listener) {
        if (EventDispatcher._listeners === null) return;

        let listenerArray = EventDispatcher._listeners[type];

        if (listenerArray !== undefined) {
            let index = listenerArray.indexOf(listener);
            if (index !== -1) {
                listenerArray.splice(index, 1);
            }
        }
    }

    static dispatchEvent(type, id, params = {}) {
        if (EventDispatcher._listeners === null) return;
        
        let listenerArray = EventDispatcher._listeners[type];
        if (listenerArray !== undefined) {

            for (let l of listenerArray) {
                l.listener.call(EventDispatcher, {id: id, params: params});
            }
        }
    }

    static removeAllListeners() {
        if (EventDispatcher._listeners) {
            while (EventDispatcher._listeners.length > 0) {
                EventDispatcher._listeners.pop();
            }
            EventDispatcher._listeners = null;
        }
    }
}
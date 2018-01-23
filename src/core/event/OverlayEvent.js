export default class OverlayEvent {
    static get _type() {
        if (!OverlayEvent._eventMap) {
            OverlayEvent._eventMap = {
                OPEN: "OverlayEvent.OPEN",
                CLOSE: "OverlayEvent.CLOSE"
            }
        }
        return OverlayEvent._eventMap;
    }

    static get OPEN() {
        return OverlayEvent._type.OPEN;
    }

    static get CLOSE() {
        return OverlayEvent._type.CLOSE;
    }
}
import BaseView from '/core/component/BaseView';
import EventDispatcher from '/core/event/EventDispatcher';
import OverlayEvent from '/core/event/OverlayEvent';

import style from './_baseOverlay.scss';

const CLASS_OVERLAY = "overlay-view";

export default class BaseOverlay extends BaseView {

    appendTo(target) {
        super.appendTo(target, CLASS_OVERLAY);

    }
}
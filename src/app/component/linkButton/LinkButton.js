import BaseComponent from '/core/component/BaseComponent';
import EventDispatcher from '/core/event/EventDispatcher';
import OverlayEvent from '/core/event/OverlayEvent';

import template from './template.twig';
import style from './_style.scss';

import iconLink from './../../../../static/assets/icons/question.svg';

export default class LinkButton extends BaseComponent {
    constructor(data) {
        console.log("DATA", data);
        data.icon = iconLink;
        super(template, style, data);
    }
}
import * as Log from 'loglevel';
import BaseView from '/core/component/BaseView';
import EventDispatcher from '/core/event/EventDispatcher';
import ViewEvent from '/core/event/ViewEvent';


import template from './template.twig';
import style from './_style.scss';

export default class Participation extends BaseView {
    constructor(id, data={}) {
        super(id, template, style, data);
    }
}
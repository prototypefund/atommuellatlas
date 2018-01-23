import * as Log from 'loglevel';
import BaseView from '/core/component/BaseView';
import EventDispatcher from '/core/event/EventDispatcher';
import ViewEvent from '/core/event/ViewEvent';


import template from './template.twig';
import style from './_style.scss';

import imageWell from '/../static/assets/images/kap3_1.jpg';
import imageWasteProcess from '/../static/assets/images/kap3_2.jpg';

export default class Search extends BaseView {
    constructor(id, data={}) {
        data.image = Object.assign({}, data.image, {
            well: imageWell,
            wasteProcess: imageWasteProcess
        });
        super(id, template, style, data);
    }
}
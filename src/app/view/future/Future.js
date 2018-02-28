import * as Log from 'loglevel';
import BaseView from '/core/component/BaseView';
import EventDispatcher from '/core/event/EventDispatcher';
import ViewEvent from '/core/event/ViewEvent';
import ContentModel from '/app/model/ContentModel';
import Footer from '/app/component/footer/Footer';

import iconTimeline from '../../../../static/assets/icons/AMA_timeline_squiggles.svg';

import template from './template.twig';
import style from './_style.scss';

export default class Future extends BaseView {
    constructor(id, data={}) {
        data.icon = Object.assign({}, data.icon, {
            timeline: iconTimeline
        });
        super(id, template, style, data);
    }

    postRender() {
        super.postRender();
        
        this.footer = new Footer(ContentModel.componentData.footer);
        this.footer.appendTo(this.element)
    }

    destroy() {
        super.destroy();
        
        this.footer.destroy();
    }
}
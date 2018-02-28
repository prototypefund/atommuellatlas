import * as Log from 'loglevel';
import BaseView from '/core/component/BaseView';
import EventDispatcher from '/core/event/EventDispatcher';
import ViewEvent from '/core/event/ViewEvent';
import ContentModel from '/app/model/ContentModel';
import ViewButton from '/app/component/viewButton/ViewButton';
import Footer from '/app/component/footer/Footer';

import template from './template.twig';
import style from './_style.scss';

export default class Participation extends BaseView {
    constructor(id, data={}) {
        super(id, template, style, data);
    }
    
    postRender() {
        super.postRender();

        let viewBtnWrapper = this.element.querySelector(".next-chapter");
        this.viewButton = new ViewButton(this.data.components.viewButton);
        this.viewButton.appendTo(viewBtnWrapper);
        
        this.footer = new Footer(ContentModel.componentData.footer);
        this.footer.appendTo(this.element)
    }
    
    destroy() {
        super.destroy();
        
        this.viewButton.destroy();
        this.footer.destroy();
    }
}
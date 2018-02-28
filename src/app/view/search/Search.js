import * as Log from 'loglevel';
import {TweenLite} from 'gsap';
import BaseView from '/core/component/BaseView';
import DomUtil from '/core/util/DomUtil';
import ContentModel from '/app/model/ContentModel';
import EventDispatcher from '/core/event/EventDispatcher';
import ViewEvent from '/core/event/ViewEvent';
import LayerMap from '/app/component/layerMap/LayerMap';
import StickyController from '/app/controller/StickyController';
import ViewButton from '/app/component/viewButton/ViewButton';
import Footer from '/app/component/footer/Footer';

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
    
    postRender() {
        super.postRender();

        let viewBtnWrapper = this.element.querySelector(".next-chapter");
        this.viewButton = new ViewButton(this.data.components.viewButton);
        this.viewButton.appendTo(viewBtnWrapper);
        
        this.layerMapContainer = this.element.querySelector(".map-container");
        this.layerMap = new LayerMap(ContentModel.componentData.layerMap);
        this.layerMap.appendTo(this.layerMapContainer);
        
        this.stickyController = new StickyController(this.layerMap.element);
        
        this.footer = new Footer(ContentModel.componentData.footer);
        this.footer.appendTo(this.element)
    }
    
    destroy() {
        super.destroy();
        
        this.viewButton.destroy();
        this.stickyController.destroy();
        this.layerMap.destroy();
        this.footer.destroy();
    }
}
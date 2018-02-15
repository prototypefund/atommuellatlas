import * as Log from 'loglevel';
import {TweenLite} from 'gsap';
import BaseView from '/core/component/BaseView';
import DomUtil from '/core/util/DomUtil';
import ContentModel from '/app/model/ContentModel';
import EventDispatcher from '/core/event/EventDispatcher';
import ViewEvent from '/core/event/ViewEvent';
import LayerMap from '/app/component/layerMap/LayerMap';
import StickyController from '/app/controller/StickyController';

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
        
        this.layerMapContainer = this.element.querySelector(".map-container");
        this.layerMap = new LayerMap(ContentModel.componentData.layerMap);
        this.layerMap.appendTo(this.layerMapContainer);
        
        this.stickyController = new StickyController(this.layerMap.element);
    }
    
    destroy() {
        super.destroy();
        
        this.stickyController.destroy();
        this.layerMap.destroy();
    }
}
import Tippy from 'tippy.js';
import BaseComponent from '/core/component/BaseComponent';
import EventDispatcher from '/core/event/EventDispatcher';
import OverlayEvent from '/core/event/OverlayEvent';
import DomUtil from '/core/util/DomUtil';

import template from '/app/component/layerMap/template.twig';
import style from '/app/component/layerMap/_style.scss';

import map from 'assets/icons/germany.svg';
import layerClay from 'assets/icons/layer_clay.svg';
import layerGranite from 'assets/icons/layer_granite.svg';
import layerRocksaltAll from 'assets/icons/layer_rocksalt_all.svg';
//import layerRocksalt from 'assets/icons/layer_rocksalt.svg';
//import layerRocksaltJurassic from 'assets/icons/layer_rocksalt_jurassic.svg';
//import layerRocksaltKeuper from 'assets/icons/layer_rocksalt_keuper.svg';

const CLASS_SHOW_BORDERS = "borders";
const ATTRIBUTE_OVERLAY = "data-overlay";
const VISIBLE_SCREEN_RATIO = 0.5; // 0.2 = 20% of height from top or bottom is considered a valid "in-view" trigger for markers.

export default class LayerMap extends BaseComponent {
    constructor(data = {}) {
        data.overlayAttribute = ATTRIBUTE_OVERLAY;
        data.icon = {
            map: map,
            layers: [
                layerClay, layerGranite, layerRocksaltAll
            ]
        };
        super(template, style, data);

        this._resizeHandler = this._onResize.bind(this);
        this._scrollHandler = this._onScroll.bind(this);
        this._overlayHandler = this._onClick.bind(this);
    }

    postRender() {
        super.postRender();

        window.addEventListener("resize", this._resizeHandler);
        window.addEventListener("scroll", this._scrollHandler);

        this.bg = this.element.querySelector(".layer-map-bg");

        this.layerGroups = [];
        for (let type of this.data.layers) {
            // main structure for controlling states, synced between layers and legend
            let layer = {
                group: this.element.querySelector(".area-layer." + type.id),
                areas: this.element.querySelectorAll(".area-layer." + type.id + " > *"),
                legend: this.element.querySelector(".legend-item." + type.id),
                marker: document.querySelector(".map-marker." + type.id),
                hoverHandler: event => this._onLegendHover(event, layer)
            };

            this._setTooltip(layer, type.label);
            layer.legend.addEventListener("mouseover", layer.hoverHandler);
            layer.legend.addEventListener("mouseout", layer.hoverHandler);
            layer.legend.addEventListener("click", this._overlayHandler);

            this.layerGroups.push(layer);
        }

        // fix init pos calc
        setTimeout(() => {
            this._onResize();
        }, 0);
    }

    _onClick(event) {
        let overlayID = DomUtil.getAttribute(event.target, ATTRIBUTE_OVERLAY);

        EventDispatcher.dispatchEvent(OverlayEvent.OPEN, overlayID);
    }

    _onResize() {
        this.height = window.innerHeight;
        this.offsetPadding = Math.round(this.height * VISIBLE_SCREEN_RATIO);

        this._onScroll();
    }

    _onScroll() {
        this.scrollTop = DomUtil.scrollOffset.top;

        this.triggerVisibleMarkers();
    }

    _onLayerHover(layer, isOver = true) {
        if (isOver) {
            DomUtil.setHover([layer.group, layer.group.parentElement, layer.legend]);
        } else {
            DomUtil.removeHover([layer.group, layer.group.parentElement, layer.legend]);
        }
    }

    _onLegendHover(event, layer) {
        if (event.type === "mouseover") {
            this._onLayerHover(layer, true);
        }
        else {
            this._onLayerHover(layer, false);
        }
    }

    _setTooltip(layer, label) {
        DomUtil.setAttribute(layer.areas, this.data.tippy.attribute, label);

        // popup for each shape, in each layer
        Tippy(layer.areas, Object.assign({}, this.data.tippy.options, {
            onShow: () => {
                this._onLayerHover(layer, true);
                // TODO highlight legend
            },
            onHide: () => {
                this._onLayerHover(layer, false);
                // TODO fade legend
            }
        }));
    }

    triggerVisibleMarkers() {
        for (let layer of this.layerGroups) {
            let rect = layer.marker.getBoundingClientRect();

            let hasTopPassed = rect.top < this.height - this.offsetPadding;
            let hasBottomPassed = rect.bottom < this.offsetPadding;

            if (hasTopPassed && !hasBottomPassed) {
                // set active state
                this._transitionActive(layer.group);
                this._transitionActive(layer.legend);
            }
            else if (hasBottomPassed) {
                // set inactive state
                this._transitionInactive(layer.group);
                this._transitionInactive(layer.legend);
            }
            else {
                // set initial transition state
                this._transitionInitial(layer.group);
                this._transitionInitial(layer.legend);
            }
        }
    }

    _transitionInitial(element) {
        DomUtil.removeActive(element);
        DomUtil.removeCollapsed(element);
    }

    _transitionActive(element) {
        DomUtil.setActive(element);
        DomUtil.removeCollapsed(element);
    }

    _transitionInactive(element) {
        DomUtil.setActive(element);
        DomUtil.setCollapsed(element);
    }

    set regionalBorders(bool) {
        bool ?
            DomUtil.addClass(this.bg, CLASS_SHOW_BORDERS) :
            DomUtil.removeClass(this.bg, CLASS_SHOW_BORDERS);
    }

    destroy() {
        super.destroy();

        window.removeEventListener("resize", this._resizeHandler);
        window.removeEventListener("scroll", this._scrollHandler);

        for (let layer of this.layerGroups) {
            layer.legend.removeEventListener("click", this._overlayHandler);
            layer.legend.removeEventListener("mouseover", layer.hoverHandler);
            layer.legend.removeEventListener("mouseout", layer.hoverHandler);
        }
    }
}
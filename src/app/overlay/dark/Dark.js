import BaseOverlay from '/core/component/BaseOverlay';

import template from './template.twig';
import style from './_style.scss';

export default class DarkOverlay extends BaseOverlay {
    constructor(id, data={}) {
        data.icon = Object.assign({}, data.icon, {
            // add image key/value for in-lining icons
        });
        super(id, template, style, data);
    }
}
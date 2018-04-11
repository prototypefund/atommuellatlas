import BaseOverlay from '/core/component/BaseOverlay';

import template from './template.twig';
import style from './_style.scss';

export default class AboutOverlay extends BaseOverlay {
    constructor(id, data={}) {
        data.id = id;
        super(id, template, style, data);
    }
}
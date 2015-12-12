import {customElement, bindable, inject} from 'aurelia-framework';
import {pruneOptions, fireKendoEvent} from '../common/index';
import 'jquery';
import 'kendo-ui/js/kendo.menu.min';

@customElement('au-kendo-menu')
@inject(Element)
export class Menu {

  @bindable options;
  @bindable dataSource;
  @bindable closeOnClick;
  @bindable animation;
  @bindable direction;
  @bindable hoverDelay;
  @bindable orientation;
  @bindable popupCollision;

  constructor(element) {
    this.element = element;
    this.options = {};
  }

  bind() {
    this._initialize();
  }

  recreate() {
    this._initialize();
  }

  _initialize() {
    let target;
    let ul = $(this.element).find('ul');
    if (ul.has()) {
      target = $(this.element).find('ul').first();
    } else {
      target = $(this.element).appendChild('<ul></ul>');
    }

    this.widget = target.kendoMenu(this.getOptions()).data('kendoMenu');
  }

  getOptions() {
    let options = pruneOptions({
      dataSource: this.dataSource,
      closeOnClick: this.closeOnClick,
      animation: this.animation,
      direction: this.direction,
      hoverDelay: this.hoverDelay,
      orientation: this.orientation,
      popupCollision: this.popupCollision,
      close: (e) => fireKendoEvent(this.element, 'close', e),
      open: (e) => fireKendoEvent(this.element, 'open', e),
      activate: (e) => fireKendoEvent(this.element, 'activate', e),
      deactivate: (e) => fireKendoEvent(this.element, 'deactivate', e),
      select: (e) => fireKendoEvent(this.element, 'select', e)
    });

    return Object.assign({}, this.options, options);
  }

  detached() {
    if (this.widget) {
      this.widget.destroy();
    }
  }
}
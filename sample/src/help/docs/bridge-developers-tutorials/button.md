<br>

### 4. Button
<br>

This wrapper encapsulates the KendoUI module `kendo.button.min.js`, ensuring that it behaves as a standard Aurelia component. See how the Aurelia application uses this component **[here](#/help/docs/app_developers_tutorials/4._button_component)** and **[here](#/samples/button)**.
<br>

File `button.js`
<br>
```javascript
import {customAttribute, bindable, inject} from 'aurelia-framework';
import {WidgetBase} from '../common/widget-base';
import {generateBindables} from '../common/decorators';
import 'kendo-ui/js/kendo.button.min';

@customAttribute('k-button')
@generateBindables('kendoButton')
@inject(Element, WidgetBase)
export class Button {

  @bindable options = {};

  constructor(element, widgetBase) {
    this.element = element;
    this.widgetBase = widgetBase
                        .control('kendoButton')
                        .linkViewModel(this)
                        .setDefaultBindableValues();
  }

  bind(ctx) {
    this.$parent = ctx;

    this.recreate();
  }

  recreate() {
    this.kWidget = this.widgetBase.createWidget({
      element: this.element,
      parentCtx: this.$parent
    });
  }

  detached() {
    this.widgetBase.destroy(this.kWidget);
  }
}

```

<br>
* * *
#### Next page: &nbsp;&nbsp; [Chart component](#/help/docs/bridge_developers_tutorials/5._chart_component)
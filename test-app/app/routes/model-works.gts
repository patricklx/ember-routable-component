import Route from 'ember-routable-component';
import Controller from '@ember/controller';

class MyController extends Controller<string> {
  declare x: number;
}

export default class ModelWorksRoute extends Route<MyController>(
  <template>model is {{@model}} {{@controller.x}}</template>,
) {
  model({ id }: { id: string }): string {
    return id;
  }
}

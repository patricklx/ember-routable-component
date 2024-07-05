import Route from 'ember-routable-component';
import Controller from '@ember/controller';

class MyController extends Controller {
  declare specialMessage: string;
}

export default class ComponentWorksRoute extends Route<MyController>(
  <template>hello, {{@controller.specialMessage}}</template>,
) {
  model({ id }: { id: string }): string {
    return id;
  }
}

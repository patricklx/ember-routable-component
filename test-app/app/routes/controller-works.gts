import Route from 'ember-routable-component';
import ControllerWorksController from 'test-app/controllers/controller-works';

interface Signature {
  Args: {
    controller: ControllerWorksController;
  };
}

export default class ComponentWorksRoute extends Route<Signature>(
  <template>hello, {{@controller.specialMessage}}</template>,
) {
  model({ id }: { id: string }): string {
    return id;
  }
}

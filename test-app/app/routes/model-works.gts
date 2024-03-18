import Route from 'ember-routable-component';

interface Signature {
  Args: {
    model: string;
    x: string;
  };
}
export default class ModelWorksRoute extends Route<Signature>(<template>model is {{@model}} {{@x}}</template>) {
  model({ id }: { id: string }): string {
    return id;
  }
}

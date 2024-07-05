import Route from 'ember-routable-component';

export default class ComponentWorksRoute extends Route(
  <template>hello, outlet: {{yield to='outlet'}}</template>,
) {}

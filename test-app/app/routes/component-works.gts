import Route from 'ember-routable-component';
import Component from '@glimmer/component';

interface Signature {
  Args: {
    model: string;
  };
}
class MyRouteComponent extends Component<Signature> {
  <template>{{this.backwards}} ,olleh</template>

  get backwards(): string {
    return this.args.model.split('').reverse().join('');
  }
}

export default class ComponentWorksRoute extends Route(
  MyRouteComponent
) {
  model({ id }: { id: string }): string {
    return id;
  }
}

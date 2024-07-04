import Route from '@ember/routing/route';
import Component from '@glimmer/component';
import type { TemplateOnlyComponent } from '@ember/component/template-only';
import Controller from '@ember/controller';

export interface Signature<
  T = unknown,
  C extends Controller<T> | unknown = unknown,
> {
  Args: {
    controller: C;
    model: T;
  };
  Blocks: {
    default: [];
    outlet: [];
  };
}

export default function RoutableComponentRoute<
  Model = unknown,
  C extends Controller<Model> | unknown = unknown,
>(Component: TemplateOnlyComponent<Signature<Model, C>>): typeof Route<Model>;

export default function RoutableComponentRoute<
  Model = unknown,
  C extends Controller<Model> | unknown = unknown,
>(component: Component<Signature<Model, C>>): typeof Route<Model>;

export default function RoutableComponentRoute(
  component: typeof Component<any>,
): typeof Route<any>;

export default function RoutableComponentRoute(Component: any) {
  return class Rout extends Route {
    init() {
      this.templateName = 'ember-routable-component/ember-route-template';
    }

    setupController(
      controller: Controller,
      context: unknown | undefined,
      _transition?: any,
    ) {
      super.setupController(controller, context, _transition);
      (controller as any).Component = Component;
    }
  };
}

type GetModel<T> = T extends Controller<infer Model> ? Model : T;
type GetController<T> = T extends Controller ? T : Controller<T>;


export class RoutableComponent<T = unknown> extends Component<
  Signature<GetModel<T>, GetController<T>>
> {}

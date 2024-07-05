import Route from '@ember/routing/route';
import Component from '@glimmer/component';
import type { TemplateOnlyComponent } from '@ember/component/template-only';
import type Controller from '@ember/controller';

export interface Signature<
  T = unknown,
  C extends Controller<T> | unknown = Controller<T>,
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

type GetModel<T> = T extends Controller<infer Model> ? Model : T;
type GetController<T> = T extends Controller ? T : Controller<T>;

type GetSignature<T> = Signature<GetModel<T>, GetController<T>>;

export default function RoutableComponentRoute<T>(
  Component: TemplateOnlyComponent<GetSignature<T>>,
): typeof Route<GetModel<T>>;

export default function RoutableComponentRoute<T>(
  component: typeof Component<GetSignature<T>>,
): typeof Route<GetModel<T>>;

export default function RoutableComponentRoute(
  component: typeof Component<any>,
): typeof Route<any>;

export default function RoutableComponentRoute(
  component: TemplateOnlyComponent<any>,
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

export class RoutableComponent<T = unknown> extends Component<
  GetSignature<T>
> {}

export type RTOC<T> = TemplateOnlyComponent<GetSignature<T>>;

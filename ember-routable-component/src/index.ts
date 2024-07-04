import Route from '@ember/routing/route';
import Component from '@glimmer/component';
import type { TemplateOnlyComponent } from '@ember/component/template-only';
import Controller from '@ember/controller';

export interface Signature<
  T,
  Controller extends typeof Controller<T> | unknown,
> {
  Args: {
    controller: Controller;
    model: T;
  };
  Blocks: {
    default: [];
    outlet: [];
  };
}

export default function RoutableComponentRoute<
  Model = unknown,
  Controller extends typeof Controller<Model> = typeof Controller<Model>,
>(
  Component: TemplateOnlyComponent<Signature<Model, Controller>>,
): typeof Route<Model>;

export default function RoutableComponentRoute<
  Model = unknown,
  Controller extends typeof Controller<Model> = typeof Controller<Model>,
>(Component: Component<Signature<Model, Controller>>): typeof Route<Model>;

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

export class RoutableComponent<
  T = unknown,
  C extends typeof Controller<T> | unknown = unknown,
> extends Component<Signature<T, C>> {}

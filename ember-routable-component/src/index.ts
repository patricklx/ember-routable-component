import Route from '@ember/routing/route';
import type { TemplateOnlyComponent } from '@ember/component/template-only';
import Controller from '@ember/controller';
export default function RoutableComponentRoute<
  T,
  Model = unknown
>(Component: TemplateOnlyComponent<T>): typeof Route<Model>;
export default function RoutableComponentRoute<
  Model = unknown
>(Component: object): typeof Route<Model>;
export default function RoutableComponentRoute(Component: object) {
  return class extends Route {
    init() {
      this.templateName = 'ember-routable-component/ember-route-template';
    }

    setupController(controller: Controller, context: unknown | undefined, _transition?: any) {
      super.setupController(controller, context, _transition);
      (controller as any).Component = Component;
    }
  };
}

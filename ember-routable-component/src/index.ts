import Route from '@ember/routing/route';
import type { TemplateOnlyComponent } from '@ember/component/template-only';
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

    setupController(controller: Controller, context: unknown | undefined, _transition?) {
      super.setupController(controller, context, _transition);
      controller.Component = Component;
    }
  };
}

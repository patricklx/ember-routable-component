# ember-routable-component

this is based on https://github.com/discourse/ember-route-template
but instead of creating template gts filed we use route.gts files directly.

[polaris]: https://blog.emberjs.com/ember-5-0-released/#toc_the-journey-towards-ember-polaris
[resources]: https://github.com/NullVoxPopuli/ember-resources/blob/main/docs/docs/README.md
[rfc]: https://rfcs.emberjs.com/id/0779-first-class-component-templates/#typescript

Provides an adapter for using [`<template>` tags] and components in route files

## Usage

```gjs
// app/routes/my-route.gjs
import RoutableComponentRoute from 'ember-routable-component';

// this will generate a Route class and use the provided template
export default RoutableComponentRoute(<template>Hello world!</template>);
```

Your `<template>` will have access to the `{{@model}}` and `{{@controller}}`
arguments, if you need them. Other features like plain function helpers and
the ability to import components (etc) into the `<template>` scope works as
usual:

```gjs
// app/routes/my-route.gjs
import RoutableComponentRoute from "ember-routable-component";

// components can be imported as usual
import Hello from "my-app/components/hello";

// plain functions work, as usual
function stringify(value) {
  if (typeof value?.name === 'string') {
    return value.name;
  } else {
    return String(value);
  }
}

// This adapter converts the `<template>` into a route template
export default RoutableComponentRoute(
  <template>
    The model is: {{stringify @model}}
    The controller is: {{stringify @controller}}
    <Hello @message="this is great!" />
  </template>
);
```

You can even convert components into route templates with this adapter (a.k.a.
"routable components"):

```gjs
// app/routes/my-route.gjs
import RoutableComponentRoute from 'ember-routable-component';
import Component from "@glimmer/component";

class MyRouteComponent extends Component {
  <template>Hello, {{this.message}}. Why was I screaming?</template>

  get message() {
    return String(this.args.model).toUpperCase();
  }
}

export default RoutableComponentRoute(MyRouteComponent);
```

You can also use outlets like this:

```gjs
// app/routes/my-route.gjs
import RoutableComponentRoute from 'ember-routable-component';
import Component from "@glimmer/component";

class MyRouteComponent extends Component {
  <template>Hello, {{this.message}}. Why was I screaming? {{yield to='outlet'}}</template>

  get message() {
    return String(this.args.model).toUpperCase();
  }
}

export default RoutableComponentRoute(MyRouteComponent);
```

## How it works

[Under the hood](./ember-routable-component/src/index.ts), the adapter generates
a route that simply invokes the `<template>` or component you passed
in with the `@model` and `@controller` arguments appropriately set.

The hello world example from above is similar to first creating the component
in the usual global location in `app/components`:

```gjs
// app/components/hello-world.gjs
<template>Hello world!</template>
```

Then create a route template whose only job is to invoke that component:

```hbs
{{! app/templates/my-route.hbs }}
<HelloWorld @model={{@model}} @controller={{this}} />
```

With the adapter from this addon, the main advantage is that it allows you to
keep your route `<template>` or component anonymous, without making it globally
available in `app/components` since it likely would not make sense to reuse a
route specific `<template>` or component elsewhere in the app.

Of course, nothing is stopping you from exporting those values as additional
named exports, if you need to access them from elsewhere.

## TypeScript and Glint

TypeScript and Glint is fully supported, just use the `.gts` extension instead.

```gts
// app/templates/my-route.gts
import RoutableComponentRoute from "ember-routable-component";

class MyController extends Controller<string> {
  declare x: number;
}

export default class ModelWorksRoute extends Route<MyController>(
  <template>model is {{@model}} {{@controller.x}}</template>,
) {
  model({ id }: { id: string }): string {
    return id;
  }
}
```

For Class-based components you can use the RoutableComponent:

```gts
// app/templates/my-route.gts
import RoutableComponentRoute, { RoutableComponent } from "ember-routable-component";
import Component from "@glimmer/component";

class MyController extends Controller<string> {
}


class MyRouteComponent extends RoutableComponent<MyController> {
  <template>
    Glint knows this is a string: {{@model}}
  </template>
}

export default RoutableComponentRoute(MyRouteComponent);
```

It can also be used without any type
```gts
// app/templates/my-route.gts
import RoutableComponentRoute, { RoutableComponent } from "ember-routable-component";
import Component from "@glimmer/component";


class MyRouteComponent extends RoutableComponent {
  <template>
    Glint knows this is a string: {{@model}} <-- is of type any
  </template>
}

export default RoutableComponentRoute(MyRouteComponent);
```

If you need custom functionality in routes:

```gts
// app/templates/my-route.gts
import RoutableComponentRoute from "ember-routable-component";
import Component from "@glimmer/component";

interface MyRouteSignature {
  Args: {
    model: string;
  }
}

class MyRouteComponent extends Component<MyRouteSignature> {
  <template>
    Glint knows this is a string: {{@model}}
  </template>
}

export default class extends RoutableComponentRoute(MyRouteComponent) {
  myfunc() {
  }
}
```


## Compatibility

- Ember.js v3.28 or above
- Embroider or ember-auto-import v2

## Installation

```
ember install ember-routable-component
```

## Contributing

See the [Contributing](CONTRIBUTING.md) guide for details.

## License

This project is licensed under the [MIT License](LICENSE.md).

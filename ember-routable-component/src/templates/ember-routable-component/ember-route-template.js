import { precompileTemplate } from '@ember/template-compilation';

export default precompileTemplate("<this.Component @model={{this.model}} @controller={{this}}><:outlet>{{outlet}}</:outlet></this.Component>");
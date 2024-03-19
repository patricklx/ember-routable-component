import { precompileTemplate } from '@ember/template-compilation';
export default precompileTemplate(`<this.Component @model={{this.model}} @controller={{this}}>
    <:outlet>{{outlet}}</:outlet>
    <:named-outlet as |name|>{{outlet name}}</:named-outlet>
</this.Component>`);

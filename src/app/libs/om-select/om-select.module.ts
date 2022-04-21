import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SelectComponent} from './components/select/select.component';
import {SelectItemComponent} from './components/select-item/select-item.component';
import {PortalModule} from "@angular/cdk/portal";
import {OverlayModule} from '@angular/cdk/overlay';

const components = [SelectComponent,
  SelectItemComponent];

@NgModule({
  declarations: [
    ...components
  ],
  imports: [
    CommonModule,
    PortalModule,
    OverlayModule,
  ],
  exports: [...components]
})
export class OmSelectModule {
}

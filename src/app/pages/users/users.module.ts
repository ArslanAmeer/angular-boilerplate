import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateDirective, TranslatePipe } from '@ngx-translate/core';

import { UsersRoutingModule } from './users-routing.module';
import { ListComponent } from './list/list.component';

@NgModule({
  declarations: [ListComponent],
  imports: [CommonModule, UsersRoutingModule, TranslateDirective, TranslatePipe],
})
export class UsersModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';

import { AuthModule } from '@app/auth';
import { ShellComponent } from './shell.component';
import { HumanizePipe } from '@shared/pipes';
import { FormsModule } from '@angular/forms';
import { SidebarComponent } from '@app/shell/components/sidebar/sidebar.component';
import { HeaderComponent } from '@app/shell/components/header/header.component';
import { PagesModule } from '@pages/pages.module';
import { LanguageSelectorComponent } from '@app/i18n';

@NgModule({
  imports: [CommonModule, TranslateModule, AuthModule, RouterModule, HumanizePipe, FormsModule, PagesModule, LanguageSelectorComponent],
  declarations: [ShellComponent, HeaderComponent, SidebarComponent],
})
export class ShellModule {}

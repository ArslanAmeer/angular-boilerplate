import { Component, ChangeDetectionStrategy } from '@angular/core';
import { TranslateDirective } from '@ngx-translate/core';

@Component({
  selector: 'app-dashboard',
  imports: [TranslateDirective],
  templateUrl: './dashboard.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {}

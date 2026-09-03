import { Component, inject, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { UseRandomUser } from '@core/usecases';
import { RandomUserEntity } from '@core/entities';
import { HotToastService } from '@ngxpert/hot-toast';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
  changeDetection: ChangeDetectionStrategy.Eager,
  standalone: false,
})
export class ListComponent implements OnInit {
  users: RandomUserEntity[] = [];
  isLoading = true;

  private readonly _useRandomUser = new UseRandomUser();
  private readonly _toast = inject(HotToastService);
  private readonly _translateService = inject(TranslateService);

  ngOnInit() {
    this._useRandomUser.getAllUsers().subscribe({
      next: (users) => {
        this.users = users;
        this.isLoading = false;
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  userClicked() {
    this._toast.show(this._translateService.instant('User clicked'));
  }
}

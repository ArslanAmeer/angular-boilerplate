import { Component, inject, OnInit } from '@angular/core';
import { UseRandomUser } from '@core/usecases';
import { RandomUserEntity } from '@core/entities';
import { HotToastService } from '@ngxpert/hot-toast';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
  standalone: false,
})
export class ListComponent implements OnInit {
  users: RandomUserEntity[] = [];
  isLoading = true;

  private readonly _useRandomUser = new UseRandomUser();
  private readonly _toast = inject(HotToastService);

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
    this._toast.show('User clicked');
  }
}

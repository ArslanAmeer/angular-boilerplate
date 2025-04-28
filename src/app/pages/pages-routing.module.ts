import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Shell } from '@app/shell/services/shell.service';
import { DiscoverComponent } from '@app/pages/discover/discover.component';
import { ChallengesComponent } from '@app/pages/challenges/challenges.component';

const routes: Routes = [
  Shell.childRoutes([
    {
      path: '',
      redirectTo: 'discover',
      pathMatch: 'full',
    },
    {
      path: 'discover',
      component: DiscoverComponent,
    },
    {
      path: 'challenges',
      component: ChallengesComponent,
    },

    // Fallback when no prior route is matched
    { path: '**', redirectTo: '', pathMatch: 'full' },
  ]),
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}

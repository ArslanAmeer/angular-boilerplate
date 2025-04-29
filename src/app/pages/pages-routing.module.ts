import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Shell } from '@app/shell/services/shell.service';

const routes: Routes = [
  Shell.childRoutes([
    {
      path: '',
      redirectTo: 'discover',
      pathMatch: 'full',
    },
    {
      path: 'discover',
      loadComponent: () => import('@app/pages/discover/discover.component').then((c) => c.DiscoverComponent),
    },
    {
      path: 'challenges',
      loadComponent: () => import('@app/pages/challenges/challenges.component').then((c) => c.ChallengesComponent),
    },
    {
      path: 'programs',
      loadComponent: () => import('@app/pages/programs/programs.component').then((c) => c.ProgramsComponent),
    },
    {
      path: 'tutorials',
      loadComponent: () => import('@app/pages/tutorials/tutorials.component').then((c) => c.TutorialsComponent),
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

import { NgModule, inject } from '@angular/core';
import {
  Route,
  Router,
  RouterModule,
  Routes,
  UrlSegment,
} from '@angular/router';
import { AccueilComponent } from './pages/accueil/accueil.component';
import { AuthGuard } from './guards/auth.guard';
import { AuthService } from './services/auth.service';
import { ConnexionComponent } from './pages/connexion/connexion.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
const routes: Routes = [
  {
    path: 'accueil',
    component: AccueilComponent,
  },
  {
    path: 'connexion',
    component: ConnexionComponent,
  },
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./pages/dashboard/dashboard.module').then(
        (m) => m.DashboadModule
      ),
    canLoad: [AuthGuard],
  },
  {
    path: 'dashboard-can-match-return-urltree',
    loadChildren: () =>
      import('./pages/dashboard/dashboard.module').then(
        (m) => m.DashboadModule
      ),
    canMatch: [
      () => {
        const router: Router = inject(Router);
        return inject(AuthService).isLoggedIn()
          ? true
          : router.createUrlTree(['connexion']);
      },
    ],
  },

  {
    path: 'dashboard-can-match-return-false',
    loadChildren: () =>
      import('./pages/dashboard/dashboard.module').then(
        (m) => m.DashboadModule
      ),
    canMatch: [
      () => {
        return inject(AuthService).isLoggedIn() ? true : false;
      },
    ],
  },
  {
    path: '',
    redirectTo: 'accueil',
    pathMatch: 'full',
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RouteConstants } from './constants/routes.constants';
import { HomePageComponent } from './components/home-page/home-page.component';

const defaultPath=RouteConstants.default;
const routes: Routes = [{ path: '', redirectTo: defaultPath, pathMatch: 'full' },
  { path: 'Home', component: HomePageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    { path: 'home', loadChildren: () => import('src/app/home/home.module').then(m => m.HomeModule) },
    { path: 'products', loadChildren: () => import('src/app/product/product.module').then(m => m.ProductModule) },
    
    { path: '', redirectTo: 'home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

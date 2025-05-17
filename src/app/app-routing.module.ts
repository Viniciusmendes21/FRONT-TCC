import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CorrecaoComponent } from './correcao/correcao.component';

const routes: Routes = [
  { path: 'correcao', component: CorrecaoComponent },
  { path: '', redirectTo: 'correcao', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManageDeliveryComponent } from './manage-delivery.component';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/modules/shared.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptorService } from 'src/app/core/interceptors/auth-interceptor.service';

const routes: Routes = [{ path: '', component: ManageDeliveryComponent }];

@NgModule({
  declarations: [ManageDeliveryComponent],
  imports: [CommonModule, SharedModule, RouterModule.forChild(routes)],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true,
    },
  ],
})
export class ProductsModule {}

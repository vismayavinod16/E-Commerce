import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { CartpageComponent } from './cartpage/cartpage.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { HomeComponent } from './home/home.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { SearchComponent } from './search/search.component';
import { SellerAddProductComponent } from './seller-add-product/seller-add-product.component';
import { SellerHomeComponent } from './seller-home/seller-home.component';
import { SellerUpdateproductComponent } from './seller-updateproduct/seller-updateproduct.component';
import { SellerComponent } from './seller/seller.component';
import { UserAuthComponent } from './user-auth/user-auth.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'seller', component: SellerComponent },
  {path:'seller-home',component:SellerHomeComponent,canActivate:[AuthGuard]},
  {path:'seller-add-product',component:SellerAddProductComponent,canActivate:[AuthGuard]},
  {path:'seller-updateproduct/:id', component:SellerUpdateproductComponent,canActivate:[AuthGuard]},
  {path:'search/:query',component:SearchComponent},
  {path:'details/:productId',component:ProductDetailsComponent},
  {path:'user-auth',component:UserAuthComponent},
  {path:'cartpage',component:CartpageComponent},
  {path:'checkout',component:CheckoutComponent},
  {path:'my-orders',component:MyOrdersComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

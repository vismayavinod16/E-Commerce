import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { product } from '../data.type';
import { ProductService } from '../service/product.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
    menuType: String = 'default';
    sellerName: string = '';
    sellerData:string=''
    searchResults: undefined | product[];
    userName: string = '';
    cartItems=0;
    constructor(private route: Router, private product: ProductService) { }
  
    ngOnInit(): void {
      this.route.events.subscribe((val: any) => {
        if (val.url ) {
          if (localStorage.getItem('seller') && val.url.includes('seller')) {
            let sellerStore = localStorage.getItem('seller');
           this.sellerData = sellerStore && JSON.parse(sellerStore)[0];
            this.sellerName =this.sellerData;
            this.menuType = 'seller';
          }
          else if (localStorage.getItem('user')) {
            let userStore = localStorage.getItem('user');
            let userData = userStore && JSON.parse(userStore);
            this.userName = userData.name;
            this.menuType = 'user';
            this.product.getCartList(userData.id)
          }
          else {
            this.menuType = 'default';
          }
        }
      });
    
  
  
    let cartData=localStorage.getItem('localCart')
    if (cartData) {
      this.cartItems=JSON.parse(cartData).length
    }
this.product.cartData.subscribe((items)=>{
  this.cartItems=items.length
})
}
  logout() {
    localStorage.removeItem('seller')
    this.route.navigateByUrl('/')
  }
  userLogout(){
    localStorage.removeItem('user')
    this.route.navigateByUrl('user-auth')
    this.product.cartData.emit([])

  }
  searchProducts(query: KeyboardEvent) {
    if (query) {
      const element = query.target as HTMLInputElement
      this.product.searchProducts(element.value).subscribe((result) => {
        if (result.length > 5) {
          result.length = length
        }
        this.searchResults = result

      })
    }
  }
  hideSearch() {
    this.searchResults = undefined

  }
  redirectToDetails(id: number) {
    this.route.navigateByUrl('details/' + id)

  }
  submitSearch(val: string) {
    this.route.navigateByUrl(`search/${val}`)

  }
}


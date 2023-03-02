import { Component } from '@angular/core';
import { cart, login, product, signup } from '../data.type';
import { ProductService } from '../service/product.service';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-user-auth',
  templateUrl: './user-auth.component.html',
  styleUrls: ['./user-auth.component.css']
})
export class UserAuthComponent {
  showLogin: boolean = true
  authError: string = "";
  constructor(private user: UserService, private product: ProductService) { }

  ngOnInit(): void {
    this.user.userAuthReload();
  }

  signUp(data: signup) {
    this.user.userSignUp(data);
  }
  login(data: login) {
    this.user.userLogin(data)
    this.user.invalidUserAuth.subscribe((result) => {
      console.log("lamb", result);
      if (result) {
        this.authError = "please enter Valid UserDetails"
      } else {
        this.localCartToRemoteCart()
      }
    })

  }
  openSignUp() {
    this.showLogin = false
  }
  openLogin() {
    this.showLogin = true;
  }
  localCartToRemoteCart() {
    let data = localStorage.getItem('localCart')
    let user = localStorage.getItem('user')
    let userId = user && JSON.parse(user).id;

    if (data) {
      let cartDataList: product[] = JSON.parse(data)
      cartDataList.forEach((product: product,index) => {
        let cartData: cart = {
          ...product,
          productId: product.id,
          userId
        };
        delete cartData.id;
    setTimeout(()=>{
      this.product.addtoCart(cartData).subscribe((result)=>{
        if(result){
        console.log("item storeed in db");
        }
                }) 
                if(cartDataList.length===index+1){
                  localStorage.removeItem('localCart')
                } 
    },500)
      });
    }
    setTimeout(()=>{
      this.product.getCartList(userId)
    },200)
  }
}

import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { product } from '../data.type';
import { ProductService } from '../service/product.service';

@Component({
  selector: 'app-seller-updateproduct',
  templateUrl: './seller-updateproduct.component.html',
  styleUrls: ['./seller-updateproduct.component.css']
})
export class SellerUpdateproductComponent {
  productData: undefined | product;
  productMessage: undefined | string;
  constructor(private route: ActivatedRoute, private product: ProductService) {}

  ngOnInit(): void {
    let productId = this.route.snapshot.paramMap.get('id');
    console.warn(productId);
    productId &&
      this.product.getProduct(productId).subscribe((data) => {
        console.log(data);
        
        this.productData = data;
      });
  }
  submit(data: any) {
    if (this.productData) {
      data.id = this.productData.id;
    }
    this.product.updateProduct(data).subscribe((result) => {
      if (result) {
        this.productMessage = 'Product has updated';
      }
    });
    setTimeout(() => {
      this.productMessage = undefined;
    }, 3000);
    console.warn(data);
  }
}

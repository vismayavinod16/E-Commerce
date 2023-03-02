import { Component } from '@angular/core';
import { order } from '../data.type';
import { ProductService } from '../service/product.service';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent {
  orderData: order[] | undefined;
  constructor(private product: ProductService) { }

  ngOnInit(): void {
    this.getOrderList();
  }
  cancelOrder(orderId: number | undefined) {
    orderId && this.product.cancelOrder(orderId).subscribe((result)=>{
      
    })
  }
  getOrderList(){
    this.product.orderList().subscribe((result) => {
      this.orderData = result
    })
  }
}

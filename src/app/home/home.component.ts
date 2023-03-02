import { Component } from '@angular/core';
import { product } from '../data.type';
import { ProductService } from '../service/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  popularProducts: undefined | product[]
  productlist: any
  filterproducts: any
  searchkey: any


  constructor(private product:ProductService){}
  ngOnInit(): void {
    this.product.popularProducts().subscribe((data)=>{
      this.popularProducts=data;
    })
  
    this.product.viewAllProducts().subscribe((data: any) => {
      // console.log(data);
      this.product= data
    })
    //access data from behaviour subject
    this.product.search.subscribe((data: any) => {
      this.searchkey = data
    })
  }
  filter(category: any) {
    this.filterproducts = this.productlist.filter((item: any) => {
      if (item.category == category || category == '') {
        return item
      }
    })

  }

  }

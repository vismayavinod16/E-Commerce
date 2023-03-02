import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { product } from '../data.type';
import { ProductService } from '../service/product.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {
  searchResult:undefined|product[];
constructor(private activeroute:ActivatedRoute,private product:ProductService){}
ngOnInit():void{
  let query=this.activeroute.snapshot.paramMap.get('query')
  console.log(query);
  query&& this.product.searchProducts(query).subscribe((result)=>{
this.searchResult=result
  })
}
}

import { Component } from '@angular/core';
import { Product } from './Product';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'WS5';

  products: Array<Product> = [];

  constructor() {
    this.fetchData();
  }

  async fetchData() {
    fetch('https://dummyjson.com/products')
      .then(res => res.json())
      .then(objects => {
        objects.products.map((x: any) => {
          let t = new Product();
          t.id = x.id;
          t.title = x.title;
          t.description = x.description;
          t.price = x.price;
          t.discountPercentage = x.discountPercentage;
          t.rating = x.rating;
          t.stock = x.stock;
          t.brand = x.brand;
          t.category = x.category;
          t.thumbnail = x.thumbnail;
          t.images = x.images;
  
          this.products.push(t);
        });
        console.log(this.products);
      });
  }
}

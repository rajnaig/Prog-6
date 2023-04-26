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
  
  currentProduct : Product = new Product();

  constructor() {
    this.fetchData();
  }

  counter(){
    return this.products.length;
  }

  rowColor(stock: number): string {
    if (stock > 0 && stock <= 50) {
      return 'table-danger'; // alacsony készlet --> piros
    } else if (stock > 50 && stock <= 100) {
      return 'table-warning'; // közepes készlet --> sárga
    } else if (stock > 100) {
      return 'table-success'; // nagy készlet --> zöld
    } else {
      return ''; // default value, no specific class
    }
  }
  deleteProduct(id: number) {
    fetch(`https://dummyjson.com/products/${id}`, {
      method: 'DELETE',
    })
      .then((res) => res.json())
      .then(console.log);

      this.products = this.products.filter(x=>x.id!== id);
  }

  moreButtonSelect(product : Product) {
    this.currentProduct = product;
    console.log(this.currentProduct)
  }

  updateProduct(): void {
    fetch(`https://dummyjson.com/products/${this.currentProduct.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(this.currentProduct)
    })
    .then(res => res.json())
    .then(updatedProduct => {
      console.log('Updated product:', updatedProduct);

      const index = this.products.findIndex(
        product => product.id === updatedProduct.id
      );

      if (index !== -1) {
        this.products[index] = updatedProduct;
      }
    });
  }

  countBrands() {
    const brandCounts: {[brand: string]: number} = {};
  
    this.products.forEach(product => {
      if (brandCounts[product.brand]) {
        brandCounts[product.brand]++;
      } else {
        brandCounts[product.brand] = 1;
      }
    });
  
    let result = 'Brand Counts:\n';
    for (const brand in brandCounts) {
      if (brandCounts.hasOwnProperty(brand)) {
        result += `${brand}: ${brandCounts[brand]}\n`;
      }
    }
    alert(result);
  }
  

  avgRatings() {
    const sumRatings = this.products.reduce((sum, product) => sum + product.rating, 0);
    const averageRating = sumRatings / this.products.length;
  
    alert(`Average rating: ${averageRating}`);
  }
  
  stockLevel() {
    const avgStock = this.products.reduce((sum, product) => sum + product.stock, 0) / this.products.length;
    const belowAvgStock = this.products.filter(product => product.stock < avgStock)
      .map(product => `ID: ${product.id}, Title: ${product.title}`);
  
    alert(`Products below average stock level:\n${belowAvgStock.join('\n')}`);
  }
  
  


  async fetchData() {
    fetch('https://dummyjson.com/products')
      .then((res) => res.json())
      .then((objects) => {
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

import { Component } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { Product, Products } from '../../types';
import { ProductComponent } from '../components/product/product.component';
import { CommonModule } from '@angular/common';
import { PaginatorModule } from 'primeng/paginator';
import { ButtonModule } from 'primeng/button';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    ProductComponent,
    PaginatorModule,
    ButtonModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  constructor(private productsService: ProductsService) {}

  products: Product[] = [];

  // Pagination
  totalRecords: number = 0;
  rows: number = 12;


  onPageChange(event: any) {
    this.fetchProducts(event.page, event.rows);
  }


  // Fetch products from the server and implement pagination
  fetchProducts(page: number, perPage: number) {
    this.productsService
      .getProducts('http://localhost:3000/clothes', { page, perPage })
      .subscribe({
        next: (data: Products) => {
          this.products = data.items;
          this.totalRecords = data.total;
        },
        error: (error) => {
          console.log(error);
        },
      });
  }


  ngOnInit() {
    this.fetchProducts(0, this.rows);
  }
}

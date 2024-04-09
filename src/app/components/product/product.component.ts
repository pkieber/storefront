import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild
} from '@angular/core';
import { Product } from '../../../types';
import { RatingModule } from 'primeng/rating';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { ConfirmationService } from 'primeng/api';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [
    RatingModule,
    ButtonModule,
    FormsModule,
    ConfirmPopupModule,
    ToastModule,
  ],
  providers: [
    ConfirmationService
  ],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent {
  constructor(private confirmationService: ConfirmationService) {}

  @ViewChild('deleteButton') deleteButton: any;
  @Input() product!: Product; // Input product to be displayed
  @Output() edit: EventEmitter<Product> = new EventEmitter<Product>(); // Emits the product to be edited
  @Output() delete: EventEmitter<Product> = new EventEmitter<Product>(); // Emits the product to be deleted


  editProduct() {
    this.edit.emit(this.product);
  }


  confirmDelete() {
    this.confirmationService.confirm({
      target: this.deleteButton.nativeElement,
      message: 'Are you sure that you want to delete this product?',
      accept: () => {
        this.deleteProduct();
      },
    });
  }


  deleteProduct() {
    this.delete.emit(this.product);
  }

}

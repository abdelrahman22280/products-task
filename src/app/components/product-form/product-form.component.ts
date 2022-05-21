import { Component, OnInit } from '@angular/core';
import { Product, ProductCategory, ProductType } from 'src/app/common/models/product.model';
import {ConfirmationService} from 'primeng/api';
import {MessageService} from 'primeng/api';
import { FormControl, FormGroup, RequiredValidator, Validators } from '@angular/forms';


@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.sass'],
  providers: [ConfirmationService , MessageService]
})
export class ProductFormComponent implements OnInit {

  showProductForm = false;
  inUpdateMode = false;
  public selectedProduct : Product | undefined ;
  public selectedProductIndex : number | undefined;
  public products : Array<Product> = [
    {
      name:"Product 1",
      id: 1,
      type: ProductType.Type1,
      category: ProductCategory.Category1,
      isSubCategory : true,
      referenceID: 1,
      password: "Passw0rd",
      deliveryFees: 1.8,
      deliveryFeesPrecentage: 1.5,
    
    }
  ];
  productForm = new FormGroup({
    name: new FormControl('' , [Validators.required] ),
    type: new FormControl('' , [Validators.required] ),
    category: new FormControl('' , [Validators.required] ),
    isSubCategory: new FormControl(false),
    referenceID: new FormControl('' , [Validators.min(0)]),
    password: new FormControl('' , [Validators.required] ),
    deliveryFees: new FormControl('' , [Validators.required,Validators.min(0)] ),
    deliveryFeesPrecentage: new FormControl('' , [Validators.required,Validators.min(0)] )
  });

  constructor(private confirmationService: ConfirmationService, private messageService: MessageService) { }

  ngOnInit(): void {
  }
  
  // Note: to add new product.
  addNewProduct(){
    this.reset();
    this.showProductForm = true;
  }
  
  // Note: to edit a product.
  onSelectProduct(){
    this.showProductForm = true;
    this.inUpdateMode = true;
    this.fillProductFields(this.selectedProduct as Product);
  }

  // Note: to save a new product.
  onSubmit() {
    this.confirmationService.confirm({
        message: 'Are you sure you want to save changes made?',
        header: 'Save changes?',
        key: 'confirmDialog',
        icon: 'pi pi-info-circle',
        accept: () => {
          if(!this.inUpdateMode){
            this.products.push(
              {...this.productForm.value , id: new Date().getTime()}
            )
            this.messageService.add({contentStyleClass: 'bg-white', summary:'Product added successfully'});
          }else{
            const updatedProductIndex = this.products.findIndex((product)=> product.id == this.selectedProduct?.id)
            this.products[updatedProductIndex] = this.productForm.value;
            this.messageService.add({contentStyleClass: 'bg-white', summary:'Product updated successfully'});
          }
          this.reset();
        },
        reject: () => {
        }
    });
  }
  
  // Note: to delete an old product.
  onDelete() {
    this.confirmationService.confirm({
        message: `Are you sure you want to delete product? Once deleted, you won't be able to access it again.Save changes?`,
        header: `Delete "${this.selectedProduct?.name}"?`,
        icon: 'pi pi-exclamation-triangle',
        key: 'deleteDialog',
        accept: () => {
          this.products = this.products.filter(
            (product)=>{return this.selectedProduct?.id != product.id}
          )
          this.messageService.add({severity:'success',contentStyleClass: 'bg-white', summary:'Product deleted successfully'});
          this.reset();
        },
        reject: () => {
        }
    });
  }
  
  // Note: to autofill form inputs with selected product data.
  private fillProductFields(product: Partial<Product>): void {
    this.productForm.patchValue({
      name: product.name,
      type: product.type,
      category: product.category,
      isSubCategory : product.isSubCategory,
      referenceID: product.referenceID,
      password: product.password,
      deliveryFees: product.deliveryFees,
      deliveryFeesPrecentage: product.deliveryFeesPrecentage,
    });
  }

  // Note: to reset settings.
  public reset(){
    this.showProductForm = false;
    this.inUpdateMode = false;
    this.selectedProduct = undefined;
    this.productForm.reset()
  }


}


import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/auth/auth.service';
import { Status } from 'src/app/core/enums/status.enum';
import { AppUser } from 'src/app/core/models/app-user.model';
import { Customer } from 'src/app/core/models/customer';
import { ProductDetail } from 'src/app/core/models/product-detail-delivery';
import { Delivery } from '../../core/models/delivery';
import { CustomerService } from '../../core/services/customer.service';
import { ProductsService } from 'src/app/core/services/products.service';
import { DeliveryService } from '../../core/services/delivery.service';
import { Product } from 'src/app/core/models/product';

@Component({
  selector: 'app-manage-delivery',
  templateUrl: './manage-delivery.component.html',
  styleUrls: ['./manage-delivery.component.scss'],
})
export class ManageDeliveryComponent implements OnInit, OnDestroy {
  constructor(
    private authService: AuthService,
    private customerService: CustomerService,
    private productsService: ProductsService,
    private deliveryService: DeliveryService
  ) {}
  // status: St[];
  editMode: boolean = false; //fall=add, true=updat
  user: AppUser;
  deliveryForm: FormGroup;
  status: Status;
  customers: Customer[] = [];
  productsList: Product[] = [];
  delivery?: Delivery;

  // products= new FormControl('')


  ngOnInit(): void {
    this.productsService.products$.subscribe((products) => {
      this.productsList = products;
    });

    this.customerService.customers$.subscribe((customers) => {
      this.customers = customers;
    });

    this.authService.userChain.subscribe(user=>{
      this.user=user;
    });
    this.getArrays();
    setTimeout(()=>{console.log(this.productsList)},2000);
    this.initForm();
  }

  getArrays() {
    if (this.productsList.length == 0)
      this.productsService.getProducts().subscribe();

    if (this.customers.length == 0)
      this.customerService.getCustomers().subscribe();

  }

  initForm() {
    // let producuts=
    this.deliveryForm = new FormGroup({
      customer: new FormControl(
        this.delivery ? this.delivery.customer.name : '',
        [Validators.required]
      ),
      deliveryPerson: new FormControl(
        this.delivery ? this.delivery.deliveryPerson.name : '',
        [Validators.required]
      ),
      status: new FormControl(this.delivery ? this.delivery.status : '', [
        Validators.required,
      ]),
      manager: new FormControl(this.delivery ? this.delivery.manager.name : '', [
        Validators.required,
      ]),
      // products: new FormArray([]),
      products: new FormControl(''),
    });

    //const arrayValuesControl = this.deliveryForm.get('products') as FormArray;

    //arrayValuesControl.forEach((control) => arrayValuesControl.push(control));
    // console.log(this.characterForm);
  }

  onSubmit() {}

  ngOnDestroy(): void {}
}

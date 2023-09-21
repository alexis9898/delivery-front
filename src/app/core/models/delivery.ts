import { Status } from '../enums/status.enum';
import { Customer } from './customer';
import { ProductDetail } from './product-detail-delivery';
import { UserData } from './user-data';

export class Delivery {
  public id: number;
  public status: Status;
  public date: Date;

  public customerId: number;
  public customer: Customer;

  public deliveryPersonId: string;
  public deliveryPerson: UserData;

  public managerId: string;
  public manager: UserData;

  public productsModel: ProductDetail[];
}

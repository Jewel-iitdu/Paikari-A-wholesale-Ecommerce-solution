import { Observable } from 'rxjs';
export interface ProductInformation{
    // id: any;
    productname?: string;
    productprice?: number;
    productquantity?: number;
    productDescription: string;
    productImageUrl: string;
    supplierId: string;
    created: any;
    category?: string;
}

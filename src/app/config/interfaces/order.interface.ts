export interface OrderInformation{
    id?: string;
    productID?: string;
    orderQuantity?: number;
    customerID?: string;
    payment?: boolean;
    date?: any;
    supplierID?:string;
    status?:string;
}
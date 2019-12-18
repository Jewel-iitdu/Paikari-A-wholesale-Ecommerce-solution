export interface OrderInformation{
    id?: string;
    productID?: string;
    productName?:string;
    orderQuantity?: number;
    productPrice?: number;
    customerID?: string;
    payment?: boolean;
    date?: any;
    supplierID?:string;
    status?:string;
    rated?: boolean;
    complaint?:boolean;
    complaintText?:string;
}
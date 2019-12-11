import { Roles } from './../enums/paikariEnum';
import { first } from 'rxjs/operators';


export interface UserInformation {
	password: string;
	email: string;
	name?:string;
	metaData?:CustomerUserInformation;

}
export interface CustomerUserInformation {
	uid?:string;
    name?:string;
	email?: string;
	role?: Roles[];
	phoneNumber?: number;
	ratings?: number;
	useraddress?:string;
	photoURL?:string;
	companyname?: string;
	
}
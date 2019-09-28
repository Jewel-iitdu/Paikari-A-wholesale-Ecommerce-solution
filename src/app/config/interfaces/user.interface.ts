import { Roles } from './../enums/paikariEnum';
import { first } from 'rxjs/operators';


export interface UserInformation {
	password: string;
	email: string;
	firstname?:string;
	lastname?:string;
	metaData?:CustomerUserInformation;

}
export interface CustomerUserInformation {
	uid?:string;
    firstname?:string;
    lastname?:string;
	email: string;
	role: Roles[];
	phoneNumber?: string;
	ratings?: number;
	// homeAddress?: Place;
	// shopAddress?: Place;
	photoURL?:string;
}
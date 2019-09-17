import { Roles } from '../enums/paikariEnum';

export interface UserInformation {
	password: string;
	email: string;
	displayName?:string;
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
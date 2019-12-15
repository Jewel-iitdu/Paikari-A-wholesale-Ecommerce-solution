import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { switchMap, first } from 'rxjs/operators';
import { QueryService } from '../database-service/query.service';
import { Roles, Entities } from '../../config/enums/paikariEnum';
import { Person } from '../../config/interfaces/user.interface';

@Injectable({
	providedIn: 'root'
})
export class SecurityService {
	constructor(private query: QueryService) {}

	checkAuthorization(user: Person, isRoleValid: string): boolean {
		if (!user) return false;
		else if (user.role == isRoleValid) {
			return true;
		}

		return false;
	}

	matchAdmin(user: Person): boolean {
		return this.checkAuthorization(user, Roles.Admin);
	}
	matchSupplier(user: Person): boolean {
		return this.checkAuthorization(user, Roles.Supplier);
	}
	matchCustomer(user: Person): boolean {
		return this.checkAuthorization(user, Roles.Customer);
	}

	isAdmin(): Observable<boolean> {
		return new Observable((observer) => {
			this.query
				.getLoggedInUserID()
				.pipe(
					switchMap((res) => {
						return this.query.getSingleData(Entities.Person, res);
					})
				)
				.pipe(first())
				.subscribe((res2) => {
					let result = this.matchAdmin(res2);
					observer.next(result);
				}),
				(err) => observer.error(err),
				() => observer.complete();
		});
	}
	isCustomer(): Observable<boolean> {
		return new Observable((observer) => {
			this.query
				.getLoggedInUserID()
				.pipe(
					switchMap((res) => {
						return this.query.getSingleData(Entities.Person, res);
					})
				)
				.pipe(first())
				.subscribe((res2) => {
					let result = this.matchCustomer(res2);
					observer.next(result);
				}),
				(err) => observer.error(err),
				() => observer.complete();
		});
	}
	isSupplier(): Observable<boolean> {
		return new Observable((observer) => {
			this.query
				.getLoggedInUserID()
				.pipe(
					switchMap((res) => {
						return this.query.getSingleData(Entities.Person, res);
					})
				)
				.pipe(first())
				.subscribe((res2) => {
					let result = this.matchSupplier(res2);
					observer.next(result);
				}),
				(err) => observer.error(err),
				() => observer.complete();
		});
	}
}

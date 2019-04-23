import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Observable, throwError} from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { User } from './user.model';


@Injectable()

export class AuthService {
  token: string;
  mongoUrl = 'https://obscure-taiga-98500.herokuapp.com';

constructor(
  private router: Router,
  private httpClient: HttpClient
) {}

registerUser(user: User): Observable<any> {
  return this.httpClient.post<string>(`${this.mongoUrl}/api/users`, user)
    .pipe(
      map(response => {
        this.token = response
        this.router.navigate(['/home']);
        alert("You have registered successfully!")
      }),
      catchError(this.errorHandler),
    );
}


loginUser(user: User): Observable<any> {
  return this.httpClient.post<string>(`${this.mongoUrl}/api/auth`, user)
    .pipe(
      map(response => {
        this.token = response;
        this.router.navigate(['/home']);
        }),
      catchError(this.errorHandler)
    );
}

logout() {
  this.router.navigate(['/home']);
  this.token = null;
  alert("You are logged out.");
}

isAuthenticated() {
  return this.token != null;
}

private errorHandler(error: HttpErrorResponse) {
        if (error.error instanceof ErrorEvent) {
            console.error('An error occurred:', error.error.message);
        }
        else {
            console.error(
                `Backend returned code ${error.status}, ` +
                `body was: ${error.error}`
                );
            alert(error.error);
        }
        return throwError(
            'An error occurred.'
        );
    }

}
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';

import { Citizen } from './citizen';
import { throwError } from 'rxjs';

@Injectable()
export class CitizenService {

    constructor(private http: HttpClient) { }

    configUrl = 'http://103.229.41.59/api/services/app/Citizen/';


    private handleError(error: HttpErrorResponse) {
        if (error.status === 0) {
          // A client-side or network error occurred. Handle it accordingly.
          console.error('An error occurred:', error.error);
        } else {
          // The backend returned an unsuccessful response code.
          // The response body may contain clues as to what went wrong.
          console.error(
            `Backend returned code ${error.status}, body was: `, error.error);
        }
        // Return an observable with a user-facing error message.
        return throwError(() => new Error('Something bad happened; please try again later.'));
      }

    getConfig(){
        return this.http.get<Citizen>(this.configUrl.concat('GetAllCitizen'));
    }

    deleteConfig(id: number){
      const param = new HttpParams().set('id', id);
        return this.http.delete<Citizen>(this.configUrl.concat('DeleteCitizen'), {params: param})
    }

    // getProductsSmall() {
    //     return this.http.get<any>('assets/products-small.json')
    //     .toPromise()
    //     .then(res => <Product[]>res.data)
    //     .then(data => { return data; });
    // }

    // getProducts() {
    //     return this.http.get<any>('assets/products.json')
    //     .toPromise()
    //     .then(res => <Product[]>res.data)
    //     .then(data => { return data; });
    // }

    // getProductsWithOrdersSmall() {
    //     return this.http.get<any>('assets/products-orders-small.json')
    //     .toPromise()
    //     .then(res => <Product[]>res.data)
    //     .then(data => { return data; });
    // }

    // generatePrduct(): Product {
    //     const product: Product =  {
    //         id: this.generateId(),
    //         name: this.generateName(),
    //         description: "Product Description",
    //         price: this.generatePrice(),
    //         quantity: this.generateQuantity(),
    //         category: "Product Category",
    //         inventoryStatus: this.generateStatus(),
    //         rating: this.generateRating()
    //     };

    //     product.image = product.name.toLocaleLowerCase().split(/[ ,]+/).join('-')+".jpg";;
    //     return product;
    // }

    // generateId() {
    //     let text = "";
    //     let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        
    //     for (var i = 0; i < 5; i++) {
    //         text += possible.charAt(Math.floor(Math.random() * possible.length));
    //     }
        
    //     return text;
    // }

    // generateName() {
    //     return this.productNames[Math.floor(Math.random() * Math.floor(30))];
    // }

    // generatePrice() {
    //     return Math.floor(Math.random() * Math.floor(299)+1);
    // }

    // generateQuantity() {
    //     return Math.floor(Math.random() * Math.floor(75)+1);
    // }

    // generateStatus() {
    //     return this.status[Math.floor(Math.random() * Math.floor(3))];
    // }

    // generateRating() {
    //     return Math.floor(Math.random() * Math.floor(5)+1);
    // }
}
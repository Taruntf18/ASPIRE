import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { baseUrl } from '../environments/environment'; // Adjust if needed

@Injectable({
  providedIn: 'root'
})
export class DqmService {
  constructor(private http: HttpClient) {}

  getDivisions(): Observable<any[]> {
    return this.http.get<any[]>(`${baseUrl}getDivisionalData`);
  }
}

// import { HttpClient } from '@angular/common/http';
// import { Injectable } from '@angular/core';
// import { Observable } from 'rxjs';
// import { baseUrl } from '../environments/environment'; // Adjust if needed

// @Injectable({
//   providedIn: 'root'
// })
// export class AqmService {
//   constructor(private http: HttpClient) {}

//   // Method to POST AQM data to the backend
//   postAqmData(data: any): Observable<any> {
//     return this.http.post<any>(`${baseUrl}saveAqmData`, data);
//   }
// }


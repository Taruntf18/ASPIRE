import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { baseUrl } from '../environments/environment'; // Adjust if needed

@Injectable({
  providedIn: 'root'
})
export class AqmService {
  constructor(private http: HttpClient) {}

  postAqmData(data: any): Observable<any> {
    return this.http.post<any[]>(`${baseUrl}postAqmData`, data);
  }

  uploadDocument(file: File, type: string): Observable<any>{
    const formData = new FormData();
    formData.append('file', file);
    formData.append('type', type);
    return this.http.post(`${baseUrl}uploadAqmfiles`, formData);
  }

  getDataByStatus(status: String): Observable<Object[]> {
    return this.http.get<Object[]>(`${baseUrl}getAllAqmDataByStatus/${status}`);
  }

  updateAqmWithStatus(data: any): Observable<any>{
    console.log(data);
    return this.http.post<any[]>(`${baseUrl}updateAqmData`, data);
  }
}
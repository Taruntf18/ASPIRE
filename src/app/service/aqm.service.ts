import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { baseUrl } from '../environments/environment'; // Adjust if needed

@Injectable({
  providedIn: 'root'
})
export class AqmService {
  constructor(private http: HttpClient) {}

  // Method to POST AQM data to the backend
  postAqmData(data: any): Observable<any> {
    return this.http.post<any[]>(`${baseUrl}postAqmData`, data);
  }

  // Methods to upload aqm documents
  uploadDocument(file: File, type: string): Observable<any>{
    const formData = new FormData();
    formData.append('file', file);
    formData.append('type', type);
    return this.http.post(`${baseUrl}uploadAqmfiles`, formData);
  }

  getDataByStatus(): Observable<Object[]> {
    return this.http.get<Object[]>(`${baseUrl}getAllAqmDataByStatus/MR`);
  }
}
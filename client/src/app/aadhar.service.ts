import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import Aadhar from './models/Aadhar';

@Injectable({
  providedIn: 'root'
})
export class AadharService {
  public url: string = 'http://localhost:9000';

  constructor(private http: HttpClient) { }

  public getMyAadhar = (): Observable<Aadhar> => {
    return this.http.get<Aadhar>(`${this.url}/api/aadhar/myaadhar`);
  };
}

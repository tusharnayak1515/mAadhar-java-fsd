import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import Aadhar from './models/Aadhar';

@Injectable({
  providedIn: 'root'
})
export class AadharService {
  public aadhar: BehaviorSubject<Aadhar> = new BehaviorSubject<any>(null);
  public url: string = 'http://localhost:9000';

  constructor(private http: HttpClient) { }

  public getAllAadhar = (): Observable<Aadhar[]> => {
    return this.http.get<Aadhar[]>(`${this.url}/api/aadhar/`);
  };

  public getNewAadharRequests = (): Observable<Aadhar[]> => {
    return this.http.get<Aadhar[]>(`${this.url}/api/aadhar/applied`);
  };

  public getDuplicateAadharRequests = (): Observable<Aadhar[]> => {
    return this.http.get<Aadhar[]>(`${this.url}/api/aadhar/duplicate`);
  };

  public approveNewAadharRequests = (aadharId:number): Observable<Aadhar[]> => {
    return this.http.put<Aadhar[]>(`${this.url}/api/aadhar/approve`, {aadharId});
  };

  public approveDuplicateAadharRequests = (aadharId:number): Observable<Aadhar[]> => {
    return this.http.put<Aadhar[]>(`${this.url}/api/aadhar/approve-duplicate`, {aadharId});
  };

  public getMyAadhar = (): Observable<Aadhar> => {
    return this.http.get<Aadhar>(`${this.url}/api/aadhar/myaadhar`);
  };

  public applyNewAadhar = (issueDate:string): Observable<Aadhar> => {
    return this.http.post<Aadhar>(`${this.url}/api/aadhar/myaadhar`, {issueDate});
  };

  public applyDuplicateAadhar = (): Observable<Aadhar> => {
    return this.http.put<Aadhar>(`${this.url}/api/aadhar/myaadhar`, {});
  };

  public deleteAadhar = (aadharId:number): Observable<Aadhar[]> => {
    return this.http.delete<Aadhar[]>(`${this.url}/api/aadhar/${aadharId}`, {});
  };

  public setAadhar(aadhar: Aadhar): void {
    this.aadhar.next(aadhar);
  }

  public getAadhar(): Observable<Aadhar> {
    return this.aadhar.asObservable();
  }
}

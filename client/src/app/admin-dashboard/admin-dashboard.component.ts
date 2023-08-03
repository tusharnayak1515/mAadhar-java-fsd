import { Component, OnInit } from '@angular/core';
import Aadhar from '../models/Aadhar';
import { AadharService } from '../aadhar.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  public allList:any[] = [];
  public newList:any[] = [];
  public duplicateList:any[] = [];
  public error:string = '';

  constructor(private aadharService: AadharService) {

  }

  ngOnInit(): void {
    this.getAllAadhar();
    this.getNewAadharRequests();
    this.getDuplicateAadharRequests();
  }

  getAllAadhar() {
    this.aadharService.getAllAadhar().subscribe(
      (response:any)=> {
        if(response.success) {
          this.allList = response.aadharList;
          this.error = '';
        }
      },
      (error:any)=> {
        this.error = error.error;
      }
    );
  }

  getNewAadharRequests() {
    this.aadharService.getNewAadharRequests().subscribe(
      (response:any)=> {
        if(response.success) {
          this.newList = response.aadharList;
          this.error = '';
        }
      },
      (error:any)=> {
        this.error = error.error;
      }
    );
  }

  getDuplicateAadharRequests() {
    this.aadharService.getDuplicateAadharRequests().subscribe(
      (response:any)=> {
        if(response.success) {
          this.duplicateList = response.aadharList;
          this.error = '';
        }
      },
      (error:any)=> {
        this.error = error.error;
      }
    );
  }

  approveNew(aadharId:number) {
    this.aadharService.approveNewAadharRequests(aadharId).subscribe(
      (response:any)=> {
        if(response.success) {
          this.newList = response.aadharList;
          this.error = '';
          this.getAllAadhar();
        }
      },
      (error:any)=> {
        this.error = error.error;
      }
    )
  }

  approveDuplicate(aadharId:number) {
    this.aadharService.approveDuplicateAadharRequests(aadharId).subscribe(
      (response:any)=> {
        if(response.success) {
          this.duplicateList = response.aadharList;
          this.error = '';
          this.getAllAadhar();
        }
      },
      (error:any)=> {
        this.error = error.error;
      }
    )
  }

  deleteAadhar(aadharId:number) {
    this.aadharService.deleteAadhar(aadharId).subscribe(
      (response:any)=> {
        if(response.success) {
          this.allList = response.aadharList;
          this.error = '';
          this.getNewAadharRequests();
          this.getDuplicateAadharRequests();
        }
      },
      (error:any)=> {
        this.error = error.error;
      }
    )
  }

}

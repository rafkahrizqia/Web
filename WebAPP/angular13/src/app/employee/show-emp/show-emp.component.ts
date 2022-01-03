import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared.service';

@Component({
  selector: 'app-show-emp',
  templateUrl: './show-emp.component.html',
  styleUrls: ['./show-emp.component.css']
})
export class ShowEmpComponent implements OnInit {
  toastr: any;
 
  constructor(private service:SharedService) { }

  EmployeeList:any=[];
  
  ModalTitle: string="";
  ActiveAddEditEmpComp:boolean=false;
  emp:any;

  ngOnInit(): void {
    this.refreshEmpList();
  }
  
  AddClick(){
    this.emp={
      EmployeeId:0,
      EmployeeName:"",
      Departement:"",
      DateOfJoining:"",
      PhotoFileName:"anonymous.png"
    }
    this.ModalTitle="Add Employee";
    this.ActiveAddEditEmpComp=true;
  }

  editClick(item:any){
    this.emp=item;
    this.ModalTitle="Edit Employee";
    this.ActiveAddEditEmpComp=true;
  }

  deleteClick(item:any){
    if(confirm("Are you sure want to delete?")){
      this.service.deleteEmployee(item.EmployeeId).subscribe(data=>{
        alert(data.toString());
      this.refreshEmpList();
      })
    }
  }

  CloseClick(){
    this.ActiveAddEditEmpComp=false;
    this.refreshEmpList();
  }

  refreshEmpList(){
    this.service.getEmpList().subscribe(data=>{
      this.EmployeeList=data;
    });
  }


}


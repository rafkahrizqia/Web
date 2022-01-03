import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared.service';


@Component({
  selector: 'app-show-dep',
  templateUrl: './show-dep.component.html',
  styleUrls: ['./show-dep.component.css']
})
export class ShowDepComponent implements OnInit {
  toastr: any;
  constructor(private service:SharedService) { }

  DepartmentList:any=[];
  
  ModalTitle: string="";
  ActiveAddEditDepComp:boolean=false;
  dep:any;

  ngOnInit(): void {
    this.refreshDepList();
  }
  
  AddClick(){
    this.dep={
      DepartmentId:0,
      DepartmentName:""
    }
    this.ModalTitle="Add Department";
    this.ActiveAddEditDepComp=true;
  }

  editClick(item:any){
    this.service.updateDepartment(item.DepartmentId, )
    this.dep=item;
    this.ModalTitle="Edit Department";
    this.ActiveAddEditDepComp=true;
  }

  deleteClick(item:any){
    if(confirm("Are you sure want to delete?")){
      this.service.deleteDepartment(item.DepartmentId).subscribe(data=>{
        alert(data.toString());
      this.refreshDepList();
      })
    }
  }

  CloseClick(){
    this.ActiveAddEditDepComp=false;
    this.refreshDepList();
  }

  refreshDepList(){
    this.service.getDepList().subscribe(data=>{
      this.DepartmentList=data;
    });
  }


}

import { Component, OnInit } from '@angular/core';
import { Task } from '../admin/admin';
import { Router } from '@angular/router'; 
import { ServiceService } from './service.service';

@Component({
  selector: 'app-user',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  taskObj: Task = new Task();
  taskArr: Task[] = [];

  addTaskValue: string = '';
  addPassValue: string = '';
  addEmailValue: string = '';
  editTaskValue: string = '';
  editRoleValue: string = '';
  editEmailValue: string = '';
  editPassValue: string = '';

  constructor(private crudService: ServiceService, private router:Router) {}

  ngOnInit(): void {
    this.editTaskValue = '';
    this.addPassValue = '';
    this.addEmailValue = '';
    this.addTaskValue = '';
    this.editRoleValue = '';
    this.taskObj = new Task();
    this.taskArr = [];
    this.getAllTask();
  }

  getAllTask() {
    this.crudService.getAllTask().subscribe(res => {
      this.taskArr = res;
    }, err => {
      alert("Unable to get list of tasks");
    });
  }

  addTask() {
    this.taskObj.user = this.addTaskValue;
    this.taskObj.email = this.addEmailValue;
    this.taskObj.pass = this.addPassValue;
    this.taskObj.role = this.addPassValue;

    this.crudService.addTask(this.taskObj).subscribe(res => {
      this.taskArr.push(res); // Thêm vào mảng để hiển thị ngay lập tức
      this.addTaskValue = ''; // Xóa giá trị nhập
      this.addPassValue = '';
      this.editTaskValue = '';
      this.editRoleValue = '';
    }, err => {
      alert(err);
    })
  }
  editTask() {
    const newRole = this.editRoleValue.trim().toLowerCase();
    this.taskObj.user = this.editTaskValue;
    this.taskObj.email = this.editEmailValue;
    this.taskObj.pass = this.editPassValue;
    this.taskObj.role = newRole;
  
    // Update the user information
    this.crudService.editTask(this.taskObj).subscribe(
      (res) => {
        this.ngOnInit();
        this.editTaskValue = ''; // Clear the input fields
        this.editEmailValue = ''; // Clear the input fields
        this.editPassValue = ''; // Clear the input fields
        this.editRoleValue = ''; // Clear the input fields
      }, err=> {
      alert("Failed to update task");
    })
  }
  deleteTask(etask : Task) {
    this.crudService.deleteTask(etask).subscribe(res => {
      this.ngOnInit();
    }, err=> {
      alert("Failed to delete task");
    });
  }
  call(etask : Task) {
    this.taskObj = etask;
    this.editTaskValue = etask.user;
    this.editEmailValue = etask.email;
    this.editPassValue = etask.pass;
    this.editRoleValue = etask.role;
  }
  logout(): void {
    // Remove login info from storage
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}

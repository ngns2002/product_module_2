import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../service.service';
import { Task } from '../admin';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
  taskObj: Task = new Task();
  taskArr: Task[] = [];

  addTaskValue: string = '';
  addPassValue: string = '';
  addEmailValue: string = '';
  addNameValue: string = '';
  addLocalValue: string = '';
  addPhoneValue: string = '';
  addRoleValue: string = '';
  editTaskValue: string = '';
  showBackToHomeLink: boolean = false;
  showValidators: boolean = true;

  constructor(private crudService: ServiceService) {}

  ngOnInit(): void {
    this.editTaskValue = '';
    this.addPassValue = '';
    this.addEmailValue = '';
    this.addNameValue = '';
    this.addLocalValue = '';
    this.addPhoneValue = '';
    this.addRoleValue = '';
    this.addTaskValue = '';
    this.taskObj = new Task();
    this.taskArr = [];
  }
  addTask() {
    this.taskObj.user = this.addTaskValue;
    this.taskObj.email = this.addEmailValue;
    this.taskObj.name = this.addNameValue;
    this.taskObj.local = this.addLocalValue;
    this.taskObj.phone = this.addPhoneValue;
    this.taskObj.role = this.addRoleValue;
    this.taskObj.pass = this.addPassValue;
    this.crudService.addTask(this.taskObj).subscribe(
      (res) => {
        this.taskArr.push(res); // Thêm vào mảng để hiển thị ngay lập tức
        this.addTaskValue = ''; // Xóa giá trị nhập
        this.addEmailValue = '';
        this.addNameValue = '';
        this.addLocalValue = '';
        this.addPhoneValue = '';
        this.addPassValue = '';
        this.showBackToHomeLink = true;
        this.showValidators = false;
      },
      (err) => {
        alert(err);
      }
    );
  }
}

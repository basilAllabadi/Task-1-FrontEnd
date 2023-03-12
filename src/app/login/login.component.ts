import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AdminService } from '../admins-app/admin.service';
import { StudentService } from '../students-app/Student.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  adminModeTrigger: boolean = false

  constructor(public adminService: AdminService, public studentsService: StudentService) { }
  loginForm = new FormGroup({
    userName: new FormControl(""),
    password: new FormControl("")
  })

  loginModeTrigger() {
    this.adminModeTrigger = !this.adminModeTrigger
  }
}

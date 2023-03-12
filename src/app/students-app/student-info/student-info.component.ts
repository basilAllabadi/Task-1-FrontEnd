import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { StudentService } from '../Student.service';

@Component({
  selector: 'app-student-info',
  templateUrl: './student-info.component.html',
  styleUrls: ['./student-info.component.css']
})
export class StudentInfoComponent implements OnInit {
  constructor(public studentsService: StudentService) { }
  updateStudentPasswordForm = new FormGroup({
    password: new FormControl("")

  })
  ngOnInit() {
    this.studentsService.getInfo()
  }

  updateMoodTrigger() {
    this.studentsService.updateMood = !this.studentsService.updateMood
  }
}

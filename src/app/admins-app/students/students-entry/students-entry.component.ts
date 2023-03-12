import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { StudentsService } from '../students.Service';

@Component({
  selector: 'app-students-entry',
  templateUrl: './students-entry.component.html',
  styleUrls: ['./students-entry.component.css']
})
export class StudentsEntryComponent implements OnInit, OnDestroy {
  minBirth: string | undefined
  newMonth: any
  newDay: any

  constructor(public studentsService: StudentsService, private http: HttpClient) { }
  ngOnInit(): void {
    this.checkBirthdayMin()
    this.studentsService.getGenders()
    this.studentsService.getDegrees()
    this.studentsService.getMajors()
    this.studentsService.getFaculties()
  }

  ngOnDestroy(): void {
    this.studentsService.studentEntryForm.reset()
  }

  checkBirthdayMin() {
    var dtToday = new Date();
    console.log(dtToday)
    var month = dtToday.getMonth() + 1;
    var day = dtToday.getDate();
    var year = dtToday.getFullYear() - 17;
    if (month < 10) {
      this.newMonth = '0' + month.toString()
    }
    else {
      this.newMonth = month
    }
    if (day < 10) {
      this.newDay = '0' + day.toString()
    }
    else {
      this.newDay = day
    }
    var minBirth = year + "-" + this.newMonth + "-" + this.newDay
    this.minBirth = minBirth
  }

  addStudent(studentEntryForm: FormGroup) {
    this.studentsService.addStudent(studentEntryForm)
  }
  updateStudent(studentEntryForm: FormGroup) {
    this.studentsService.updateStudent(studentEntryForm)
  }
}
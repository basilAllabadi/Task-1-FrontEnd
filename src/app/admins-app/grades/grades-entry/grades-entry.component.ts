import { Component, OnDestroy } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Course } from '../../courses/Course.model';
import { Student } from '../../students/Students.model';
import { GradesService } from '../Grades.service';

@Component({
  selector: 'app-grades-entry',
  templateUrl: './grades-entry.component.html',
  styleUrls: ['./grades-entry.component.css']
})
export class GradesEntryComponent implements OnDestroy {
  courseSearch: Course
  studentSearch: Student

  constructor(public gradesService: GradesService) {

  }
  ngOnDestroy(): void {
    this.gradesService.gradesEntryForm.reset()
  }


  addGrade(gradesEntryForm: FormGroup) {
    console.log(gradesEntryForm)
    this.gradesService.addGrade(gradesEntryForm)

  }
  updateGrade(gradesEntryForm: FormGroup) {
    this.gradesService.updateGrade(gradesEntryForm)
    gradesEntryForm.reset()

  }
  checkCourse() {

    this.gradesService.checkCourse(this.courseSearch)
    console.log(this.courseSearch)


  }
  checkStudent() {
    this.gradesService.checkStudent(this.studentSearch)
    console.log(this.studentSearch)
  }
}

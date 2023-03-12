import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { CoursesService } from '../Courses.service';

@Component({
  selector: 'app-course-entry',
  templateUrl: './course-entry.component.html',
  styleUrls: ['./course-entry.component.css']
})
export class CourseEntryComponent implements OnInit, OnDestroy {
  startDate: string = ""
  constructor(public coursesService: CoursesService) { }

  ngOnInit(): void {
    this.coursesService.getFaculties()
    this.coursesService.getMajors()

  }
  ngOnDestroy(): void {
    this.coursesService.courseEntryForm.reset()

  }

  addCourse(courseEntryForm: FormGroup) {
    console.log(courseEntryForm)
    this.coursesService.addCourse(courseEntryForm)

  }
  updateCourse(courseEntryForm: FormGroup) {
    console.log(courseEntryForm)
    this.coursesService.updateCourse(courseEntryForm)
  }

}

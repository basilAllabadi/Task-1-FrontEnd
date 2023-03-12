import { Component, OnInit } from '@angular/core';
import { CoursesService } from '../courses/Courses.service';
import { StudentsService } from '../students/students.Service';


@Component({
  selector: 'app-brief',
  templateUrl: './brief.component.html',
  styleUrls: ['./brief.component.css']
})
export class BriefComponent implements OnInit {
  studentsCount: number = 0
  coursesCount: number = 0
  constructor(public studentsService: StudentsService, public coursesService: CoursesService) { }
  ngOnInit() {
    this.coursesService.getAllCourses()
    this.studentsService.getAllStudents()
    this.coursesCount = this.coursesService.allCourses.length
    this.studentsCount = this.studentsService.allStudents.length
  }
}

import { Component, OnInit } from '@angular/core';
import { CoursesService } from './Courses.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit{
constructor(public coursesService:CoursesService){

}
ngOnInit(): void {
  this.coursesService.getAllCourses()
}
}

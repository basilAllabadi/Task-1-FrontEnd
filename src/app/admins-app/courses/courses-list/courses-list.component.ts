import { Component } from '@angular/core';
import { CoursesService } from '../Courses.service';

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.css']
})
export class CoursesListComponent {
  constructor(public coursesService: CoursesService) {

  }
  courseChoose(id: number) {
    console.log(id)
    this.coursesService.courseChoose(id)
  }
  deleteCourse(id: number) {
    this.coursesService.deleteCourse(id)
  }
}

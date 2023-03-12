import { Component, ViewChild, ElementRef } from '@angular/core';
import { GradesService } from '../Grades.service';

@Component({
  selector: 'app-grades-list',
  templateUrl: './grades-list.component.html',
  styleUrls: ['./grades-list.component.css']
})
export class GradesListComponent {

  constructor(public gradesService: GradesService) {

  }
  gradeChoose(id: number) {
    console.log(id)
    this.gradesService.gradeChoose(id)

  }
  deleteGrade(id: number) {
    this.gradesService.deleteGrade(id)
  }
}

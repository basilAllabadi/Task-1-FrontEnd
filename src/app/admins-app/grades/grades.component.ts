import { Component, OnInit } from '@angular/core';
import { GradesService } from './Grades.service';

@Component({
  selector: 'app-grades',
  templateUrl: './grades.component.html',
  styleUrls: ['./grades.component.css']
})
export class GradesComponent implements OnInit {
constructor(public gradesService:GradesService){

}
ngOnInit(): void {
  this.gradesService.getGrades()
}
}

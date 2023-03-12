import { Component, OnInit } from '@angular/core';
import { StudentService } from '../Student.service';

@Component({
  selector: 'app-grades',
  templateUrl: './grades.component.html',
  styleUrls: ['./grades.component.css']
})
export class GradesStudentComponent implements OnInit {
  constructor(public studentsService: StudentService) {

  }
  ngOnInit() {
    this.studentsService.getGrades()
  }
} 

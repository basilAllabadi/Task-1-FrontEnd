import { Component, OnInit } from '@angular/core';
import { StudentsService } from './students.Service';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent implements OnInit {
constructor(public studentsService:StudentsService){}
  ngOnInit(): void {
    this.studentsService.getAllStudents()
}

}

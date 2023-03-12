import { Component } from '@angular/core';
import { StudentsService } from '../students.Service';


@Component({
  selector: 'app-students-list',
  templateUrl: './students-list.component.html',
  styleUrls: ['./students-list.component.css']
})
export class StudentsListComponent {
  constructor(public studentsService: StudentsService) { }

  studentChoose(id: number) {
    console.log(id)
    this.studentsService.studentChoose(id)

  }
  deleteStudent(id: number) {
    this.studentsService.deleteStudent(id)
  }

}

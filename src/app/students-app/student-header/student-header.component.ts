import { Component } from '@angular/core';
import { StudentService } from '../Student.service';

@Component({
  selector: 'app-student-header',
  templateUrl: './student-header.component.html',
  styleUrls: ['./student-header.component.css']
})
export class StudentHeaderComponent {
  constructor(public studentsService: StudentService) { }
}

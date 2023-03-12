import { Component, OnInit } from '@angular/core';
import { QueriesService } from './Queries.Service';

@Component({
  selector: 'app-queries',
  templateUrl: './queries.component.html',
  styleUrls: ['./queries.component.css']
})
export class QueriesComponent implements OnInit{
constructor(public queriesService:QueriesService){
}
ngOnInit(){

    this.queriesService.getQueryGrades()
    this.queriesService.getFaculties()
    this.queriesService.getMajors()

}
}

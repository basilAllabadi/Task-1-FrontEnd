import { Component } from '@angular/core';
import { QueriesService } from '../Queries.Service';

@Component({
  selector: 'app-queries-list',
  templateUrl: './queries-list.component.html',
  styleUrls: ['./queries-list.component.css']
})
export class QueriesListComponent {
  constructor(public queriesService: QueriesService) { }


}

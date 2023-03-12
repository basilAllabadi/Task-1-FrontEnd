import { Component } from '@angular/core';
import { AdminService } from 'src/app/admins-app/admin.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  constructor(public adminsService: AdminService) { }
}

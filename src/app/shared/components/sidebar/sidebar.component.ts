import { Component, OnInit } from '@angular/core';
import { RolPermissionService } from '../../services/rol-permission.service';

@Component({
  selector: 'sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent{

  constructor(public rolPermissionService: RolPermissionService) {}

}

import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import { WorkspaceService, IRoom } from 'app/core/workspace/workspace.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public filter = 'all';
  public $rooms: Observable<IRoom[]>;
  public $nearBy: Observable<IRoom[]>;

  constructor(
    public workspace: WorkspaceService,
  ) { }

  ngOnInit() {
    this.$rooms = this.workspace.rooms; // subscribe to entire collection
    this.$nearBy = this.workspace.nearBy;
    this.workspace.loadAll();    // load all rooms
  }

}

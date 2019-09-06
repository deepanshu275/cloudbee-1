import { Component, OnInit } from '@angular/core';
import { InstanceService } from '../services/instance.service';
import { InfrastructureService } from '../services/infrastructure.service';

import {AddInstanceDialogComponent} from '../add-instance-dialog/add-instance-dialog.component';

import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-my-infrastructure',
  templateUrl: './my-infrastructure.component.html',
  styleUrls: ['./my-infrastructure.component.css']
})
export class MyInfrastructureComponent implements OnInit {

  constructor(private instanceService: InstanceService,
              private infrastructureService: InfrastructureService,
              public dialog: MatDialog) { }

  addInstance = false
  isInstanceLaunching = false

  infrastructure = [

  ]

  csvInfrastructure = []

  displayedColumns: string[] = ['position', 'name', 'weight', 'remove'];

  openDialog(): void {
    const dialogRef = this.dialog.open(AddInstanceDialogComponent, {
      width: '50%',
      data: {name: 'this.name', animal: 'this.animal'}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result);
      this.ngOnInit();
    });
  }

  toggleAddInstance() {
    if (this.addInstance) {
      this.addInstance = false
    }
    else {
      this.addInstance = true
    }
  }

  removeFromInfrastructure(instanceId) {
    this.infrastructureService.removeInstance(instanceId, (res) => {
      console.log(res);
      this.ngOnInit()
    })
  }

  launchAll() {
    this.isInstanceLaunching = true
    this.instanceService.launchAll( (res) => {
      console.log(res)
      this.ngOnInit()
      this.isInstanceLaunching = false
    });
  }

  onSubmittingInstance(res) {
    this.addInstance = false
    console.log(res);
    this.ngOnInit()
  }

  ngOnInit() {
    this.infrastructureService.show((function(infrastructure){
      this.infrastructure = infrastructure.data
    }).bind(this))
  }

}

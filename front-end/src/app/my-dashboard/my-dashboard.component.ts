import { Component } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';

// Services
import { InstanceService } from '../services/instance.service';
import { InfrastructureService } from '../services/infrastructure.service';
import { PlaybookService } from '../services/playbook.service';

@Component({
  selector: 'app-my-dashboard',
  templateUrl: './my-dashboard.component.html',
  styleUrls: ['./my-dashboard.component.css']
})
export class MyDashboardComponent {
  /** Based on the screen size, switch from standard to one column per row */
  cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      return [
        { title: 'My Infrastructure Plan', cols: 2, rows: 1 },
        { title: 'My Playbooks', cols: 1, rows: 1 },
        { title: 'Running Machines', cols: 1, rows: 1 },
      ];
    })
  );

  addPlaybook = false
  isPlaybookRunning = false

  playbook = [

  ]

  instanceColumns: string[] = ['id', 'ip', 'remove']

  constructor(private breakpointObserver: BreakpointObserver,
    private instanceService: InstanceService,
    private infrastructureService: InfrastructureService,
    private playbookService: PlaybookService) {

  }

  toggleAddPlaybook() {
    if (this.addPlaybook) {
      this.addPlaybook = false
    }
    else {
      this.addPlaybook = true
    }
  }

  destroy(instanceId) {
    this.instanceService.destroy(instanceId, (res) => {
      this.ngOnInit()
    });
  }

  runPlaybook() {
    this.isPlaybookRunning = true
    this.playbookService.run( (res) => {
      console.log(res)
      this.isPlaybookRunning = false
    });
  }

  ngOnInit() {

    this.playbookService.show((function(playbook){
      this.playbook = playbook.data
    }).bind(this));

    this.instanceService.show((function(instance){
      this.instances = instance.data
    }).bind(this))
  }
}

import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';

import {Task} from '../models/playbook.model';

import {PlaybookService} from '../services/playbook.service';

@Component({
  selector: 'app-new-playbook-form',
  templateUrl: './new-playbook-form.component.html',
  styleUrls: ['./new-playbook-form.component.css']
})
export class NewPlaybookFormComponent implements OnInit {

  options: FormGroup;
  tasks: Array<Task> = [];

  constructor(private fb: FormBuilder, private playbookService: PlaybookService) {
    this.options = fb.group({
      hosts: ''
    });
  }
  addTasks() {
    let newTask = new Task()
    newTask.options = this.fb.group({
      become: false,
      taskType: 'shell',
      name: '',
      command: '',
      packages: ['']
    });
    this.tasks.push(newTask)
  }
  generateJSON() {
    let tasksJSON = []
    for (let task of this.tasks) {
      tasksJSON.push(task.generateJSON());
    }
    let finalJSON = {
      "play": {
        "hosts": this.options.value.hosts.replace(' ', '').split(','),
        "tasks": tasksJSON
      }
    }

    console.log(finalJSON);

    this.playbookService.add(finalJSON, (res) => {
      console.log(res);
    })
  }
  ngOnInit() {
  }

}

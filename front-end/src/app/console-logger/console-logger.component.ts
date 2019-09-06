import { Component, OnInit } from '@angular/core';
import { ConsoleService } from '../services/console.service'

@Component({
  selector: 'app-console-logger',
  templateUrl: './console-logger.component.html',
  styleUrls: ['./console-logger.component.css']
})
export class ConsoleLoggerComponent implements OnInit {
  consoleOutput = ['']
  constructor(private consoleService: ConsoleService) {
    consoleService.setCallback((data) => {
      this.consoleOutput.push(data);
    })
  }
  clearConsole() {
    this.consoleOutput = []
  }

  ngOnInit() {
  }

}

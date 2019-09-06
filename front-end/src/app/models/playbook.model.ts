import {Deserializable} from "./deserializable.model";

var TaskEnum = {
  SHELL: 'shell',
  COMMAND: 'command',
  YUM: 'yum',
};

class Task implements Deserializable {
  name: string;
  taskType: string;
  task: string;
  isRoot: boolean;
  packages: Array<string> = [];
  options: any;

  constructor() {
    this.name = ''
    this.taskType = TaskEnum.COMMAND
    this.isRoot = false
    this.packages = []
    this.task = ''
  }

  generateJSON() {
    let finalJSON
    switch (this.options.value.taskType) {
      case TaskEnum.YUM:
      finalJSON = {
                "name": this.options.value.name,
                "become": this.options.value.become,
                "yum": {
                    "name": "{{ packages }}"
                },
                "vars": {
                    "packages": this.options.value.packages.replace(' ', '').split(',')
                }
              }
              break
      case TaskEnum.SHELL:
      finalJSON = {
                "name": this.options.value.name,
                "shell": this.options.value.command,
                "become": this.options.value.become
              }
              break
      case TaskEnum.COMMAND:
      finalJSON = {
                "name": this.options.value.name,
                "command": this.options.value.command,
                "become": this.options.value.become
              }
              break
      default:
            console.log("Error")

    }
    return finalJSON;
  }

  deserialize(input: any) {
    this.isRoot = false;
    for (let taskType in TaskEnum) {

      taskType = TaskEnum[taskType]
      if (Object.keys(input).includes(taskType)) {
        this.taskType = taskType
        if (this.taskType == TaskEnum.YUM) {
          this.packages = input['vars'].packages;
        } else {
          this.task = input[this.taskType]
        }
        this.name = input['name']
      }

      if (Object.keys(input).includes('become')) {
        this.isRoot = input['become']
      }
    }
    return this
  }
}

class PlaybookElement implements Deserializable {
  hosts: [string];
  tasks: Array<Task> = [];

  deserialize(input: any) {
    this.hosts = input.hosts
    for (let task of input.tasks) {
      let element = new Task().deserialize(task)
      if (element != undefined) {
        this.tasks.push(element)
      }
    }
    return this
  }
}

class Playbook implements Deserializable {
  data = []
  deserialize(input: any) {
    this.data = []
    for (let inst of input) {
      let element = new PlaybookElement().deserialize(inst)
      this.data.push(element);
    }
    return this
  }
}

export {Playbook, Task}

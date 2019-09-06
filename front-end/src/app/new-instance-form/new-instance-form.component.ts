import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';

import {InfrastructureService} from '../services/infrastructure.service';

@Component({
  selector: 'app-new-instance-form',
  templateUrl: './new-instance-form.component.html',
  styleUrls: ['./new-instance-form.component.css']
})
export class NewInstanceFormComponent implements OnInit {
  @Output() onSubmit = new EventEmitter();

  options: FormGroup;

  constructor(private fb: FormBuilder, private infrastructureService: InfrastructureService) {
    this.options = fb.group({
      instaneId: '',
      instanceType: 't2.micro',
      keyName: 'mykey'
    });
  }

  generateJSON() {

    let finalJSON = {
    	"awsInstance": [

    	]
    }
    let element = {}
    element[this.options.value.instaneId] = {
      "ami": "${lookup(var.AMIS, var.AWS_REGION)}",
	    "instance_type": this.options.value.instanceType,
	    "key_name": "${aws_key_pair."+this.options.value.keyName+".key_name}"
    }

    finalJSON["awsInstance"].push(element)

    console.log(finalJSON)

    this.infrastructureService.addInstance(finalJSON, (res) => {
      // this.onSubmit(res);
      this.onSubmit.emit(res);
    })
  }

  ngOnInit() {
  }

}

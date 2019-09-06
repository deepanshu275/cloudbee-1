import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {InfrastructureService} from '../services/infrastructure.service';

export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'app-add-instance-dialog',
  templateUrl: './add-instance-dialog.component.html',
  styleUrls: ['./add-instance-dialog.component.css']
})
export class AddInstanceDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<AddInstanceDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private infrastructureService: InfrastructureService) {}

  csvInfrastructure = []
  error = ''
  uploaded = false

  onNoClick(): void {
    this.dialogRef.close();
  }

  // FILE UPLOAD
  // At the drag drop area
  // (drop)="onDropFile($event)"
  onDropFile(event: DragEvent) {
    event.preventDefault();
    this.uploadFile(event.dataTransfer.files);
  }

  // At the drag drop area
  // (dragover)="onDragOverFile($event)"
  onDragOverFile(event) {
    event.stopPropagation();
    event.preventDefault();
  }

  // At the file input element
  // (change)="selectFile($event)"
  selectFile(event) {
    this.uploadFile(event.target.files);
  }

  uploadFile(files: FileList) {
    if (files.length == 0) {
      console.log("No file selected!");
      return

    }
    let file: File = files[0];
    console.log(file);
    let reader = new FileReader();
    reader.readAsText(file);

    reader.onload = () => {
      let csvData = reader.result;
      let csvRecordsArray = (<string>csvData).split(/\r\n|\n/);
      // console.log(csvRecordsArray);
      if (this.isValidCSVFile(file)) {
        this.csvInfrastructure = csvRecordsArray;
        this.error = ''
        this.uploaded = true
      } else {
        this.error = 'Invalid file format'
        this.uploaded = false
      }

    };
  }

  saveInstancesFromExcel() {
    console.log(this.csvInfrastructure);

    // Remove Headers
    this.csvInfrastructure.shift();

    let finalJSON = {
      "awsInstance": [

      ]
    }

    for (let instance of this.csvInfrastructure) {
      if (instance.replace(' ', '').split(',').length == 3) {
        // finalJSON.awsInstance.push(this.generateJSON(instance))
        let element = this.generateJSON(instance)
        if (element != undefined) {
          finalJSON.awsInstance.push(element);
        }
      }
    }
    console.log(finalJSON);

    this.infrastructureService.addInstance(finalJSON, (res) => {
      console.log(res);
      this.dialogRef.close();
    })
  }

  generateJSON(instance) {
    instance = instance.replace(' ', '')
    instance = instance.split(',')
    if (instance != undefined) {
      if (instance.length == 3) {
        let instance_id = instance[0]
        let instance_type = instance[1]
        let key_name = instance[2]

        let element = {}
        element[instance_id] = {
          "ami": "${lookup(var.AMIS, var.AWS_REGION)}",
    	    "instance_type": instance_type,
    	    "key_name": "${aws_key_pair."+key_name+".key_name}"
        }
        return element
      }
    } else {
      return undefined
    }
  }

  isValidCSVFile(file: any) {
    return file.name.endsWith(".csv");
  }

}

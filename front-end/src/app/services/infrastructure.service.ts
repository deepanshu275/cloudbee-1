import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Infrastructure } from '../models/infrastructure.model'
import { ip } from '../ip';

@Injectable()
export class InfrastructureService {
  baseUrl = ""
  constructor(private http: HttpClient) {
    this.baseUrl = 'http://' + ip + ':3000/infrastructure'
  }
  show(callback) {
    this.http.get(this.baseUrl + '/show').subscribe((res)=>{
        let infrastructure = new Infrastructure().deserialize(res)
        callback(infrastructure)
    });
  }
  addInstance(awsInstance, cb){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
    this.http.post(this.baseUrl + '/add', awsInstance, httpOptions).subscribe((res)=>{
        cb(res);
    });
  }
  removeInstance(target, cb){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      }),
      body: { to_remove: target }
    };
    console.log(httpOptions);
    this.http.delete(this.baseUrl + '/remove', httpOptions).subscribe((res)=>{
        cb(res);
    });
  }
}

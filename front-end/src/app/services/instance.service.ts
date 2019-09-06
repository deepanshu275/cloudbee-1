import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Instance } from '../models/instance.model';
import { HttpHeaders } from '@angular/common/http';
import { ip } from '../ip';

@Injectable()
export class InstanceService {
  baseUrl = ""
  constructor(private http: HttpClient) {
    this.baseUrl = 'http://' + ip + ':3000/instance'
  }
  show(cb) {
    this.http.get(this.baseUrl + '/list').subscribe((res)=>{
        cb(new Instance().deserialize(res))
    });
  }
  destroy(target, cb) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      }),
      body: { target }
    };
    this.http.delete(this.baseUrl + '/destroy', httpOptions).subscribe((res)=>{
        cb(res);
    });
  }
  launchAll(cb) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
    this.http.post(this.baseUrl + '/launch', { }, httpOptions).subscribe((res)=>{
        cb(res);
    });
  }
}

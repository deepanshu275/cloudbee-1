import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

import {Playbook} from '../models/playbook.model';
import { ip } from '../ip';

@Injectable()
export class PlaybookService {
  baseUrl = ""
  constructor(private http: HttpClient) {
    this.baseUrl = 'http://' + ip +':3000/playbook'
  }
  show(cb) {
    this.http.get(this.baseUrl + '/show').subscribe((res)=>{
        cb(new Playbook().deserialize(res));
    });
  }
  add(play, cb){
    console.log("ADD CALLED")
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
    this.http.post(this.baseUrl + '/add', play, httpOptions).subscribe((res)=>{
        cb(res);
    });
  }
  run(cb){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
    this.http.post(this.baseUrl + '/run', { }, httpOptions).subscribe((res)=>{
        cb(res);
    });
  }
}

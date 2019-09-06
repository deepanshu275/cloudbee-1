import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';

@Injectable()
export class ConsoleService {
    constructor(private socket: Socket) {

    }
    setCallback(cb) {
      this.socket.on('console', (data) => {
        cb(data);
      });
    }
}

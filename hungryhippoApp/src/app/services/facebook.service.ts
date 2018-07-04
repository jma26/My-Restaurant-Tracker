import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class FacebookService {
  // Observable string source
  private user = new Subject<any>();

  dataUser$ = this.user.asObservable();

  constructor() { }

  setName(name) {
    console.log('Facebook.service.ts pinging ' + name);
    this.user.next(name);
  }

}

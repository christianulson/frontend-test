import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { ITalk } from '../interfaces/iTalk';
import { BaseService } from './base.service';

@Injectable()
export class TalksService extends BaseService<ITalk> {
  private talkUrl = 'talk';

  constructor(public http: Http) { super(http); }

  getTalk(): Observable<ITalk> {
    return this.getBy(this.talkUrl);
  }
}

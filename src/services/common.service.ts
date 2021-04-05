import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  dataEntryEnableChanged = new Subject<boolean>();

  constructor() { }

  enableDisableDataEntryMode(enable: boolean) {
    this.dataEntryEnableChanged.next(enable);
  }


}

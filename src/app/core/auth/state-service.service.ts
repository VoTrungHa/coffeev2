import { Injectable } from '@angular/core';
import { SessionStorageService } from 'ngx-webstorage';
import { Subject } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class StateServiceService {
  private setlogin = new Subject<any>();
  public $setlogin = this.setlogin.asObservable();
  constructor(private $sessionStorage: SessionStorageService) {}
  setIslogin(bol: boolean) {
    this.setlogin.next(bol);
  }
  storeUrl(url: any) {
    this.$sessionStorage.store('previousUrl', url);
  }
  getUrl() {
    return this.$sessionStorage.retrieve('previousUrl');
  }
}

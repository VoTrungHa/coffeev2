import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { ACCOUNT } from "src/app/entity/accounts/account.model";
import { Auth } from "../guard.model";
import { LocalStorageService, SessionStorageService } from "ngx-webstorage";
import { ServiceService } from "src/app/service/service.service";
import { Router } from "@angular/router";

export interface MESSAGE {
  message: string;
}

@Injectable({
  providedIn: "root",
})
export class AccountServiceService {
  private error = new Subject<any>();
  public error$ = this.error.asObservable();
  constructor(
    private http: HttpClient,
    private $locationStorage: LocalStorageService,
    private $sessionStorage: SessionStorageService,
    private publicService: ServiceService,
    private router: Router
  ) {}

  sendError(error: string) {
    this.error.next(error);
  }
  login(accout: Auth) {
    this.http.get<ACCOUNT[]>("api/accounts").subscribe((data) => {
      const result = data.filter((item, index) => item.email === accout.email);
      if (result.length > 0) {
        if (result[0].password === accout.password) {
          let token = this.publicService.Makeid(100);
          this.authenticateSuccess(token);
        } else {
          this.sendError("Mật khẩu không hợp lệ !");
        }
      } else {
        this.sendError("Địa chỉ email không tồn tại");
      }
    });
  }
  authenticateSuccess(bearerToken: string): void {
    if (bearerToken) {
      this.$locationStorage.store("authenticationtoken", bearerToken);
      return;
    }
  }

  logout() {
    //remove our servise
    this.$locationStorage.clear("authenticationtoken");
    this.$sessionStorage.clear();
    this.router.navigate(["/login"]);
    sessionStorage.clear();
    localStorage.clear();
    window.location.reload();
  }
}

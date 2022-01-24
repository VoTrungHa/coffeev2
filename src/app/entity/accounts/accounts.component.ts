import { Component, OnInit } from "@angular/core";
import { ACCOUNT, CONTENTS_LIST_WIDTH } from "./account.model";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { AccountService } from "./account.service";
import { ToastrService } from "ngx-toastr";
import { AccountModalComponent } from "./account-modal/account-modal.component";
import { ServiceService } from "src/app/service/service.service";
import { ModalComponent } from "src/app/components/modal/modal.component";
import { CONTENTS_LIST_HEADER_ACC } from "src/app/constant";
import { NgxUiLoaderService } from "ngx-ui-loader";

@Component({
  selector: "app-accounts",
  templateUrl: "./accounts.component.html",
  styleUrls: ["./accounts.component.scss"],
})
export class AccountsComponent implements OnInit {
  Accounts: ACCOUNT[] = [];
  Account!: ACCOUNT;
  CONTENTS_LIST_WIDTH: CONTENTS_LIST_WIDTH[] = CONTENTS_LIST_HEADER_ACC;

  params: any = {
    current_page: 1,
    limit: 5,
    sort: "nickName",
    reverse: true,
    total_records: 0,
    delete_all:false
  };
  start = 0;
  end = 5;

  constructor(
    private accountService: AccountService,
    public dialog: MatDialog,
    private servicePublic: ServiceService,
    private toastr: ToastrService,
    private loadService: NgxUiLoaderService
  ) {}

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll() {
    this.loadService.start();
    this.accountService.getAccounts().subscribe((accounts) => {
      this.params.total_records = accounts.length;
      this.Accounts = accounts.slice(this.start, this.end);
    });
    this.loadService.stop();
  }
  paramsChange(e: any) {
    this.findStart();
    this.findEnd();
    this.loadAll();
  }

  handlDeleteMultiple() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      title: "Xóa tài khoản",
      message: "Bạn có muốn xóa tài những khoản này không?",
    };
    const dialogRef = this.dialog.open(ModalComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((data) => {
      if (data) {
        this.loadService.start();
        this.Accounts.map((account) => {
          if (account?.completed) {
            this.accountService.deleteAccount(account.id).subscribe();
          }
        });
        this.toastr.success("Thành công!", "Xóa người dùng");
        this.loadAll();
        this.params.delete_all=false;
        this.loadService.stop();
      }
    });
  }

  findStart() {
    this.start = (this.params.current_page - 1) * this.params.limit;
  }
  findEnd() {
    const result = this.params.current_page * this.params.limit;
    result > this.params.total_records
      ? (this.end = this.params.total_records)
      : (this.end = result);
  }
  sortAll(value: any) {
    this.params.current_page = 1;
    this.params.sort = value;
    this.loadAll();
  }

  handlSearch(value: any) {
    this.loadService.start();
    this.accountService.getAccounts().subscribe((accounts) => {
      this.Accounts = accounts.filter(
        (item, index) =>
          item.email.toLowerCase().indexOf(value.toLowerCase()) !== -1 ||
          item.role.toLowerCase().indexOf(value.toLowerCase()) !== -1 ||
          item.nickName.toLowerCase().indexOf(value.toLowerCase()) !== -1 ||
          item.phone.toLowerCase().indexOf(value.toLowerCase()) !== -1 ||
          item.gender.toLowerCase().indexOf(value.toLowerCase()) !== -1
      );
      this.params.total_records = this.Accounts.length;
      this.Accounts = this.Accounts.slice(this.start, this.end);
      this.loadService.stop();
    });
  }

  handlDeleteAccount(id: any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      title: "Xóa tài khoản",
      message: "Bạn có muốn xóa tài khoản này không?",
    };
    const dialogRef = this.dialog.open(ModalComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((data) => {
      if (data) {
        this.loadService.start();
        this.accountService.deleteAccount(id).subscribe((result) => {
          this.toastr.success("Thành công!", "Xóa người dùng");
          this.loadAll();
          this.loadService.stop();
        });
      }
    });
  }

  openDialog(account: ACCOUNT) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true; //user will able to close the dialog just by click outside
    dialogConfig.autoFocus = true; // meaning that the focus will be set automatically on the first form filde
    if (account) {
      dialogConfig.data = { title: "Updated account", account };
    } else {
      dialogConfig.data = { title: "Created account", account: null };
    }

    const dialogRef = this.dialog.open(AccountModalComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((data) => {
      if (account && data) {
        this.loadService.start();
        this.accountService.updateAccount(data).subscribe((result) => {
          this.toastr.success("Thành công!", "Cập nhật người dùng");
          this.loadAll();
          this.loadService.stop();
        });
      }
      if (data && !account) {
        this.loadService.start();
        data.id = this.servicePublic.Makeid(12);
        this.accountService.addAccount(data).subscribe((result) => {
          this.toastr.success("Thành công!", "Tạo người dùng!");
          this.loadAll();
          this.loadService.stop();
        });
      }
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { ACCOUNT, CONTENTS_LIST_WIDTH } from './account.model';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AccountService } from './account.service';
import { ToastrService } from 'ngx-toastr';
import { AccountModalComponent } from './account-modal/account-modal.component';
import { ServiceService } from 'src/app/service/service.service';
import { ModalComponent } from 'src/app/components/modal/modal.component';
import { CONTENTS_LIST_HEADER_ACC } from 'src/app/constant';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.scss'],
})
export class AccountsComponent implements OnInit {
  Accounts: ACCOUNT[] = [];
  Account!: ACCOUNT;
  CONTENTS_LIST_WIDTH: CONTENTS_LIST_WIDTH[] = CONTENTS_LIST_HEADER_ACC;
  params: any = {
    current_page: 1,
    limit: 5,
    sort: 'nickName',
    reverse: true,
    total_records: 0,
  };
  start = 0;
  end = 5;

  constructor(
    private accountService: AccountService,
    public dialog: MatDialog,
    private servicePublic: ServiceService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll() {
    this.accountService.getAccounts().subscribe((accounts) => {
      this.params.total_records = accounts.length;
      this.Accounts = accounts.slice(this.start, this.end);
    });
  }
  paramsChange(e: any) {
    this.findStart();
    this.findEnd();
    this.loadAll();
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
    });
  }

  handlDeleteAccount(id: any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      title: 'Xóa tài khoản',
      message: 'Bạn có muốn xóa tài khoản này không?',
    };
    const dialogRef = this.dialog.open(ModalComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((data) => {
      if (data) {
        this.accountService.deleteAccount(id).subscribe((result) => {
          this.toastr.success('Thành công!', 'Xóa người dùng');
          this.loadAll();
        });
      }
    });
  }

  openDialog(id: string) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true; //user will able to close the dialog just by click outside
    dialogConfig.autoFocus = true; // meaning that the focus will be set automatically on the first form filde
    if (id) {
      dialogConfig.data = { title: 'Updated account', id };
    } else {
      dialogConfig.data = { title: 'Created account', id: null };
    }
    dialogConfig.hasBackdrop = false;
    const dialogRef = this.dialog.open(AccountModalComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((data) => {
      if (id && data) {
        this.accountService.updateAccount(data).subscribe((result) => {
          this.toastr.success('Thành công!', 'Cập nhật người dùng');
          this.loadAll();
        });
      }
      if (data && !id) {
        data.id = this.servicePublic.Makeid(12);
        this.accountService.addAccount(data).subscribe((result) => {
          this.toastr.success('Thành công!', 'Tạo người dùng!');
          this.loadAll();
        });
      }
    });
  }
}

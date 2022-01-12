import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AccountService } from '../account.service';

@Component({
  selector: 'app-account-modal',
  templateUrl: './account-modal.component.html',
  styleUrls: ['./account-modal.component.scss'],
})
export class AccountModalComponent implements OnInit {
  AccountForm!: FormGroup;
  ROLES: Array<string> = ['USER', 'ADMIN'];
  isValidator: boolean = false;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { title: string; id: string },
    private dialogRef: MatDialogRef<AccountModalComponent>,
    private accountService: AccountService
  ) {
    this.AccountForm = new FormGroup({
      id: new FormControl(''),
      nickName: new FormControl('', [Validators.required]),
      gender: new FormControl('Nam', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      phone: new FormControl('', [Validators.required]),
      role: new FormControl('USER', [Validators.required]),
    });
  }
  ngOnInit(): void {
    if (this.data.id) {
      this.accountService.getAccountById(this.data.id).subscribe((data) => {
        this.AccountForm.get('nickName')?.setValue(data.nickName);
        this.AccountForm.get('id')?.setValue(data.id);
        this.AccountForm.get('role')?.setValue(data.role);
        this.AccountForm.get('phone')?.setValue(data.phone);
        this.AccountForm.get('gender')?.setValue(data.gender);
        this.AccountForm.get('email')?.setValue(data.email);
      });
    }
  }

  get nickName() {
    return this.AccountForm.get('nickName');
  }
  get phone() {
    return this.AccountForm.get('phone');
  }
  get role() {
    return this.AccountForm.get('role');
  }
  get gender() {
    return this.AccountForm.get('gender');
  }
  get email() {
    return this.AccountForm.get('email');
  }

  setValidator() {
    this.isValidator = true;
  }
  save() {
    this.dialogRef.close(this.AccountForm.value);
  }
  close() {
    this.dialogRef.close(null);
  }
}

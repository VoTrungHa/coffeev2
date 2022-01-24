import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ACCOUNT } from '../account.model';
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
    @Inject(MAT_DIALOG_DATA) public data: { title: string; account: ACCOUNT },
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
    if (this.data.account) {
      
        this.AccountForm.get('nickName')?.setValue(this.data.account.nickName);
        this.AccountForm.get('id')?.setValue(this.data.account.id);
        this.AccountForm.get('role')?.setValue(this.data.account.role);
        this.AccountForm.get('phone')?.setValue(this.data.account.phone);
        this.AccountForm.get('gender')?.setValue(this.data.account.gender);
        this.AccountForm.get('email')?.setValue(this.data.account.email);
        
      
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

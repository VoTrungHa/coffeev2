import { Component, Inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormArray,
  FormControl,
  Validators,
} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-coffee-modal',
  templateUrl: './coffee-modal.component.html',
  styleUrls: ['./coffee-modal.component.scss'],
})
export class CoffeeModalComponent implements OnInit {
  ProductForm: FormGroup;
  isValidator: boolean = false;
  Categorys: Array<string> = ['Cà phê', 'Giải khát', 'Nước suối', 'Sinh tố'];
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { title: string; id: string },
    private dialogRef: MatDialogRef<CoffeeModalComponent>,
    private fb: FormBuilder
  ) {
    this.ProductForm = this.fb.group({
      name: ['', Validators.required],
      category: ['', Validators.required],
      image: ['', Validators.required],
      attributes: this.fb.array([
        this.fb.group({
          size: ['', Validators.required],
          price: ['', Validators.required],
        }),
      ]),
    });
  }

  ngOnInit(): void {}

  get attributes() {
    return this.ProductForm.get('attributes') as FormArray;
  }
  get name() {
    return this.ProductForm.get('name');
  }
  get image() {
    return this.ProductForm.get('image');
  }
  get category() {
    return this.ProductForm.get('category');
  }
  addAliases() {
    this.attributes.push(
      this.fb.group({
        size: ['', Validators.required],
        price: ['', Validators.required],
      })
    );
  }
  save() {
    this.dialogRef.close(this.ProductForm.value);
  }
  close() {
    this.dialogRef.close(null);
  }
}

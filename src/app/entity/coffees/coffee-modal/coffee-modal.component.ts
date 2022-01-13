import { Component, Inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormArray,
  FormControl,
  Validators,
} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CoffeeService } from '../coffee.service';

@Component({
  selector: 'app-coffee-modal',
  templateUrl: './coffee-modal.component.html',
  styleUrls: ['./coffee-modal.component.scss'],
})
export class CoffeeModalComponent implements OnInit {
  ProductForm: FormGroup;
  isValidator: boolean = false;
  Categorys: Array<string> = ['Cà phê', 'Giải khát', 'Nước suối', 'Sinh tố'];
  Sizes: Array<string> = ['M', 'L', 'XL'];
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { title: string; id: string },
    private dialogRef: MatDialogRef<CoffeeModalComponent>,
    private fb: FormBuilder,
    private coffeeService: CoffeeService
  ) {
    this.ProductForm = this.fb.group({
      name: ['', Validators.required],
      id: [''],
      category: ['', Validators.required],
      image: ['', Validators.required],
      attributes: this.fb.array([
        this.fb.group({
          size: ['', Validators.required],
          price: ['', Validators.required],
        }),
      ]),
      descript: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    if (this.data.id) {
      this.coffeeService.getProductById(this.data.id).subscribe((data) => {
        this.ProductForm.get('name')?.setValue(data.name);
        this.ProductForm.get('id')?.setValue(data.id);
        this.ProductForm.get('descript')?.setValue(data.descript);
        this.ProductForm.get('image')?.setValue(data.image);
        this.ProductForm.get('category')?.setValue(data.category);
        this.attributes.removeAt(0);
        data.attributes.map((item) => {
          this.attributes.push(
            this.fb.group({
              size: item.size,
              price: item.price,
            })
          );
        });
      });
    }
    console.log(this.ProductForm.get('image'));
  }

  get attributes() {
    return this.ProductForm.get('attributes') as FormArray;
  }
  get name() {
    return this.ProductForm.get('name');
  }
  get descript() {
    return this.ProductForm.get('descript');
  }
  get image() {
    return this.ProductForm.get('image');
  }
  get category() {
    return this.ProductForm.get('category');
  }
  addAttr() {
    this.attributes.push(
      this.fb.group({
        size: ['', Validators.required],
        price: ['', Validators.required],
      })
    );
  }

  deleteAttr(index: number) {
    this.attributes.removeAt(index);
  }
  save() {
    console.log(this.ProductForm.value);
    this.dialogRef.close(this.ProductForm.value);
  }
  close() {
    this.dialogRef.close(null);
  }
}

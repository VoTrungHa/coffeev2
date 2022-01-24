import { Component, Inject, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  FormArray,
  FormControl,
  Validators,
} from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { PRODUCT } from "../coffee.model";
import { CoffeeService } from "../coffee.service";

@Component({
  selector: "app-coffee-modal",
  templateUrl: "./coffee-modal.component.html",
  styleUrls: ["./coffee-modal.component.scss"],
})
export class CoffeeModalComponent implements OnInit {
  ProductForm: FormGroup;
  isValidator: boolean = false;
  Categorys: Array<string> = ["Cà phê", "Giải khát", "Nước suối", "Sinh tố"];
  Sizes: Array<string> = ["M", "L", "XL"];
  isLoading: boolean = false;
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: { title: string;   product: PRODUCT },
    private dialogRef: MatDialogRef<CoffeeModalComponent>,
    private fb: FormBuilder,
    private coffeeService: CoffeeService
  ) {
    this.ProductForm = this.fb.group({
      name: ["", Validators.required],
      id: [""],
      category: ["", Validators.required],
      image: ["", Validators.required],
      attributes: this.fb.array([
        this.fb.group({
          size: ["", Validators.required],
          price: ["", Validators.required],
        }),
      ]),
      descript: ["", Validators.required],
    });
  }

  ngOnInit(): void {
    if (this.data.product) {
      this.ProductForm.get("name")?.setValue(this.data.product.name);
      this.ProductForm.get("id")?.setValue(this.data.product.id);
      this.ProductForm.get("descript")?.setValue(this.data.product.descript);
      this.ProductForm.get("image")?.setValue(this.data.product.image);
      this.ProductForm.get("category")?.setValue(this.data.product.category);
      this.attributes.removeAt(0);
      this.data.product.attributes.map((item) => {
        this.attributes.push(
          this.fb.group({
            size: item.size,
            price: item.price,
          })
        );
      });
    }
  }

  get attributes() {
    return this.ProductForm.get("attributes") as FormArray;
  }
  get name() {
    return this.ProductForm.get("name");
  }
  get descript() {
    return this.ProductForm.get("descript");
  }
  get image() {
    return this.ProductForm.get("image");
  }
  get category() {
    return this.ProductForm.get("category");
  }
  addAttr() {
    this.attributes.push(
      this.fb.group({
        size: ["", Validators.required],
        price: ["", Validators.required],
      })
    );
  }

  deleteAttr(index: number) {
    this.attributes.removeAt(index);
  }
  setValidator() {
    this.isValidator = true;
  }
  save() {
    console.log(this.ProductForm.value);
    this.dialogRef.close(this.ProductForm.value);
  }
  close() {
    this.dialogRef.close(null);
  }
}

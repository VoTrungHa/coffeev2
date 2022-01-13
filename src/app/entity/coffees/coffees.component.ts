import { Component, OnInit } from '@angular/core';
import { CONTENTS_LIST_HEADER_PRO } from 'src/app/constant';
import { CONTENTS_LIST_WIDTH, PRODUCT } from './coffee.model';
import { CoffeeService } from './coffee.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ModalComponent } from 'src/app/components/modal/modal.component';
import { ToastrService } from 'ngx-toastr';
import { ServiceService } from 'src/app/service/service.service';
import { CoffeeModalComponent } from './coffee-modal/coffee-modal.component';
@Component({
  selector: 'app-coffees',
  templateUrl: './coffees.component.html',
  styleUrls: ['./coffees.component.scss'],
})
export class CoffeesComponent implements OnInit {
  Products: PRODUCT[] = [];
  CONTENTS_LIST_WIDTH: CONTENTS_LIST_WIDTH[] = CONTENTS_LIST_HEADER_PRO;
  params: any = {
    current_page: 1,
    limit: 5,
    sort: 'name',
    reverse: true,
    total_records: 0,
  };
  start = 0;
  end = 5;

  constructor(
    private coffeeService: CoffeeService,
    private dialog: MatDialog,
    private toastr: ToastrService,
    private servicePublic: ServiceService
  ) {}
  loadAll() {
    this.coffeeService.getProduct().subscribe((products) => {
      products.map((item, index) => {
        var size = '';
        item.attributes.map((att, index) => {
          size += att.size + ' ';
        });
        item.size = size;
      });
      this.params.total_records = products.length;
      this.Products = products.slice(this.start, this.end);
    });
  }

  ngOnInit(): void {
    this.loadAll();
  }
  sortAll(value: Event) {
    this.params.current_page = 1;
    this.params.sort = value;
    this.loadAll();
  }

  openDialog(id: string) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true; //user will able to close the dialog just by click outside
    dialogConfig.autoFocus = true; // meaning that the focus will be set automatically on the first form filde
    if (id) {
      dialogConfig.data = { title: 'Updated Product', id };
    } else {
      dialogConfig.data = { title: 'Created Product', id: null };
    }
    dialogConfig.hasBackdrop = false;
    const dialogRef = this.dialog.open(CoffeeModalComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((data) => {
      if (id && data) {
        this.coffeeService.updateProduct(data).subscribe((result) => {
          this.toastr.success('Thành công!', 'Cập nhật sản phẩm');
          this.loadAll();
        });
      }
      if (data && !id) {
        data.id = this.servicePublic.Makeid(12);
        this.coffeeService.addProduct(data).subscribe((result) => {
          this.toastr.success('Thành công!', 'Tạo sản phẩm!');
          this.loadAll();
        });
      }
    });
  }
  handlSearch(value: any) {
    this.coffeeService.getProduct().subscribe((products) => {
      this.Products = products.filter((item, index) => {
        var size = '';
        item.attributes.map((att, index) => {
          // so attribute is array object price and size, so use map to get size to string
          size += att.size + ' ';
        });
        item.size = size;
        return (
          item.name.toLowerCase().indexOf(value.toLowerCase()) !== -1 ||
          item.category.toLowerCase().indexOf(value.toLowerCase()) !== -1 ||
          size.toLowerCase().indexOf(value.toLowerCase()) !== -1
        );
      });
      this.params.total_records = this.Products.length;
      this.Products = this.Products.slice(this.start, this.end);
    });
  }

  handlDeleteAccount(id: any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      title: 'Xóa sản phẩm',
      message: 'Bạn có muốn xóa sản phẩm này không?',
    };
    const dialogRef = this.dialog.open(ModalComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((data) => {
      if (data) {
        this.coffeeService.deleteProduct(id).subscribe((result) => {
          this.toastr.success('Thành công!', 'Xóa sản phẩm');
          this.loadAll();
        });
      }
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
}

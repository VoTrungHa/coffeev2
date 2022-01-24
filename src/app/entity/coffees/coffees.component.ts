import { Component, OnInit } from "@angular/core";
import { CONTENTS_LIST_HEADER_PRO } from "src/app/constant";
import { CONTENTS_LIST_WIDTH, PRODUCT } from "./coffee.model";
import { CoffeeService } from "./coffee.service";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { ModalComponent } from "src/app/components/modal/modal.component";
import { ToastrService } from "ngx-toastr";
import { ServiceService } from "src/app/service/service.service";
import { CoffeeModalComponent } from "./coffee-modal/coffee-modal.component";
import { NgxUiLoaderService } from "ngx-ui-loader";
@Component({
  selector: "app-coffees",
  templateUrl: "./coffees.component.html",
  styleUrls: ["./coffees.component.scss"],
})
export class CoffeesComponent implements OnInit {
  Products: PRODUCT[] = [];
  CONTENTS_LIST_WIDTH: CONTENTS_LIST_WIDTH[] = CONTENTS_LIST_HEADER_PRO;
  params: any = {
    current_page: 1,
    limit: 5,
    sort: "name",
    reverse: true,
    total_records: 0,
    delete_all: false,
  };
  start = 0;
  end = 5;
  is: boolean = true;

  constructor(
    private coffeeService: CoffeeService,
    private dialog: MatDialog,
    private toastr: ToastrService,
    private servicePublic: ServiceService,
    private loadService: NgxUiLoaderService
  ) {}
  loadAll() {
    this.loadService.start();
    this.coffeeService.getProduct().subscribe((products) => {
      products.map((item, index) => {
        var size = "";
        item.attributes.map((att, index) => {
          size += att.size + " ";
        });
        item.size = size;
      });
      this.params.total_records = products.length;
      this.Products = products.slice(this.start, this.end);
    });
    this.loadService.stop();
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
        this.Products.map((account) => {
          if (account?.completed) {
            this.coffeeService.deleteProduct(account.id).subscribe();
            this.params.delete_all = false;
          }
        });
        this.toastr.success("Thành công!", "Xóa người dùng");
        this.loadAll();
        this.loadService.stop();
      }
    });
  }

  ngOnInit(): void {
    this.loadAll();
  }
  sortAll(value: Event) {
    this.loadService.start();
    this.params.current_page = 1;
    this.params.sort = value;
    this.loadAll();
    this.loadService.stop();
  }

  async openDialog(product: PRODUCT) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true; //user will able to close the dialog just by click outside
    dialogConfig.autoFocus = true; // meaning that the focus will be set automatically on the first form filde
    if (product) {
      dialogConfig.data = { title: "Updated Product", product };
    } else {
      dialogConfig.data = { title: "Created Product", data: null };
    }

    const dialogRef = await this.dialog.open(
      CoffeeModalComponent,
      dialogConfig
    );
    dialogRef.afterClosed().subscribe((data) => {
      if (product && data) {
        this.loadService.start();
        this.coffeeService.updateProduct(data).subscribe((result) => {
          this.toastr.success("Thành công!", "Cập nhật sản phẩm");
        });
        this.loadAll();
        this.loadService.stop();
      }
      if (data && !product) {
        this.loadService.start();
        data.id = this.servicePublic.Makeid(12);
        this.coffeeService.addProduct(data).subscribe((result) => {
          this.toastr.success("Thành công!", "Tạo sản phẩm!");
        });
        this.loadAll();
        this.loadService.stop();
      }
    });
  }
  handlSearch(value: any) {
    this.loadService.start();
    this.coffeeService.getProduct().subscribe((products) => {
      this.Products = products.filter((item, index) => {
        var size = "";
        item.attributes.map((att, index) => {
          // so attribute is array object price and size, so use map to get size to string
          size += att.size + " ";
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
      this.loadService.stop();
    });
  }

  handlDeleteAccount(id: any) {
    const dialogConfig = new MatDialogConfig();
    // dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      title: "Xóa sản phẩm",
      message: "Bạn có muốn xóa sản phẩm này không?",
    };
    const dialogRef = this.dialog.open(ModalComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((data) => {
      if (data) {
        this.loadService.start();
        this.coffeeService.deleteProduct(id).subscribe((result) => {
          this.toastr.success("Thành công!", "Xóa sản phẩm");
          this.loadService.stop();
          this.loadAll();
        });
      }
    });
  }
  paramsChange(e: any) {
    this.loadService.start();
    this.findStart();
    this.findEnd();
    this.loadAll();
    this.loadService.stop();
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

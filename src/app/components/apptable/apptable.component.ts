import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { CONTENTS_LIST_WIDTH } from "src/app/entity/accounts/account.model";
import { FormControl } from "@angular/forms";

interface Subtasks {
  id: string;
  completed: boolean;
}

@Component({
  selector: "app-apptable",
  templateUrl: "./apptable.component.html",
  styleUrls: ["./apptable.component.scss"],
})
export class ApptableComponent implements OnInit {
  @Input() params!: any;
  @Input() data!: any;
  @Output() paramsChange = new EventEmitter();
  @Input() CONTENTS_LIST_WIDTH: CONTENTS_LIST_WIDTH[] = [];
  @Output() sortAll = new EventEmitter();
  @Output() modal = new EventEmitter();
  @Output() delete = new EventEmitter();

  bio = new FormControl(false);
  allComplete: boolean = false;
  subtasks: Subtasks[] = [];
  constructor() {}

  ngOnInit(): void {}

  setAll(completed: boolean) {
    this.params.delete_all = completed;
    this.data.forEach((t: any) => (t.completed = completed));
  }

  updateAllComplete() {
    this.params.delete_all =
      this.data != null && this.data.every((t: any) => t.completed);
  }

  someComplete(): boolean {
    if (this.subtasks == null) {
      return false;
    }
    return (
      this.subtasks.filter((t) => t.completed).length > 0 && !this.params.delete_all
    );
  }

  public handlePage(e: any) {
    this.params.current_page = e.pageIndex + 1;
    this.params.limit = e.pageSize;
    this.paramsChange.emit(this.params);
  }
  public sortName(key: string) {
    this.params.sort = key;
    this.params.reverse = !this.params.reverse;
    this.sortAll.emit(this.params);
  }
  public OpenModal(id: string) {
    this.modal.emit(id);
  }
  public handlDelete(id: string) {
    this.delete.emit(id);
  }
}

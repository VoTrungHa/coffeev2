import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CONTENTS_LIST_WIDTH } from 'src/app/entity/accounts/account.model';

@Component({
  selector: 'app-apptable',
  templateUrl: './apptable.component.html',
  styleUrls: ['./apptable.component.scss'],
})
export class ApptableComponent implements OnInit {
  @Input() params!: any;
  @Input() data!: any;
  @Output() paramsChange = new EventEmitter();
  @Input() CONTENTS_LIST_WIDTH: CONTENTS_LIST_WIDTH[] = [];
  @Output() sortAll = new EventEmitter();
  @Output() modal = new EventEmitter();
  @Output() delete = new EventEmitter();
  constructor() {
    console.log(this.data);
  }

  ngOnInit(): void {}

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

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  @Output() search = new EventEmitter();
  @Output() modal = new EventEmitter();
  @Input() title!: string;
  @Output() delete=new EventEmitter();
  @Input() params:any;
  valueSearch: string = '';
  constructor() {}

  ngOnInit(): void {
    console.log(this.title)
  }

  handlSearch(value: string) {
    this.search.emit(value);
  }

  OpenModalAdd() {
    this.modal.emit(null);
  }

  OpenModalDelete(){
    this.delete.emit();
  }
}

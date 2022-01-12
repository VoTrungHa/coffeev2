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
  valueSearch: string = '';
  constructor() {}

  ngOnInit(): void {}

  handlSearch(value: string) {
    this.search.emit(value);
  }

  OpenModalAdd() {
    this.modal.emit(null);
  }
}

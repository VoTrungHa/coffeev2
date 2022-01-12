import { Component, OnInit } from '@angular/core';
import { faUserCircle, faMugHot } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss'],
})
export class SliderComponent implements OnInit {
  menus = [
    {
      icon: faUserCircle,
      path: '/accounts',
    },
    {
      icon: faMugHot,
      path: '/coffees',
    },
  ];
  constructor() {}

  ngOnInit(): void {}
}

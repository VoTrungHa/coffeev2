import { Component } from '@angular/core';

import { StateServiceService } from './core/auth/state-service.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  isLogin: boolean = false;
  constructor(private stateServiceService: StateServiceService) {}
  ngOnInit(): void {
    this.stateServiceService.$setlogin.subscribe((result) => {
      this.isLogin = result;
    });
  }
}

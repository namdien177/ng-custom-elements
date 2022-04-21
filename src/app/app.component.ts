import {Component} from '@angular/core';
import {SELECT_CONTAINER_POSITION} from "./libs/om-select/const/position.const";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angular-custom-components';

  readonly POSITION_OVERLAY = SELECT_CONTAINER_POSITION;

  testParam = 2;

  log(param: unknown) {
    console.log(param);
  }

  updateParam() {
    this.testParam++;
  }
}

import {Injectable} from '@angular/core';
import {ISelectItem} from '../interfaces/select-item.interface';
import {SELECT_CONTAINER_POSITION} from "../const/position.const";
import {ISelectUiService, PositionOverlay} from "../interfaces/select-ui-service.interface";

@Injectable()
export class SelectUiService<T> implements ISelectUiService<T> {
  disabled: boolean = false;
  options: ISelectItem<T>[] = [];
  focused?: ISelectItem<T>;

  position: SELECT_CONTAINER_POSITION = SELECT_CONTAINER_POSITION.right_bottom;

  private _selected?: ISelectItem<T>;

  get selected() {
    return this._selected
  }

  set selected(element: ISelectItem<T> | undefined) {
    this._selected = element;
    this.focused = element;
  }

  get overlayConfig() {
    switch (this.position) {
      case SELECT_CONTAINER_POSITION.left_bottom:
        return POS_LEFT_BOTTOM;
      case SELECT_CONTAINER_POSITION.right_bottom:
        return POS_RIGHT_BOTTOM;
    }
  }
}

const POS_RIGHT_BOTTOM: PositionOverlay = {
  originX: 'end',
  originY: 'bottom',
  overlayX: 'end',
  overlayY: 'top'
}

const POS_LEFT_BOTTOM: PositionOverlay = {
  originX: 'start',
  originY: 'bottom',
  overlayX: 'start',
  overlayY: 'top'
}

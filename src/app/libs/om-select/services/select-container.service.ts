import {Inject, Injectable} from '@angular/core';
import {KEY_ACCESSIBILITY} from "../const/accessibility.enum";
import {ISelectItem} from "../interfaces/select-item.interface";
import {SelectUiModel} from "../model/select-ui.model";
import {SelectUiService} from "./select-ui.service";
import {ISelectService} from "../interfaces/select-service.interface";
import {ISelectContainerComponent} from "../interfaces/select-container.interface";

@Injectable()
export class SelectContainerService<T> implements ISelectService<T> {
  constructor(@Inject(SelectUiService) private ui: SelectUiModel<T>) {
  }

  private _container!: ISelectContainerComponent<T>;

  get container() {
    return this._container;
  }

  register(container: ISelectContainerComponent<T>) {
    this._container = container;
  }

  onKeyAccessibilityChanged(keyType: KEY_ACCESSIBILITY) {
    if (!(keyType === KEY_ACCESSIBILITY.UP || keyType === KEY_ACCESSIBILITY.DOWN)) {
      // we only consider key up and down
      return;
    }
    const focusedItem = this.ui.focused;
    if (!focusedItem) {
      return;
    }
    const dropdownItems = this.ui.options;
    const startIndex = dropdownItems.findIndex(s => s.value === focusedItem.value);
    const indexRotate = this.rotationKey(startIndex, keyType === KEY_ACCESSIBILITY.UP ? this.DECREMENT_INDEX : this.INCREMENT_INDEX, dropdownItems);
    if (indexRotate !== null) {
      this.ui.focused = dropdownItems[indexRotate];
    }
  }

  private readonly INCREMENT_INDEX = (start: number) => start + 1;

  private readonly DECREMENT_INDEX = (start: number) => start - 1;

  /**
   * Find the next suitable item in the list.
   * @param startIndex current selected index
   * @param nextIndexFn move direction, should increment or decrement by 1 index.
   * @param list
   * @private
   */
  private rotationKey(startIndex: number, nextIndexFn: (currentIndex: number) => number, list: ISelectItem<T>[]) {
    const totalItems = list.length;
    let endIndex: number;
    let pivot = startIndex;

    const nextIndex = nextIndexFn(startIndex);
    if (nextIndex < startIndex) {
      endIndex = this.INCREMENT_INDEX(startIndex);
    } else {
      endIndex = this.DECREMENT_INDEX(startIndex);
    }
    while (pivot !== endIndex) {
      pivot = nextIndexFn(pivot);
      if (pivot < 0) {
        pivot = totalItems - 1;
      } else if (pivot > totalItems - 1) {
        pivot = 0;
      }

      const itemAt = list[pivot];
      if (itemAt == null) {
        return null;
      }
      if (!itemAt.disabled) {
        return pivot;
      }
    }
    return null;
  }
}

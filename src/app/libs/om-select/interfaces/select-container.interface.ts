import {ISelectItem} from './select-item.interface';
import {QueryList} from "@angular/core";

export interface ISelectContainerComponent<T> {
  selectedItem?: ISelectItem<T>;
  focusedItem?: ISelectItem<T>;
  readonly dropdownItems: QueryList<ISelectItem<T>>;
  readonly anchorRef: HTMLElement;
  showing: boolean;
  value: T | null;
  readonly width: number;
  selectOption: (item: ISelectItem<T>, ...args: any) => void;

  show: () => void;
  close: () => void;

  /**
   * Set the focus item as the selected item.
   * @private
   */
  initDefaultItem: () => void;

  /**
   * @protected
   * @param $event
   */
  onKeyboardAction: ($event: KeyboardEvent) => void;

  /**
   * @private
   */
  syncWidth: () => void;

  ngOnDestroy: () => void;
}


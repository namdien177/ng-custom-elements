import {ISelectItem} from "../interfaces/select-item.interface";
import {Directive, QueryList} from "@angular/core";
import {ISelectContainerComponent} from "../interfaces/select-container.interface";
import {ControlValueAccessor} from "@angular/forms";

@Directive()
export abstract class SelectContainerCore<T> implements ISelectContainerComponent <T>, ControlValueAccessor {
  abstract selectedItem?: ISelectItem<T>;
  abstract focusedItem?: ISelectItem<T>;
  public readonly dropdownItems!: QueryList<ISelectItem<T>>;
  public abstract anchorRef: HTMLElement;

  /**
   * Inner data
   * @protected
   */
  protected data!: T | null;

  private _showing: boolean = false;

  public get showing() {
    return this._showing;
  }

  protected set showing(value: boolean) {
    this._showing = value;
  }

  get value(): T | null {
    return this.data;
  }

  set value(v: T | null) {
    if (v !== undefined && this.data !== v) {
      this.data = v;
      this.onChange(v);
      this.onTouch(v);
      this.initDefaultItem();
    }
  }

  private _width: () => number = () => this.anchorRef.getBoundingClientRect().width;

  get width() {
    return this._width();
  }

  set width(sizePx: number) {
    this._width = () => sizePx;
  }

  writeValue(value: T) {
    this.value = value;
  }

  onChange: any = () => {
  }

  onTouch: any = () => {
  }

  // upon UI element value changes, this method gets triggered
  registerOnChange(fn: any) {
    this.onChange = fn
  }

  registerOnTouched(fn: any) {
    this.onTouch = fn
  }

  abstract selectOption(item: ISelectItem<T>, ...args: any): void;

  ngOnDestroy() {
    if (this.showing) {
      this.close();
    }
  }

  abstract show(): void;

  abstract close(): void;

  /**
   * Set the focus item as the selected item.
   * @private
   */
  initDefaultItem() {
    if (!this.selectedItem && (this.value === null || this.value === undefined)) {
      return;
    }
    this.selectedItem = this.dropdownItems.find(item => item.value === this.value);
    this.focusedItem = this.selectedItem;
  }

  abstract onKeyboardAction($event: KeyboardEvent): void;

  abstract syncWidth(): void;
}

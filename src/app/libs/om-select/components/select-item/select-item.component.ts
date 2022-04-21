import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  forwardRef,
  HostBinding,
  HostListener,
  Inject,
  Input,
  SkipSelf
} from '@angular/core';
import {SELECT_ITEM_TOKEN} from "../../const/select.token";
import {ISelectItem} from "../../interfaces/select-item.interface";
import {SelectContainerService} from "../../services/select-container.service";
import {ISelectService} from "../../interfaces/select-service.interface";
import {Observable} from "rxjs";
import {DestroyService} from "../../../services/destroy.service";
import {SelectUiService} from "../../services/select-ui.service";
import {uuid} from "../../../utilities/uuid.helper";
import {ISelectUiService} from "../../interfaces/select-ui-service.interface";

@Component({
  selector: 'app-select-item',
  templateUrl: './select-item.component.html',
  styleUrls: ['./select-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{provide: SELECT_ITEM_TOKEN, useExisting: forwardRef(() => SelectItemComponent)}, DestroyService]
})
export class SelectItemComponent<T> implements ISelectItem<T> {

  @Input()
  disabled: boolean = false;

  @Input()
  value!: T | null;

  private _index = uuid();

  constructor(
    @Inject(SelectContainerService) private service: ISelectService<T>,
    @Inject(ElementRef) private ref: ElementRef<HTMLElement>,
    @Inject(DestroyService) private d$: Observable<void>,
    @Inject(SelectUiService) @SkipSelf() private ui: ISelectUiService<T>
  ) {
  }

  @HostBinding('class.disabled')
  get selectDisabled() {
    return this.disabled || this.ui.disabled;
  }

  @HostBinding('class.selected')
  public get selected(): boolean {
    return this.ui.selected === this;
  }

  @HostBinding('class.focused')
  public get focused(): boolean {
    return this.ui.focused === this;
  }

  get id() {
    return this._index;
  }

  @Input()
  set id(value: string) {
    this._index = value;
  }

  @HostListener('click', ['$event'])
  public onClick(event: UIEvent) {
    event.preventDefault();
    event.stopPropagation();

    if (this.disabled) {
      return;
    }
    this.service.container.selectOption(this);
  }
}

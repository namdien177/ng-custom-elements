import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChildren,
  forwardRef,
  HostListener,
  Inject,
  Input,
  QueryList,
  ViewChild
} from '@angular/core';
import {Overlay, OverlayConfig, OverlayRef} from '@angular/cdk/overlay';
import {Observable, takeUntil} from "rxjs";
import {NG_VALUE_ACCESSOR} from "@angular/forms";
import {CdkPortal, TemplatePortal} from '@angular/cdk/portal';
import {ISelectItem} from "../../interfaces/select-item.interface";
import {SelectContainerService} from "../../services/select-container.service";
import {ISelectService} from "../../interfaces/select-service.interface";
import {SelectUiService} from "../../services/select-ui.service";
import {SELECT_CONTAINER_TOKEN, SELECT_ITEM_TOKEN} from "../../const/select.token";
import {KEY_ACCESSIBILITY} from "../../const/accessibility.enum";
import {SelectContainerCore} from "../../implementation/select-container.core";
import {DestroyService} from "../../../services/destroy.service";
import {ISelectUiService} from "../../interfaces/select-ui-service.interface";
import {SELECT_CONTAINER_POSITION} from "../../const/position.const";

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {provide: SELECT_CONTAINER_TOKEN, useExisting: forwardRef(() => SelectComponent)},
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectComponent),
      multi: true
    },
    DestroyService,
    SelectContainerService,
    SelectUiService
  ],
  styles: [`:host {
    display: none
  }`]
})
export class SelectComponent<T> extends SelectContainerCore<T> {
  /** Get all item that passed to this component through ng-content */
  @ViewChild(CdkPortal, {static: false})
  public contentTemplate!: TemplatePortal<unknown>;

  @ContentChildren(SELECT_ITEM_TOKEN, {descendants: true})
  override dropdownItems!: QueryList<ISelectItem<T>>;

  @Input()
  anchorRef!: HTMLElement;

  /** Reference to Angular Overlay */
  private _overlayRef?: OverlayRef;

  constructor(
    @Inject(SelectContainerService) private service: ISelectService<T | null>,
    @Inject(SelectUiService) public ui: ISelectUiService<T>,
    @Inject(ChangeDetectorRef) private cd: ChangeDetectorRef,
    @Inject(DestroyService) private d$: Observable<void>,
    /**
     * Depending on CDK we are using, we can swap this overlay service with other that have similar functionality.
     */
    @Inject(Overlay) private _overlay: Overlay,
  ) {
    super();
    this.service.register(this);
  }

  @Input()
  set position(pos: SELECT_CONTAINER_POSITION) {
    this.ui.position = pos;
  }

  @Input()
  override set width(value: number) {
    super.width = value;
  }

  get focusedItem() {
    return this.ui.focused;
  }

  set focusedItem(item: ISelectItem<T> | undefined) {
    this.ui.focused = item;
  }

  get selectedItem() {
    return this.ui.selected;
  }

  set selectedItem(item: ISelectItem<T> | undefined) {
    this.ui.selected = item;
    this.ui.focused = item;
  }

  ngAfterViewInit() {
    this.ui.options = this.dropdownItems.toArray();
  }

  selectOption(item: ISelectItem<T>, ...args: any): void {
    if (item.disabled) {
      return;
    }
    if (item !== this.selectedItem) {
      this.value = item.value;
    }
    this.close();
  }

  close(): void {
    if (this._overlayRef) {
      this._overlayRef.detach();
    }
    this.showing = false;
  }

  show(): void {
    this._overlayRef = this._overlay.create(this.getOverlayConfig());
    this._overlayRef.attach(this.contentTemplate);
    this.syncWidth();
    this._overlayRef
      .backdropClick()
      .pipe(takeUntil(this.d$))
      .subscribe(() => this.close());
    this.showing = true;
    if (document.activeElement && typeof (document.activeElement as HTMLElement)['blur'] === "function") {
      (document.activeElement as HTMLElement).blur();
    }
  }


  @HostListener('window:resize')
  public onWinResize() {
    this.syncWidth();
  }

  override syncWidth() {
    if (!this._overlayRef) {
      return;
    }

    this._overlayRef.updateSize({width: this.width});
    this.cd.detectChanges();
  }

  @HostListener('document:keydown', ['$event'])
  override onKeyboardAction(event: KeyboardEvent) {
    if (!this.showing) {
      return;
    }
    event.preventDefault();

    if (event.key === KEY_ACCESSIBILITY.ENTER) {
      if (!this.focusedItem) {
        return this.selectOption(this.dropdownItems.first);
      }
      return this.selectOption(this.focusedItem);
    }

    if (event.key === KEY_ACCESSIBILITY.ESC) {
      return this.close();
    }

    if (event.key === KEY_ACCESSIBILITY.DOWN || event.key === KEY_ACCESSIBILITY.UP) {
      this.service.onKeyAccessibilityChanged(event.key);
      this.cd.detectChanges();
    }
  }

  private getOverlayConfig(): OverlayConfig {
    const positionStrategy = this._overlay
      .position()
      .flexibleConnectedTo(this.anchorRef)
      .withPush(false)
      .withPositions([
        this.ui.overlayConfig
      ]);

    const scrollStrategy = this._overlay.scrollStrategies.reposition();

    return new OverlayConfig({
      positionStrategy,
      scrollStrategy,
      hasBackdrop: true,
      backdropClass: 'cdk-overlay-transparent-backdrop'
    });
  }
}

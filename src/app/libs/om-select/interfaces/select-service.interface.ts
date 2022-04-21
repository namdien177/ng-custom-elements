import {ISelectContainerComponent} from "./select-container.interface";
import {KEY_ACCESSIBILITY} from "../const/accessibility.enum";

export interface ISelectService<T> {
  readonly container: ISelectContainerComponent<T>;
  register: (container: ISelectContainerComponent<T>) => void
  onKeyAccessibilityChanged: (moveType: KEY_ACCESSIBILITY) => void;
}

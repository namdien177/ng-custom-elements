import {ISelectItem} from '../interfaces/select-item.interface';
import {SELECT_CONTAINER_POSITION} from "../const/position.const";

export type SelectUiModel<T> = {
  disabled?: boolean;
  selected?: ISelectItem<T>;
  focused?: ISelectItem<T>;
  options: ISelectItem<T>[];
  position: SELECT_CONTAINER_POSITION
};

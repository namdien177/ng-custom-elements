import {SelectDataModel} from '../model/select-data.model';

export type ISelectItem<T = unknown> = {
  disabled?: boolean;
  selected: boolean;
  focused: boolean;

  onClick: ($event: UIEvent) => void;
} & SelectDataModel<T>;

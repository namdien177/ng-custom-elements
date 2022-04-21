import {SelectUiModel} from "../model/select-ui.model";
import {SELECT_CONTAINER_POSITION} from "../const/position.const";

export interface PositionOverlay {
  originX: "start" | "center" | "end"
  originY: "center" | "top" | "bottom"
  overlayX: "start" | "center" | "end"
  overlayY: "center" | "top" | "bottom"
}

export type ISelectUiService<T> = {
  position: SELECT_CONTAINER_POSITION,

  overlayConfig: PositionOverlay
} & SelectUiModel<T>

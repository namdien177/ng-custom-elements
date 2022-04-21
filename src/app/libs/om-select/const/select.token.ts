import {InjectionToken} from '@angular/core';
import {ISelectItem} from '../interfaces/select-item.interface';
import {ISelectContainerComponent} from "../interfaces/select-container.interface";

export const SELECT_CONTAINER_TOKEN = new InjectionToken<ISelectContainerComponent<unknown>>("Injection Token for simple Dropdown Container")

export const SELECT_ITEM_TOKEN = new InjectionToken<ISelectItem>('Injection Token for simple Dropdown Item');

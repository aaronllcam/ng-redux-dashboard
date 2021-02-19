import { createAction, props } from '@ngrx/store';
import { IngresoEgreso } from './../models/ingreso-egreso.model';

export const unSetItems = createAction('[Counter Component] unSetItems');
export const setItems = createAction(
    '[Counter Component] setItems',
    props<{ items: IngresoEgreso[] }>()    
);
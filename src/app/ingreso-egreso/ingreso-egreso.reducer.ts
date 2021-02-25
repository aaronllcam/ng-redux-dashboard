import { createReducer, on } from '@ngrx/store';
import { setItems, unSetItems } from './ingreso-egreso.actions';
import { IngresoEgreso } from './../models/ingreso-egreso.model';
import { AppState } from '../app.reducer';

export interface State {
    items: IngresoEgreso[]; 
}

//creamos est ainterfaz AppStateWithIngreso por el tema del lazy load, ya que en la propiedad en el appstate original no estaria disponoble por el tema del lazy load
//en algunas vistas ya que dicha propiedad no estaria disponible
export interface AppStateWithIngreso extends AppState {
    ingresosEgresos: State;
}

export const initialState: State = {
   items: [],
}

const _ingresoEgresoReducer = createReducer(initialState,

    on(unSetItems, state => ({ ...state, items: [] })),
    on(setItems, (state, { items }) => ({ ...state, items: [...items] })),

);

export function ingresoEgresoReducer(state, action) {
    return _ingresoEgresoReducer(state, action);
}
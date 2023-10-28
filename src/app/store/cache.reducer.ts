import { createReducer, on } from '@ngrx/store';
import { setCacheData, updateCacheData } from './cache.actions';
import { List_Category } from '../contracts/category/list_category';
import { List_Product } from '../contracts/list_product';

export interface CacheState {
  products: List_Product[];
  categories: List_Category[];
}
export interface AppState {
  cache: CacheState;
}

export const initialCacheState: CacheState = {
  products: null,
  categories: null,
};

export const cacheReducer = createReducer(
  initialCacheState,
  on(setCacheData, (state, { key, data }) => ({ ...state, [key]: data })),
  on(updateCacheData, (state, { key, updatedData }) => {
    const currentData = state[key];
    const mergedData = { ...currentData, ...updatedData };
    return { ...state, [key]: mergedData };
  })
);

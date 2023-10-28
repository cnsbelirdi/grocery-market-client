import { createAction, props } from '@ngrx/store';

export const setCacheData = createAction(
  '[Cache] Set Cache Data',
  props<{ key: string; data: any }>()
);
export const updateCacheData = createAction(
  '[Cache] Update Cache Data',
  props<{ key: string; updatedData: any }>()
);

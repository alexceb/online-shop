import { ActionNames } from '../actions/constants';

interface EnableAction {
  type: typeof ActionNames.ENABLE_LOADER
  payload: boolean
}

interface DisableAction {
  type: typeof ActionNames.DISABLE_LOADER
  payload: boolean
}

export type LoaderActions = EnableAction | DisableAction;

export const enableLoader = (): EnableAction => ({
  type: ActionNames.ENABLE_LOADER,
  payload: true,
}); 

export const disableLoader = (): DisableAction => ({
  type: ActionNames.DISABLE_LOADER,
  payload: false,
});

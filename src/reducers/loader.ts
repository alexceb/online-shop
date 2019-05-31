import { ActionNames } from '../actions/constants';
import { LoaderActions } from '../actions/loader';

interface LoaderState {
  isLoading: boolean
}

const initialState: LoaderState = {
  isLoading: true,
};

export const detailsReducer = (state = initialState, action: LoaderActions): LoaderState => {
  switch(action.type) {
    case(ActionNames.ENABLE_LOADER):
      return {
        ...state,
        isLoading: action.payload
      }
    case(ActionNames.DISABLE_LOADER):
      return {
        ...state,
        isLoading: action.payload
      }
    default:
      return state;
  }
}

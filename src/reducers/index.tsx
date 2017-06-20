import { LoadTagsAction } from '../actions/index';
import { StoreState } from '../types/index';
import { LOAD_TAGS } from '../constants/index';

export function loadTags(state: StoreState, action: LoadTagsAction): StoreState {
  switch (action.type) {
    case LOAD_TAGS:
      const now = new Date().toLocaleTimeString();
      return {
        ...state, steps: [
          { tag: 'one', description: `Step 1 (${now})` },
          { tag: 'two', description: `Step 2 (${now})` }
        ]
      };
    default: return state;
  }
}
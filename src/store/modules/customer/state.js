import {
  INITIAL_ACTION_STATE,
  INITIAL_ACTION_STATE_NEW,
} from '../../../helper/constants'

export default {
  list: [],
  actions: {
    getAll: { ...INITIAL_ACTION_STATE },
    fetch: { ...INITIAL_ACTION_STATE_NEW },
    create: { ...INITIAL_ACTION_STATE },
  },
}

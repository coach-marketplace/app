import { INITIAL_ACTION_STATE } from '../../../helper/constants'

export default {
  listByConversationId: {},
  actions: {
    getAllFromConversation: { ...INITIAL_ACTION_STATE },
    postMessage: { ...INITIAL_ACTION_STATE },
  },
}

import { INITIAL_ACTION_STATE_NEW } from '../../../helper/constants'

export default {
  coachProfile: null,
  actions: {
    createCoachProfile: { ...INITIAL_ACTION_STATE_NEW },
    fetchCoachProfile: { ...INITIAL_ACTION_STATE_NEW },
    updateCoachProfile: { ...INITIAL_ACTION_STATE_NEW },
  },
}

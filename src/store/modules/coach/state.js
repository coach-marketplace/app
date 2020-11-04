import { INITIAL_ACTION_STATE_NEW } from '../../../helper/constants'

export default {
  coachProfile: null,
  actions: {
    getCoachProfile: { ...INITIAL_ACTION_STATE_NEW },
    updateCoachProfile: { ...INITIAL_ACTION_STATE_NEW },
  },
}

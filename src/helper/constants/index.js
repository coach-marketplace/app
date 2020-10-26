export {
  ACTION_TYPE,
  INITIAL_ACTION_STATE,
  INITIAL_ACTION_STATE_NEW,
} from './store'

export {
  COLOR,
  SIZE,
  SIZES,
  Z_INDEX,
  BREAKPOINT,
  SPACER,
  SPACERS,
  LAYOUT,
  MEDIA_QUERY,
} from './style'

export const LOCALE = {
  EN_US: 'en-US',
  FR_FR: 'fr-FR',
}

export const LOCALES = Object.values(LOCALE)

export const GENDER = {
  MALE: 'male',
  FEMALE: 'female',
  OTHER: 'other',
  NOT_SAY: 'not-say',
}

export const GENDERS = Object.values(GENDER)

export const USER_ACCOUNT_TYPE = {
  LOCAL: 'local',
  GOOGLE: 'google',
  FACEBOOK: 'facebook',
}

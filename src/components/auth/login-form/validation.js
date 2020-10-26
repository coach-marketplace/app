import * as Yup from 'yup'

export default Yup.object({
  email: Yup.string().email('Invalid email address').required('Required'),
  password: Yup.string()
    .min(6, 'Password should have at least 6 characters')
    .required('Required'),
})

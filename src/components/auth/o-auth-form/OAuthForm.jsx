import React from 'react'
import PropTypes from 'prop-types'
import queryString from 'query-string'
import { withRouter } from 'react-router-dom'

import { Button, Pane, Image, Text } from '../../ui'
import googleIcon from '../../../assets/images/icons/icon-google.png'

/**
 * Get Filtered Query String
 *
 * When we redirect to the backend endpoint to connect with OAuth, we send
 * the url containing the query string, but if we allow everything, the user
 * can introduce data. To control that, we filter query string and only send
 * the requestUrl.
 * It also prevent to send the token and have some conflict
 *
 * @param {string} search Search part of the url
 * @return {string} The allowed queryString for the login with OAuth
 */
const getFilteredQueryString = (search) => {
  const parsed = queryString.parse(search)
  const filtered = {}
  parsed.requestUri && (filtered.requestUri = parsed.requestUri)

  const qs = queryString.stringify(filtered)

  return qs ? `?${qs}` : ''
}

const OAuthForm = ({ location, title }) => {
  const onLoginWithGoogle = () => {
    const { pathname, search } = location
    /**
     * Don't forget to remove the last `/` from the base url
     */
    const completeCurrentUrl = `${process.env.REACT_APP_BASE_URL.slice(
      0,
      -1,
    )}${pathname}${getFilteredQueryString(search)}`

    window.location = `${process.env.REACT_APP_API_URL}v1/auth/login-google?isCoach=true&redirectUrl=${completeCurrentUrl}`
  }

  return (
    <Pane display="flex" flexDirection="column" alignItems="center">
      <Text marginBottom={20}>{title}</Text>
      <Button onClick={onLoginWithGoogle} appearance="minimal">
        <Image
          src={googleIcon}
          alt="Google icon"
          width="20px"
          style={{ marginRight: '5px' }}
        />
        Google
      </Button>
    </Pane>
  )
}

OAuthForm.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string,
    search: PropTypes.string,
  }).isRequired,
  title: PropTypes.string.isRequired,
}

export default withRouter(OAuthForm)

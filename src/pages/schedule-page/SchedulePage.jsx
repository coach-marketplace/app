import React, { Fragment } from 'react'

import Layout from '../../components/layout/main-page-layout/MainPageLayout'
import Header from '../../components/layout/header/Header'
import Calendar from '../../components/ui/calendar/Calendar'

class SchedulePage extends React.Component {
  render() {
    return (
      <Layout
        header={<Header />}
        main={
          <Fragment>
            <Calendar />
          </Fragment>
        }
      />
    )
  }
}

export default SchedulePage

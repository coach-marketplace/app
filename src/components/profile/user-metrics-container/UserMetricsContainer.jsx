import React, { useEffect } from 'react'
import { connect } from 'react-redux'

import UserMetricsForm from '../user-metrics-form/UserMetricsForm'
import MetricsChart from '../metrics-chart/MetricsChart'
import { Spinner, Title, Text, Pane } from '../../ui'
import { fetchPhysicalMetrics } from '../../../store/modules/user/actions'
import { ACTION_TYPE } from '../../../helper/constants'

const UserMetricsContainer = ({
  metrics,
  fetchMetricsStatus,
  fetchMetrics,
}) => {
  useEffect(() => {
    if (
      fetchMetricsStatus === ACTION_TYPE.SUCCESS ||
      fetchMetricsStatus === ACTION_TYPE.FAILED
    )
      return
    fetchMetrics()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const getMostRecentWeight = (data) => {
    if (!data.length) return null
    const latestMetric = data[data.length - 1]

    return latestMetric.weight.value
  }

  const getMostRecentHeight = (data) => {
    if (!data.length) return null
    const latestMetric = data[data.length - 1]

    return latestMetric.height.value
  }

  if (fetchMetricsStatus === ACTION_TYPE.LOADING) {
    return <Spinner />
  }

  const sortedChronologicallyMetrics = metrics.sort((a, b) => {
    if (a.date < b.date) return -1
    if (a.date > b.date) return 1
    return 0
  })
  const latestHeight = getMostRecentHeight(sortedChronologicallyMetrics)
  const latestWeight = getMostRecentWeight(sortedChronologicallyMetrics)

  return (
    <>
      <Title>Your stats</Title>

      <Pane display="flex" paddingBottom={30}>
        <Pane display="flex" flexGrow={1}>
          <Text>Weight: {latestWeight}kg</Text>
        </Pane>
        <Pane display="flex" flexGrow={1}>
          <Text>Height: {latestHeight}cm</Text>
        </Pane>
      </Pane>

      <MetricsChart metrics={sortedChronologicallyMetrics} />

      <UserMetricsForm
        latestHeight={latestHeight}
        latestWeight={latestWeight}
      />
    </>
  )
}

const mapStateToProps = (state) => ({
  metrics: state.user.physicalMetrics,
  fetchMetricsStatus: state.user.actions.fetchPhysicalMetrics.status,
})

const mapDispatchToProps = (dispatch) => ({
  fetchMetrics: () => dispatch(fetchPhysicalMetrics()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(UserMetricsContainer)

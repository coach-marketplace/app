import React from 'react'
import PropTypes from 'prop-types'
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from 'recharts'

import { COLOR } from '../../../helper/constants'

const MetricsCharts = ({ metrics }) => {
  console.log('me', metrics)
  return (
    <div style={{ width: '100%', height: '300px' }}>
      <ResponsiveContainer>
        <LineChart data={metrics}>
          <Line type="monotone" dataKey="weight.value" stroke={COLOR.PRIMARY} />
          <XAxis dataKey="name" />
          <YAxis />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

MetricsCharts.propTypes = {
  metrics: PropTypes.arrayOf(
    PropTypes.shape({
      weight: PropTypes.shape({
        value: PropTypes.number,
        unit: PropTypes.string,
      }),
      date: PropTypes.string,
    }),
  ),
}

MetricsCharts.defaultProps = {}

export default MetricsCharts

import React from 'react'

export default function ChartCard({children}) {
  return (
    <div className="feature col-12 col-md-6 col-xl-4 chart_card">
        <div className='chart_card_box justify-content-center align-items-center d-flex'>
            {children}
        </div>
    </div>
  )
}

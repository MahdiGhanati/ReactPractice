import React, { useEffect, useState } from 'react'
import ChartContent from '../../src/components/charts/ChartContent'

const DemandAnalists = () => {

  const [powerDemand , setPowerDemand] = useState(null)
  const [consumedDemand , setConsumedDemand] = useState(null)
  const [labels , setLabels] = useState(null)



  useEffect(()=>{

      let pd,cd,labs

    const Power = [
        {name: 'arak',value: 10},
        {name: 'tehran',value: 15},
    ]

    const ConsumingDemand = [
      {name: 'arak',value: 8},
      {name: 'tehran',value: 5},
    ]
      
        pd = Object.values(Power)?.map(pd => pd.value)
        cd = Object.values(ConsumingDemand)?.map(pd => pd.value)
        labs = Object.values(ConsumingDemand)?.map(pd => pd.name)


      setPowerDemand(pd)
      setConsumedDemand(cd)
      setLabels(labs)

  },[])



  return (
    <ChartContent 
    title="آنالیز دیماندها - kw" 
    dataCollection={[
        {data: powerDemand, label: "دیماند قرارداد"},
        {data: consumedDemand, label: "دیماند مصرف"}
    ]} 
    labels={labels} 
    type='v-bar' />
  )
}

export default DemandAnalists
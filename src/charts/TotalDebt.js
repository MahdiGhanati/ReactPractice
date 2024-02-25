import React, { useEffect, useState } from 'react'
import ChartContent from '../../src/components/charts/ChartContent'

const TotalDebt = () => {
  const [totalDebt , setTotalDebt] = useState(null)
  const [labels , setLabels] = useState(null)


  useEffect(()=>{

      let tD,labs
      
      const TotalDebt = [
        {name: 'arak',value: 10},
        {name: 'tehran',value: 15},
    ]

        tD = Object.values(TotalDebt)?.map(pd => pd.value)
        labs = Object.values(TotalDebt)?.map(pd => pd.name)
        

      setTotalDebt(tD)
      setLabels(labs)

  },[])



  return (
    <ChartContent 
    title="بدهی کل - ريال" 
    dataCollection={[
        {data: totalDebt, label: "ریال"},
    ]} 
    labels={labels} 
    type='v-bar' />
  )
}

export default TotalDebt
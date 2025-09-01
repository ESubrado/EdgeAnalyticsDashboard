import React from 'react'
import { Cell, Pie, PieChart, Legend } from 'recharts';
import type { EventCounterProps, PieChartItemListProp, PieLabelProps } from '~/models/analytics-model';

import useParseEnumFromString from '~/hooks/parse-string';
import { EnumEventTypes } from '~/models/analytics-model';
import { useAppTableContext } from '~/context/AppContext';

// Initial declaration for pie chart styling and customed label names in legend
const RADIAN = Math.PI / 180;
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#c91e08', '#535406', "#00000"];

const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, name }: PieLabelProps) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-(midAngle ?? 0) * RADIAN);
  const y = cy + radius * Math.sin(-(midAngle ?? 0) * RADIAN);
  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
      {`${((percent ?? 1) * 100).toFixed(0)}%`}
    </text>
  );
};

const AnalyticPieChart  = () => {

  const {topEventsData} = useAppTableContext()

  const  parseString : any  = useParseEnumFromString(EnumEventTypes)
  const eventcountdata : EventCounterProps[]  = []
  
   //Add parsing to indicate real name of event type
  for (var i = 0; i < topEventsData.length; i++){
    eventcountdata.push(
      {
        ...topEventsData[i], 
        eventName: parseString(topEventsData[i].event) || `Other (${topEventsData[i].event})`
      }
    )
  }  

  return (
     <>
        <div className='p-4 pb-0 bg-stone-100 border border-stone-300 rounded col-span-12 lg:col-span-5'>        
            <div className="flex mb-0 items justify-center">
                <PieChart width={500} height={390}>
                  <Pie
                    data={eventcountdata}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={renderCustomizedLabel}
                    outerRadius={170}
                    fill="#8884d8"
                    dataKey="count"
                    nameKey="eventName"
                  >
                    {eventcountdata.map((entry : EventCounterProps, index) => (
                      <Cell key={`cell-${entry.event}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Legend 
                        layout="vertical"
                        align="right"    
                        verticalAlign="middle"                    
                        iconType="circle"
                        iconSize={12} 
                        wrapperStyle={{right: -20}}                       
                    />
                </PieChart>       
            </div>           
        </div>    
    </>   
  )
}

export default AnalyticPieChart
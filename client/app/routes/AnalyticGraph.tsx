import React from 'react'
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { chartdata } from '~/data/DataSamples';


export const AnalyticGraph = () => {
  return (     
    <>
        <div className="p-4 border border-stone-300 col-span-8 rounded h-auto">
            <ResponsiveContainer width="100%" height="100%">
                <LineChart width={500} height={300} data={chartdata}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" padding={{ left: 30, right: 30 }} />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{ r: 8 }} />
                    <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
                     <Line type="monotone" dataKey="amt" stroke="#ffa500" />
                </LineChart>
            </ResponsiveContainer>
        </div>
    </>    
  )
}

"use client";
import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  LabelList,
  Tooltip,
  Cell
} from "recharts";

function ProgressBarChart({ projects }) {

  const colors = ["#3f83f8", "#ff6347", "#32cd32", "#ffd700", "#a52a2a"];

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        width={300}
        height={300}
        data={projects}
        margin={{ right: 30, bottom: 20, top: 20 }}
      >
        <YAxis dataKey="progress" interval={0} type="number" domain={[0, 100]} tick={{ fontSize: 14 }} />
        <XAxis dataKey="name" type="category" interval={0} tick={{ fontSize: 10 }} />
        <Tooltip />
        <Bar type="monotone" dataKey="progress" barSize={30}>
          <LabelList dataKey="progress" position="top" />
          {
            projects.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
            ))
          }
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}

// const CustomTooltip = ({ active, payload, label }) => {
//   if (active && payload && payload.length) {
//     return (
//       <div className="custom-tooltip">
//         <p className="label">{`${label} : ${payload[0].value}%`}</p>
//       </div>
//     );
//   }
// }

export default ProgressBarChart;

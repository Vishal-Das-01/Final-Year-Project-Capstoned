import { useState } from "react";
import { Pie } from "@visx/shape";
import { Group } from "@visx/group";
import { Text } from "@visx/text";

// Function to calculate day of the year
function getDayOfYear() {
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 0);
  const diff = now - start;
  const oneDay = 1000 * 60 * 60 * 24;
  const day = Math.floor(diff / oneDay);
  return day;
}

const totalDays = 365;
const daysPassed = getDayOfYear(); // Use the function here
const daysRemaining = totalDays - daysPassed;

const days = [
  { name: "Passed", value: daysPassed, color: "#4caf50" },
  { name: "Remaining", value: daysRemaining, color: "#ff5722" }
];

export default function ProgressChart() {
  const [active, setActive] = useState(null);
  const width = 200;
  const half = width / 2;

  return (
    <main>
      <svg width={width} height={width}>
        <Group top={half} left={half}>
          <Pie
            data={days}
            pieValue={(data) => data.value}
            outerRadius={half}
            innerRadius={half - 10}
            padAngle={0.01}
          >
            {(pie) => {
              return pie.arcs.map((arc) => {
                return (
                  <g
                    key={arc.data.name}
                    onMouseEnter={() => setActive(arc.data)}
                    onMouseLeave={() => setActive(null)}
                  >
                    <path d={pie.path(arc)} fill={arc.data.color}></path>
                  </g>
                );
              });
            }}
          </Pie>

          {active ? (
            <>
              <Text textAnchor="middle" fill="#fff" fontSize={40} dy={-20}>
                {`${active.value} Days`}
              </Text>

              <Text
                textAnchor="middle"
                fill={active.color}
                fontSize={20}
                dy={20}
              >
                {active.name}
              </Text>
            </>
          ) : (
            <>
              <Text textAnchor="middle" fill="#fff" fontSize={40} dy={-20}>
                {`Total ${totalDays} Days`}
              </Text>

              <Text textAnchor="middle" fill="#aaa" fontSize={20} dy={20}>
                {'Project Progress'}
              </Text>
            </>
          )}
        </Group>
      </svg>
    </main>
  );
}

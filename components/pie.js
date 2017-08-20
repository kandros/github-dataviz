import _ from "lodash";
import React from "react";
import { Arc } from "@vx/shape";
import { Group } from "@vx/group";
import { RadialGradient } from "@vx/gradient";
import { result } from "../data/latest-repos";

const repos = result.data.viewer.repositories.edges;
const languages = _.flatten(
  repos
    .filter(x => x.node.updatedAt.startsWith("2017"))
    .map(r => r.node.languages.edges)
).map(x => x.node.name);

const byLang = _.countBy(languages);
const data = Object.entries(byLang)
  .map(([k, v]) => ({ name: k, value: v / languages.length * 100 }))
  .filter(x => x.value > 3);

console.log(data);

function Label({ x, y, children }) {
  return (
    <text
      fill="white"
      textAnchor="middle"
      fontFamily="sans-serif"
      x={x}
      y={y}
      dy=".33em"
      fontSize={12}
    >
      {children}
    </text>
  );
}

export default ({
  width,
  height,
  events = false,
  margin = {
    top: 110,
    left: 20,
    right: 20,
    bottom: 110
  }
}) => {
  if (width < 10) return null;
  const radius = Math.min(width, height) / 2;
  return (
    <div>
      <style jsx>
        {`
          :global(path.vx-arc) {
            stroke: white;
            stroke-opacity: 0.3;
          }
        `}
      </style>
      <svg width={width} height={height}>
        <RadialGradient id="gradients" from="#55bdd5" to="#4f3681" r={"80%"} />
        <rect
          x={0}
          y={0}
          rx={14}
          width={width}
          height={height}
          fill="url('#gradients')"
        />
        <Group top={height / 2} left={width / 2}>
          <Arc
            data={data}
            pieValue={d => d.value}
            outerRadius={radius - 80}
            fill="white"
            fillOpacity={d => 1 / (d.index + 2)}
            padAngle={0}
            centroid={(centroid, arc) => {
              const { startAngle, endAngle } = arc;
              if (endAngle - startAngle < 0.1) return null;

              // find x and y label position outside of pie
              const midAngle = Math.atan2(centroid[1], centroid[0]);
              const x = Math.cos(midAngle) * 155;
              const sign = x > 0 ? 1 : -1;
              const labelX = x + 5 * sign;
              const y = Math.sin(midAngle) * 155;
              return (
                <Label x={x} y={y}>
                  {arc.data.name}
                </Label>
              );
            }}
          />
        </Group>
      </svg>
    </div>
  );
};

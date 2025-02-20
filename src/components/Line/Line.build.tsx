import { useEnhancedNode } from '@ws-ui/webform-editor';
import cn from 'classnames';
import { FC, useMemo } from 'react';
import { ILineProps } from './Line.config';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from 'chart.js';
import { randomColor } from '../shared/colorUtils';
import { Line as LineChart } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
);

const Line: FC<ILineProps> = ({
  name,
  datasets = [],
  legendPosition = 'top',
  grid = true,
  tooltip = true,
  xAxis = true,
  yAxis = true,
  style,
  className,
  classNames = [],
}) => {
  const {
    connectors: { connect },
  } = useEnhancedNode();

  const data = useMemo(
    () => ({
      datasets: datasets.map((set) => {
        const color = randomColor();
        return {
          fill: set.fill,
          label: set.label,
          data: [
            { x: 'value 1', y: Math.random() * 10 },
            { x: 'value 2', y: Math.random() * 10 },
            { x: 'value 3', y: Math.random() * 10 },
            { x: 'value 4', y: Math.random() * 10 },
          ],
          tension: set.tension,
          borderColor: set.borderColor || set.backgroundColor || color,
          backgroundColor: set.backgroundColor || set.borderColor || color,
          pointBackgroundColor: set.pointBackgroundColor || set.backgroundColor || color,
          pointBorderColor: set.pointBackgroundColor || set.backgroundColor || color,
          pointStyle: set.pointStyle,
          pointRadius: set.pointSize,
          stepped: set.stepped,
        };
      }),
    }),
    [datasets],
  );

  const options = useMemo(
    () => ({
      responsive: true,
      plugins: {
        legend: {
          display: (legendPosition as string) !== 'hidden',
          position: legendPosition,
          labels: {
            color: style?.color,
            font: {
              size: (style?.fontSize as number) || 14,
              family: style?.fontFamily || 'inherit',
              weight: style?.fontWeight as number,
            },
          },
        },
        title: {
          display: name !== '',
          text: name,
          color: style?.color,
          font: {
            size: (style?.fontSize as number) || 14,
            family: style?.fontFamily || 'inherit',
            weight: style?.fontWeight as number,
          },
        },
        tooltip: {
          enabled: tooltip,
        },
      },
      scales: {
        x: {
          display: xAxis,
          grid: {
            display: grid,
          },
        },
        y: {
          grid: {
            display: grid,
          },
          display: yAxis,
        },
      },
    }),
    [legendPosition, style, grid, xAxis, yAxis, tooltip, name],
  );

  return (
    <div ref={connect} style={style} className={cn('chart', className, classNames)}>
      <LineChart options={options} data={data} />
    </div>
  );
};

export default Line;

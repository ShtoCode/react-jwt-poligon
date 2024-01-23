import { Line } from 'react-chartjs-2';
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Chart as ChartJS, registerables } from 'chart.js/auto';
import 'chartjs-adapter-date-fns';
import { Tooltip } from 'react-tooltip';

ChartJS.register(...registerables);

const StockChart = () => {
  const [stockData, setStockData] = useState([]);
  const chartRef = useRef();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiKey = 'gFq1YqiQIiWILi7TnRxQvJ57WrhobN__';
        const symbol = 'AAPL';
        const apiUrl = `https://api.polygon.io/v2/aggs/ticker/${symbol}/range/1/day/2022-01-01/2022-01-31?apiKey=${apiKey}`;

        const response = await axios.get(apiUrl);
        const dailyData = response.data.results;

        if (!dailyData) {
          console.error('Error: Daily data not available.');
          return;
        }

        const chartData = dailyData.map((data) => ({
          x: new Date(data.t),
          y: data.c,
          metadata: {
            open: data.o,
            high: data.h,
            low: data.l,
            close: data.c,
            volume: data.v,
          },
        }));

        setStockData(chartData);
      } catch (error) {
        console.error('Error fetching stock data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const chartCanvas = chartRef.current;
    const chartInstance = chartCanvas ? chartCanvas.chartInstance : null;

    if (chartInstance) {
      chartInstance.destroy();
    }
  }, [stockData]);

  const chartOptions = {
    scales: {
      x: {
        type: 'time',
        time: {
          unit: 'day',
        },
      },
      y: {
        type: 'linear',
      },
    },
    plugins: {
      tooltip: {
        enabled: false,
      },
    },
  };

  const handlePointClick = (event, elements) => {
    if (elements.length > 0) {
      const [point] = elements;
      const metadata = point.parsed.metadata;

      Tooltip.show(event);
      Tooltip.rebuild();
      Tooltip.setContent(
        `<div>
          <p>Open: ${metadata.open}</p>
          <p>Close: ${metadata.close}</p>
          <p>High: ${metadata.high}</p>
          <p>Low: ${metadata.low}</p>
          <p>Volume: ${metadata.volume}</p>
        </div>`
      );
    }
  };

  return (
    <div>
      <h2>Gráfico de Precios de Acciones</h2>
      <Line
        ref={chartRef}
        data={{ datasets: [{ label: 'Precio de Cierre', data: stockData }] }}
        options={chartOptions}
        getElementAtEvent={(elements) => handlePointClick(elements)}
      />
      <Tooltip />
    </div>
  );
};

export default StockChart;

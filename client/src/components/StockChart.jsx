import { Line } from 'react-chartjs-2';
import { useState, useEffect, useRef, useContext } from 'react';
import axios from 'axios';
import { Chart as ChartJS, registerables } from 'chart.js/auto';
import 'chartjs-adapter-date-fns';
import { StockContext } from '../context/StockContext';

ChartJS.register(...registerables);

const StockChart = () => {

  const [stockData, setStockData] = useState([]);
  const [error, setError] = useState(null);
  const chartRef = useRef();
  const { symbol } = useContext(StockContext);

  const clearError = () => {
    setError(null);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        clearError();
        if (symbol === null) {
          return;
        }

        const apiKey = import.meta.env.VITE_POLYGON_API_KEY;

        const apiUrl = `https://api.polygon.io/v2/aggs/ticker/${symbol}/range/1/day/2024-01-01/2024-01-31?apiKey=${apiKey}`;

        const response = await axios.get(apiUrl);

        const dailyData = response.data.results;
        console.log(dailyData);

        if (!dailyData) {
          console.log('Daily Data no disponible');
          setError(`Daily data de ${symbol} no disponible. Por favor, intenta con otro ticker.`);
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
        if (error.response && error.response.status === 429) {
          setError('Demasiadas solicitudes. Por favor, espere un momento antes de intentar nuevamente.');
        }
        setError('Ha ocurrido un error al obtener los datos. Por favor, intenta de nuevo.');
      }
    };

    fetchData();
  }, [symbol]);

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
      tooltips: {
        callbacks: {
        }
      }
    },
    showTooltips: true,
    responsive: true,
  };

  return (
    <div className='w-full'>
      {error && (
        <div className="flex items-center p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
          <svg className="flex-shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
          </svg>
          <span className="sr-only">Info</span>
          <div>
            <span className="font-medium">Error!</span> {error}
          </div>
        </div>
      )}
      {symbol !== null && !error ? (
        <div className='h-full'>
          <Line
            ref={chartRef}
            data={{
              datasets: [{
                label: `Precios de Cierre de ${symbol}`,
                data: stockData,
                borderColor: 'rgba(75,192,192,1)',
                backgroundColor: 'rgba(75,192,192,0.2)',
                fill: true,
                tension: 0.4,
                borderWidth: 2,
                pointRadius: 10
              }]
            }}
            options={chartOptions}
          />
        </div>
      ) : (
        <h2 className='text-center text-2xl text-gray-600 mt-12 bg-gray-300 p-[100px] h-full'>Debes seleccionar un Ticker</h2>
      )}
    </div >
  );
};

export default StockChart;

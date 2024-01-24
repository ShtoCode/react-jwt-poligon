import React from 'react'
import StockCharts from '../components/StockChart'
import { StockProvider } from '../context/StockContext';
import SearchCompany from '../components/SearchCompany';

const Home = () => {
  return (
    <StockProvider>
      <h1 className='text-center text-5xl text-blue-300 mt-12'>Visualizador de Precio de Acciones</h1>
      <SearchCompany />

      <div className='flex'>
        <StockCharts />
        <div className='ml-auto mt-12'>Hola</div>

      </div>
    </StockProvider>
  )
}

export default Home

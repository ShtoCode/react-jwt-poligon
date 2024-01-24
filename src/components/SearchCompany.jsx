import React, { useState, useContext } from 'react'
import { Formik, Form, Field } from 'formik'
import { StockContext } from '../context/StockContext';
import axios from 'axios'

const SearchCompany = () => {

  const { updateSymbol } = useContext(StockContext);
  const [symbol, setSymbol] = useState([]);

  const handleSubmit = async (e) => {
    try {
      const apiKey = 'gFq1YqiQIiWILi7TnRxQvJ57WrhobN__';
      const apiUrl = `https://api.polygon.io/v3/reference/tickers?search=${e.search}&limit=10&active=true&apiKey=${apiKey}`;
      const response = await axios.get(apiUrl);
      const results = response.data.results;
      setSymbol(results)
    }


    catch (error) {
      console.log("Error fetching data:", error);
    }
  }


  const onClickBtn = (symbol) => {
    updateSymbol(symbol)
  }

  return (
    <Formik
      initialValues={{ search: '' }}
      onSubmit={(values) => handleSubmit(values)}
    >
      <div className='flex mx-auto bg-gray-200 flex-col w-2/3'>
        <Form className='flex flex-col'>
          <label htmlFor="search" className="text-center text-xl">Buscar Compañía</label>
          <Field
            type="text"
            name="search"
            placeholder="Ej. TESLA"
            className="text-center text-xl rounded rounded-lg border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 mt-1 block w-2/3 mx-auto p-2"
          />
          <button className='text-center text-xl bg-blue-700 rounded rounded-md w-60 mt-4 mb-12 mx-auto p-2 transition duration-300 ease-in-out hover:scale-105 hover:bg-blue-500 text-white' type="submit">Buscar</button>
        </Form>

        <ul className='bg-blue-900 text-white'>
          {symbol.map((result) => (
            <li key={result.ticker} className='text-center text-xl'>
              {result.name} ({result.ticker})
              <button className='text-center text-xl ml-15 bg-blue-700 rounded rounded-md w-60 mt-4 mb-12 mx-auto p-2 transition duration-300 ease-in-out hover:scale-105 hover:bg-blue-500 text-white' onClick={() => onClickBtn(result.ticker)}>Ver precios de cierre</button>
            </li>
          ))}
        </ul>
      </div>
    </Formik>)
}

export default SearchCompany

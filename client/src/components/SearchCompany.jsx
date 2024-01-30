import { useState, useContext } from 'react'
import { Formik, Form, Field } from 'formik'
import { StockContext } from '../context/StockContext';
import { FcStatistics } from 'react-icons/fc';
import axios from 'axios'

const SearchCompany = () => {

  const { updateSymbol } = useContext(StockContext);
  const [symbol, setSymbol] = useState([]);

  const handleSubmit = async (e) => {
    try {
      const apiKey = import.meta.env.VITE_POLYGON_API_KEY;
      const apiUrl = `https://api.polygon.io/v3/reference/tickers?search=${e.search}&limit=15&active=true&apiKey=${apiKey}`;
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
      <div className='flex mx-auto bg-gray-200 flex-col w-2/3 mt-12'>
        <Form className='flex flex-col mb-4'>
          <label htmlFor="search" className="text-center text-xl mt-4 text-blue-700">Buscar Compañía</label>
          <Field
            type="text"
            name="search"
            placeholder="Ej. TESLA"
            className="text-center text-xl rounded-lg border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 mt-1 block w-2/3 mx-auto p-2"
          />
          <button className='text-center text-xl bg-blue-700 rounded rounded-md w-60 mt-4 mb-12 mx-auto p-2 transition duration-300 ease-in-out hover:scale-105 hover:bg-blue-500 text-white' type="submit">Buscar</button>
        </Form>

        <ul className='text-white w-3/4 mx-auto mb-10'>
          {symbol.map((result) => (
            <li key={result.ticker} className='text-center text-xl border rounded-lg bg-blue-900 border-gray-300 p-2 h-25 mt-5'>
              {result.name} ({result.ticker})
              <div className='flex'>
                <button className='text-center text-xl ml-15 bg-blue-700 rounded w-60 mt-4 mb-12 mx-auto p-2 transition duration-300 ease-in-out hover:scale-105 hover:bg-blue-500 text-white flex justify-center' onClick={() => onClickBtn(result.ticker)}><span className='mr-2 mt-1'><FcStatistics /> </span>Ver precios de cierre</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </Formik>)
}

export default SearchCompany

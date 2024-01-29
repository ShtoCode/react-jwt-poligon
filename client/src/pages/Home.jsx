import StockCharts from '../components/StockChart'
import { StockProvider } from '../context/StockContext';
import SearchCompany from '../components/SearchCompany';
import Navbar from '../components/Navbar';

const Home = () => {
  return (
    <>
      <Navbar />
      <StockProvider>
        <SearchCompany />
        <div className='flex'>
          <StockCharts />

        </div>
      </StockProvider>
    </>
  )
}

export default Home

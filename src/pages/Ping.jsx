import { useState, useEffect} from 'react'
import axios from 'axios'
function Ping() {
    const [ping, setPing] = useState(null)
    useEffect(() => {

        try{
            const ping = async () => {
                
                const response = await axios.get('http://localhost:5000/ping')
                setPing(response.data)
                console.log(response.data)
            }           
            ping()

        }
        catch(error){
            console.log(error)
        }

    }, [])
  return (
    <div>{ping && ping.message}</div>
  )
}

export default Ping
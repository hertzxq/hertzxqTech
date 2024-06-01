import Header from "./header"
import Main from "./main"
import Footer from "./footer"
import { useEffect, useState } from 'react';

export default function MainPage() {

    const [backendData, setBackendData] = useState([]);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      fetch('http://localhost:8080/server')
        .then(res => res.json())
        .then(data => {
          setBackendData(data);
          setLoading(false);
        })
        .catch(error => {
          console.error('Error fetching data:', error);
          setLoading(false);
        });
    }, []);
  
    if (loading) {
      return <div>Loading...</div>;
    }
  

    return (
        <>
            <Header />
            <Main data={backendData}/>
            <Footer />
        </>
    )
}
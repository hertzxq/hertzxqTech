import Header from "./header"
import Main from "./main"
import Footer from "./footer"
import { useEffect, useState } from 'react';

export default function MainPage() {

    const [backendData, setBackendData] = useState([]);
  
    useEffect(() => {
      fetch('http://localhost:8080/server')
        .then(res => res.json())
        .then(data => {
          setBackendData(data);
        })
        .catch(error => {
          console.error('Error fetching data:', error);
        });
    }, []);
  

    return (
        <>
            <Header />
            <Main data={backendData}/>
            <Footer />
        </>
    )
}
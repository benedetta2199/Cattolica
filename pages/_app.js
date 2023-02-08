
import "bootstrap/dist/css/bootstrap.css";
import { useEffect, useRef } from "react";
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {


  return (
    <>
        <Component {...pageProps} />
    </>
    )
}

export default MyApp

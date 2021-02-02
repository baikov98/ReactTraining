import React, { useEffect, useState } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
} from "react-router-dom";


export default function PageNotFound(props) {
    return (
        <>
        <h2>Error 404</h2>
        <h4>Page not found</h4>
        </>
    )
}


import React, { useEffect, useState } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
} from "react-router-dom";


export default function Team(props) {
    const { id } = useParams()
    return (
        <div>TEAM PAGE</div>
    )
}
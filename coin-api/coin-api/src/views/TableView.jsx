import React, { useEffect, useState } from 'react'
import Table from '../components/Table'
import axios from 'axios'
import {
    useLocation,
  } from "react-router-dom";

function TableView() {
    const keywordToBeFetched = useLocation()
    const { keyword } = keywordToBeFetched.state
    const url = `https://api.coingecko.com/api/v3/search?query=${keyword}`
    const [fetchedCoins, setFetchedCoins] = useState(null)

    useEffect(() => {
        axios.get(url)
            .then(res => {
                console.log(res.data);
                setFetchedCoins(res.data)
            })
    }, [url])

    if(fetchedCoins) {
        return (
            <div>
                <Table data={fetchedCoins.coins} />
            </div>
            )                
    }

    return (
        <div></div>
    )
}

export default TableView

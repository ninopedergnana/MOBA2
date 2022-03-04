import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {
    useLocation,
  } from "react-router-dom";
import Detail from '../components/Detail';

function DetailView() {
  const keywordToBeFetched = useLocation()
  const { keyword } = keywordToBeFetched.state
  const url = `https://api.coingecko.com/api/v3/coins/${keyword}`
  const [fetchedCoinDetail, setFetchedCoinDetail] = useState(null)

  useEffect(() => {
      axios.get(url)
          .then(res => {
              console.log(res.data);
              setFetchedCoinDetail(res.data)
          })
  }, [url])

  if(fetchedCoinDetail) {
      return (
          <div className='flex mx-auto justify-center'>
              <Detail data={fetchedCoinDetail}></Detail>
          </div>
          )                
  }

  return (
      <div></div>
  )
}
  
  export default DetailView
  
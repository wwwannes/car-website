import React, {useEffect} from 'react';
import { useParams } from "react-router-dom";
import axios from 'axios';

export default function VehicleDetails(){

    const params = useParams();

    const [searchData, setSearchData] = React.useState({
        gw: "search_json",
        mkey: "1-40248-2565679",
        language: 2,
        chiffre: params.id
    });
    
    useEffect(() => {
        axios.get(
            'https://content.modix.net/soap/kfz/',
            {
                params: searchData
            }
        )
          .then(res => {
              console.log(res);
        })
    }, [])

    return(
        <>
            <h1>VehicleDetails</h1>
        </>
    );
}
import React, {useCallback, useEffect} from 'react';

import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';

import VehicleGridItem from './VehicleGridItem';
import { getVehicleData } from '../../composables/ApiCalls';

export default function VehicleGrid(props){
    const [searchData, setSearchData] = React.useState({
        max: 41
    });
    const [vehicleData, setVehicleData] = React.useState([]); 
    const [loaded, setLoaded] = React.useState(false);

    const refreshResults = useCallback(() => {
        setLoaded(false);

        getVehicleData(searchData, "search_json").then( res => {
            setVehicleData(res.data.vehicles);
            setLoaded(true);
        });
    }, [searchData]); /* Function will only be called if dependency 'searchData' changes */

    const updateSearchData = useCallback(() => {
        if(loaded){
            setSearchData({...props.queryData});
        }
    }, [props.queryData]);

    useEffect(() => {
        updateSearchData();
    },[updateSearchData]);

    useEffect(() => {
        refreshResults();
    },[refreshResults]);

    return(
        <>
            {vehicleData !== undefined && loaded &&
                <Box sx={{ flexGrow: 1 }}>
                    <Grid container spacing={2}>
                        {vehicleData.map((value, key) => {
                            const vehiclePrice = new Intl.NumberFormat('be-NL', {
                                style: 'currency',
                                currency: value.prices.currency
                            }).format(value.prices.price);

                            return(
                                <VehicleGridItem
                                    key={key}
                                    id={value.cipher}
                                    numberOfColumns={4}
                                    manufacturer={value.mainData.manufacturer.name}
                                    model={value.mainData.model.name}
                                    picServer={value.picServer}
                                    image={value.images[0].name}
                                    price={vehiclePrice}
                                />
                            )
                        })}
                    </Grid>
                </Box>
            }
            {!loaded &&
                <Box sx={{ width: '100%' }}>
                    <LinearProgress />
                </Box>
            }
        </>
    );
}
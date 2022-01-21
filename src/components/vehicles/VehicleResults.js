import React, {useEffect} from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';

import { CardActionArea } from '@mui/material';
import CardContent from '@mui/material/CardContent';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

import LinearProgress from '@mui/material/LinearProgress';
import VehicleDetails from '../../views/VehicleDetailPage';

export default function VehicleGrid(props){
    const [searchData, setSearchData] = React.useState({
        gw: "search_json",
        mkey: "1-40248-2565679",
        language: 2,
        max: 41
    });
    const [vehicleData, setVehicleData] = React.useState([]); 
    const [loaded, setLoaded] = React.useState(false);

    const refreshResults = () => {
        setLoaded(false);

        axios.get(
            'https://content.modix.net/soap/kfz/',
            {
                params: searchData
            }
        )
          .then(res => {
              setVehicleData(res.data.vehicles);
              setLoaded(true);
              console.log(res.data.vehicles);
        })
    }

    useEffect(() => {
        if(loaded){
            setSearchData({...props.queryData, gw: "search_json"});
        }
    },[props.queryData]);

    useEffect(() => {
        refreshResults();
    },[searchData]);

    return(
        <>
            {loaded &&
                <>
                    <Box sx={{ flexGrow: 1 }}>
                        <Grid container spacing={2}>
                            {vehicleData.map((value, key) => {
                                const vehiclePrice = new Intl.NumberFormat('be-NL', {
                                    style: 'currency',
                                    currency: value.prices.currency
                                }).format(value.prices.price);

                                return( 
                                    <>
                                        <Grid item xs={4} key={key}>
                                            <Card variant="outlined">
                                                <CardActionArea>
                                                    <Link to={`/vehicle/${value.mainData.manufacturer.name}/${value.mainData.model.name}/${value.cipher}`}>
                                                        <CardMedia component="img" image={value.picServer+"/"+value.images[0].name}/>
                                                        <CardContent>
                                                            <Typography gutterBottom variant="h6" component="div">{value.mainData.manufacturer.name} {value.mainData.model.name}</Typography>
                                                            <Typography variant="body2" color="text.secondary">{vehiclePrice}</Typography>
                                                        </CardContent>
                                                    </Link>
                                                </CardActionArea>
                                            </Card>
                                        </Grid>
                                    </>
                                );
                            })}
                        </Grid>
                    </Box>
                </>
            }
            {!loaded &&
                <Box sx={{ width: '100%' }}>
                    <LinearProgress />
                </Box>
            }
        </>
    );
}
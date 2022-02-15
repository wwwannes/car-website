import {useCallback, useEffect, useRef, useState} from 'react';

//import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';

//import VehicleGridItem from './VehicleGridItem';
import { getVehicleData } from '../../composables/ApiCalls';

import { Grid } from '../../composables/grid/grid';

export default function VehicleGrid(props){
    const [searchData, setSearchData] = useState({
        max: 41
    });
    const [vehicleData, setVehicleData] = useState([]); 
    const [loaded, setLoaded] = useState(false);

    const vehicleGrid = useRef();
    const [vehicleColumns, setVehicleColumns] = useState([]);

    const totalColumns = 3;

    const refreshResults = useCallback(() => {
        setLoaded(false);

        getVehicleData(searchData, "search_json").then( res => {
            setVehicleData(res.data.vehicles);
            setLoaded(true);
            
            /* Divide the results into 3 columns */
            const chunkSize = Math.ceil(res.data.vehicles.length / totalColumns);
            setVehicleColumns(res.data.vehicles.map((e, i) => { 
                return i % chunkSize === 0 ? res.data.vehicles.slice(i, i + chunkSize) : null; 
            }).filter(e => { return e; }));
            
            /* Initialize vehicle grid */
            const grd = vehicleGrid.current;
            new Grid(grd);

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
            {vehicleData !== undefined && vehicleColumns.length > 0 && loaded &&
                <div className="columns" data-scroll-container ref={vehicleGrid}>

                    <div className="column-wrap column-wrap--height">
                        <div className="column">
                                {vehicleColumns[0] &&
                                    vehicleColumns[0].map((item, key) => {
                                        const vehiclePrice = new Intl.NumberFormat('be-NL', {
                                            style: 'currency',
                                            currency: item.prices.currency
                                        }).format(item.prices.price);

                                        const position = 2 + (key * totalColumns);
                                                
                                        return(
                                            <figure className="column__item" key={position}>
                                                <div className="column__item-imgwrap" data-pos={position}>
                                                    {item.images[0] &&
                                                        <div className="column__item-img" style={{backgroundImage: `url(${item.picServer}/${item.images[0].name})`}}></div>
                                                    }
                                                </div>
                                                <figcaption className="column__item-caption">
                                                    <span>{item.mainData.manufacturer.name} {item.mainData.model.name}</span>
                                                    <span>{vehiclePrice}</span>
                                                </figcaption>
                                            </figure>
                                        );
                                    })
                                }
                        </div>
                    </div>

                    <div className="column-wrap">
                        <div className="column" data-scroll-section>
                            {vehicleColumns[1] &&
                                vehicleColumns[1].map((item, key) => {
                                    const vehiclePrice = new Intl.NumberFormat('be-NL', {
                                        style: 'currency',
                                        currency: item.prices.currency
                                    }).format(item.prices.price);

                                    const position = 1 + (key * totalColumns);
                                            
                                    return(
                                        <figure className="column__item" key={position}>
                                            <div className="column__item-imgwrap" data-pos={position}>
                                                {item.images[0] &&
                                                    <div className="column__item-img" style={{backgroundImage: `url(${item.picServer}/${item.images[0].name})`}}></div>
                                                }
                                            </div>
                                            <figcaption className="column__item-caption">
                                                <span>{item.mainData.manufacturer.name} {item.mainData.model.name}</span>
                                                <span>{vehiclePrice}</span>
                                            </figcaption>
                                        </figure>
                                    );
                                })
                            }
                        </div>
                    </div>

                    <div className="column-wrap column-wrap--height">
                        <div className="column">
                            {vehicleColumns[2] &&
                                vehicleColumns[2].map((item, key) => {
                                    const vehiclePrice = new Intl.NumberFormat('be-NL', {
                                        style: 'currency',
                                        currency: item.prices.currency
                                    }).format(item.prices.price);

                                    const position = 3 + (key * totalColumns);
                                            
                                    return(
                                        <figure className="column__item" key={position}>
                                            <div className="column__item-imgwrap" data-pos={position}>
                                                {item.images[0] &&
                                                    <div className="column__item-img" style={{backgroundImage: `url(${item.picServer}/${item.images[0].name})`}}></div>
                                                }
                                            </div>
                                            <figcaption className="column__item-caption">
                                                <span>{item.mainData.manufacturer.name} {item.mainData.model.name}</span>
                                                <span>{vehiclePrice}</span>
                                            </figcaption>
                                        </figure>
                                    );
                                })
                            }
                        </div>
                    </div>
                </div>
            }
            {!loaded &&
                <Box sx={{ width: '100%' }}>
                    <LinearProgress />
                </Box>
            }
        </>
    );
}
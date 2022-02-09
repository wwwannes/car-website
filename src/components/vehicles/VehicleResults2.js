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

            /* Initialize vehicle grid */
            const grd = vehicleGrid.current;
            new Grid(grd);
            
            /* Divide the results into 3 columns */
            const chunkSize = Math.ceil(res.data.vehicles.length / totalColumns);
            setVehicleColumns(res.data.vehicles.map((e, i) => { 
                return i % chunkSize === 0 ? res.data.vehicles.slice(i, i + chunkSize) : null; 
            }).filter(e => { return e; }));
            console.log(res.data.vehicles);


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
                <div className="columns" data-scroll-container ref={vehicleGrid}>

                    <div className="column-wrap column-wrap--height">
                        <div className="column">
                            {vehicleColumns[0].map((item, key) => {
                                const vehiclePrice = new Intl.NumberFormat('be-NL', {
                                    style: 'currency',
                                    currency: item.prices.currency
                                }).format(item.prices.price);

                                const position = 2 + (key * totalColumns);
                                        
                                return(
                                    <figure className="column__item" key={position}>
                                        <div className="column__item-imgwrap" data-pos={position}>
                                            <div className="column__item-img" style={{backgroundImage: `url(${item.picServer}/${item.images[0].name})`}}></div>
                                        </div>
                                        <figcaption className="column__item-caption">
                                            <span>{item.mainData.manufacturer.name} {item.mainData.model.name}</span>
                                            <span>{vehiclePrice}</span>
                                        </figcaption>
                                    </figure>
                                );
                            })}
                        </div>
                    </div>

                    <div className="column-wrap">
                        <div className="column" data-scroll-section>
                            {vehicleColumns[1].map((item, key) => {
                                const vehiclePrice = new Intl.NumberFormat('be-NL', {
                                    style: 'currency',
                                    currency: item.prices.currency
                                }).format(item.prices.price);

                                const position = 1 + (key * totalColumns);
                                        
                                return(
                                    <figure className="column__item" key={position}>
                                        <div className="column__item-imgwrap" data-pos={position}>
                                            <div className="column__item-img" style={{backgroundImage: `url(${item.picServer}/${item.images[0].name})`}}></div>
                                        </div>
                                        <figcaption className="column__item-caption">
                                            <span>{item.mainData.manufacturer.name} {item.mainData.model.name}</span>
                                            <span>{vehiclePrice}</span>
                                        </figcaption>
                                    </figure>
                                );
                            })}
                        </div>
                    </div>

                    <div className="column-wrap column-wrap--height">
                        <div className="column">
                            {vehicleColumns[2].map((item, key) => {
                                const vehiclePrice = new Intl.NumberFormat('be-NL', {
                                    style: 'currency',
                                    currency: item.prices.currency
                                }).format(item.prices.price);

                                const position = 3 + (key * totalColumns);
                                        
                                return(
                                    <figure className="column__item" key={position}>
                                        <div className="column__item-imgwrap" data-pos={position}>
                                            <div className="column__item-img" style={{backgroundImage: `url(${item.picServer}/${item.images[0].name})`}}></div>
                                        </div>
                                        <figcaption className="column__item-caption">
                                            <span>{item.mainData.manufacturer.name} {item.mainData.model.name}</span>
                                            <span>{vehiclePrice}</span>
                                        </figcaption>
                                    </figure>
                                );
                            })}
                        </div>
                    </div>

                    {/* {vehicleColumns.map((column, id) => {
                        return(
                            <div className={`column-wrap ${(id + 1) % 2 !== 0 ? "column-wrap--height" : "" }`} key={id}>
                                <div className="column" data-scroll-section={ (id + 1) % 2 === 0 ? true : false }>
                                    {column.map((item, key) => {
                                        const vehiclePrice = new Intl.NumberFormat('be-NL', {
                                            style: 'currency',
                                            currency: item.prices.currency
                                        }).format(item.prices.price);

                                        const position = key + 1;
                                        
                                        return(
                                            <figure className="column__item" key={position}>
                                                <div className="column__item-imgwrap" data-pos={position}>
                                                    <div className="column__item-img" style={{backgroundImage: `url(${item.picServer}/${item.images[0].name})`}}></div>
                                                </div>
                                                <figcaption className="column__item-caption">
                                                    <span>{item.mainData.manufacturer.name} {item.mainData.model.name}</span>
                                                    <span>{vehiclePrice}</span>
                                                </figcaption>
                                            </figure>
                                        )
                                    })}
                                </div>
                            </div>
                        );
                    })} */}

				    {/*<div className="column-wrap column-wrap--height">
                        <div className="column" data-scroll-section={false}>
                            <figure className="column__item">
                                <div className="column__item-imgwrap" data-pos="2">
                                    <div className="column__item-img" style={{backgroundImage: `url(https://via.placeholder.com/850)`}}></div>
                                </div>
                                <figcaption className="column__item-caption">
                                    <span>Cyber Blue</span>
                                    <span>2011</span>
                                </figcaption>
                            </figure>
                            <figure className="column__item">
                                <div className="column__item-imgwrap" data-pos="5">
                                    <div className="column__item-img" style={{backgroundImage: `url(https://via.placeholder.com/850)`}}></div>
                                </div>
                                <figcaption className="column__item-caption">
                                    <span>Gnostic Will</span>
                                    <span>2012</span>
                                </figcaption>
                            </figure>
                            <figure className="column__item">
                                <div className="column__item-imgwrap" data-pos="8">
                                    <div className="column__item-img" style={{backgroundImage: `url(https://via.placeholder.com/850)`}}></div>
                                </div>
                                <figcaption className="column__item-caption">
                                    <span>French Kiss</span>
                                    <span>2013</span>
                                </figcaption>
                            </figure>
                        </div>
                    </div>

                    <div className="column-wrap">
                        <div className="column" data-scroll-section={true}>
                            <figure className="column__item">
                                <div className="column__item-imgwrap" data-pos="1">
                                    <div className="column__item-img" style={{backgroundImage: `url(https://via.placeholder.com/850)`}}></div>
                                </div>
                                <figcaption className="column__item-caption">
                                    <span>Cyber Blue</span>
                                    <span>2011</span>
                                </figcaption>
                            </figure>
                            <figure className="column__item">
                                <div className="column__item-imgwrap" data-pos="4">
                                    <div className="column__item-img" style={{backgroundImage: `url(https://via.placeholder.com/850)`}}></div>
                                </div>
                                <figcaption className="column__item-caption">
                                    <span>Gnostic Will</span>
                                    <span>2012</span>
                                </figcaption>
                            </figure>
                            <figure className="column__item">
                                <div className="column__item-imgwrap" data-pos="7">
                                    <div className="column__item-img" style={{backgroundImage: `url(https://via.placeholder.com/850)`}}></div>
                                </div>
                                <figcaption className="column__item-caption">
                                    <span>French Kiss</span>
                                    <span>2013</span>
                                </figcaption>
                            </figure>
                        </div>
                    </div>

                    <div className="column-wrap column-wrap--height">
                        <div className="column" data-scroll-section={false}>
                            <figure className="column__item">
                                <div className="column__item-imgwrap" data-pos="3">
                                    <div className="column__item-img" style={{backgroundImage: `url(https://via.placeholder.com/850)`}}></div>
                                </div>
                                <figcaption className="column__item-caption">
                                    <span>Cyber Blue</span>
                                    <span>2011</span>
                                </figcaption>
                            </figure>
                            <figure className="column__item">
                                <div className="column__item-imgwrap" data-pos="6">
                                    <div className="column__item-img" style={{backgroundImage: `url(https://via.placeholder.com/850)`}}></div>
                                </div>
                                <figcaption className="column__item-caption">
                                    <span>Gnostic Will</span>
                                    <span>2012</span>
                                </figcaption>
                            </figure>
                            <figure className="column__item">
                                <div className="column__item-imgwrap" data-pos="9">
                                    <div className="column__item-img" style={{backgroundImage: `url(https://via.placeholder.com/850)`}}></div>
                                </div>
                                <figcaption className="column__item-caption">
                                    <span>French Kiss</span>
                                    <span>2013</span>
                                </figcaption>
                            </figure>
                        </div>
                    </div>*/}
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
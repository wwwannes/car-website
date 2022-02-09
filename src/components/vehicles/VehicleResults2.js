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

    const refreshResults = useCallback(() => {
        setLoaded(false);

        getVehicleData(searchData, "search_json").then( res => {
            setVehicleData(res.data.vehicles);
            setLoaded(true);

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
            {vehicleData !== undefined && loaded &&
                <div className="columns" data-scroll-container ref={vehicleGrid}>
				    <div className="column-wrap column-wrap--height" ref={vehicleGrid}>
                        <div className="column">
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
                        <div className="column" data-scroll-section>
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
                        <div className="column">
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
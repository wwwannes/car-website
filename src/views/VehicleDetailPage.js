import {useEffect, useState} from 'react';
import { useParams } from "react-router-dom";

import { Slide } from 'react-slideshow-image';

import { CardMedia, Container, Grid, LinearProgress, Typography } from '@mui/material';
import { Box } from '@mui/system';

import CustomizedAccordions from '../components/general/CustomizedAccordions';
import FormInput from '../components/form/FormInput';
import { getVehicleData } from '../composables/ApiCalls';

import 'react-slideshow-image/dist/styles.css'

export default function VehicleDetails(){
    const params = useParams();

    const [searchData] = useState({});
    const [vehicleData, setVehicleData] = useState([]);
    const [dealerData, setDealerData] = useState([]); 
    const [optionsData, setOptionsData] = useState([]);

    const [loaded, setLoaded] = useState(false);
    
    useEffect(() => {
        getVehicleData({chiffre: params.id}, "search_json").then( res => {
            setVehicleData(res.data.vehicles[0]);
            setDealerData(res.data.dealers[0]);
            setOptionsData(Object.entries(res.data.vehicles[0].options));
            console.log(res.data);
            setLoaded(true);
        });

    }, [searchData]);

    return(
        <>
            {loaded &&
                <>
                    <Container maxWidth={"xl"} disableGutters={true} sx={{position: 'relative'}, {mt: 20}}>
                        <Grid container spacing={2}>
                            <Grid item xs={6}>
                                <Slide easing="ease" indicators={true} arrows={false} canSwipe={true}>
                                    {vehicleData.images.map((item, key) => {
                                        return(
                                            <CardMedia component="img" src={vehicleData.picServer+"/"+item.name} key={key}/>
                                        );
                                    })}
                                </Slide>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography variant="h4" component="h1" className="title">{vehicleData.mainData.manufacturer.name} {vehicleData.mainData.model.name}</Typography>
                                <Typography variant="subtitle1" component="h2" className="paragraph">{vehicleData.mainData.freetextSubModel}</Typography>

                                <Grid container spacing={2} sx={{my: 5}}>
                                    <Grid item xs={4}>
                                        {/*<MeetingRoomRoundedIcon color="primary" fontSize="small"/>*/}
                                        <Typography variant="h7">{vehicleData.mainData.doors}</Typography><br/>
                                        <Typography variant="h7" className="paragraph">Doors</Typography>
                                    </Grid>
                                    <Grid item xs={4}>
                                        {/*<EventSeatRoundedIcon color="primary" fontSize="small"/>*/}
                                        <Typography variant="h7">{vehicleData.mainData.seats}</Typography><br/>
                                        <Typography variant="h7" className="paragraph">Seats</Typography>
                                    </Grid>
                                    <Grid item xs={4}>
                                       {/*<CalendarTodayRoundedIcon color="primary" fontSize="small"/>*/}
                                        <Typography variant="h7">{vehicleData.dates.registrationDate}</Typography><br/>
                                        <Typography variant="h7" className="paragraph">First Registration</Typography>
                                    </Grid>
                                    <Grid item xs={4}>
                                        {/*<InvertColorsRoundedIcon color="primary" fontSize="small"/>*/}
                                        <Typography variant="h7">{vehicleData.mainData.colorName}</Typography><br/>
                                        <Typography variant="h7" className="paragraph">Color</Typography>
                                    </Grid>
                                    <Grid item xs={4}>
                                        {/*<SpeedRoundedIcon color="primary" fontSize="small"/>*/}
                                        <Typography variant="h7">{vehicleData.mainData.mileage}</Typography><br/>
                                        <Typography variant="h7" className="paragraph">Mileage</Typography>
                                    </Grid>
                                    <Grid item xs={4}>
                                        {/*<LocalGasStationRoundedIcon color="primary" fontSize="small"/>*/}
                                        <Typography variant="h7">{vehicleData.mainData.fuel.name}</Typography><br/>
                                        <Typography variant="h7" className="paragraph">Fuel type</Typography>
                                    </Grid>
                                </Grid>

                                <Typography variant="h4" component="h3">{dealerData.name1}</Typography>
                                <Typography variant="h6" component="h3" className="paragraph">{dealerData.street}</Typography>
                                <Typography variant="h6" component="h3" className="paragraph">{dealerData.zip}{dealerData.town ? `, ${dealerData.town}` : ""}{dealerData.region ? `, ${dealerData.region}` : ""}</Typography>
                                <Typography variant="h6" component="h3" className="highlight">{dealerData.phone}</Typography>
                            </Grid>
                        </Grid>
                    </Container>
                    <Container maxWidth={"xl"} disableGutters={true} sx={{ my: 15 }}>
                        <Typography variant='h3' align="center" className="title" sx={[{mb: 5}]}>Description.</Typography>
                        <Typography variant="paragraph" className="paragraph">{vehicleData.description}</Typography>
                    </Container>
                    <Container maxWidth={"xl"} disableGutters={true} sx={{ my: 15 }}>
                        <Typography variant='h3' align="center" className="title" sx={[{mb: 5}]}>Features.</Typography>
                        <div class="list-container options-list">
                            {/* Only show selected options for this vehicle */}
                            {optionsData.filter(item => item[1] === 1).map((item, key) => {
                                return (
                                    <Typography className="paragraph list-item" variant="caption" key={key}>
                                        {item[0]}
                                    </Typography>
                                 )
                            })}
                        </div>
                    </Container>
                    <Container maxWidth={"xl"} disableGutters={true} sx={{ my: 15 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={6}>
                                <Typography variant="h3" className="title" sx={{mb: 5}}>Specification.</Typography>
                                <CustomizedAccordions title="Performance" description={[
                                    {label: "Cylinder capacity", text: `${vehicleData.mainData.cylinderCapacity} `},
                                    {label: "Cylinder capacity (liters)", text: `${vehicleData.mainData.cylinderCapacityLiters} L`},
                                    {label: "Horsepower", text: `${vehicleData.mainData.enginePower} hp`}
                                ]}/>
                                <CustomizedAccordions title="Emission" description={[
                                    {label: "Emission", text: `${vehicleData.mainData.emission} g/km`},
                                    {label: "Emission (urban)", text: `${vehicleData.mainData.consUrban} g/km`},
                                    {label: "Emission (combined)", text: `${vehicleData.mainData.consCombined} g/km`},
                                    {label: "Emission (Ext urban)", text: `${vehicleData.mainData.consExtUrban} g/km`}
                                ]}/>
                            </Grid>
                            <Grid item xs={6}>
                                <CardMedia component="img" src="https://images.unsplash.com/photo-1416169607655-0c2b3ce2e1cc?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80"/>
                            </Grid>
                        </Grid>
                    </Container>
                    <Container maxWidth={"xl"} disableGutters={true} sx={{ my: 15 }}>
                        <Typography variant='h3' align="center" className="title" sx={[{mb: 5}]}>Contact us.</Typography>
                        <form>
                            <Grid container spacing={4}>
                                <Grid item xs={4}>
                                    <FormInput title="First name" type="text"/>
                                </Grid>
                                <Grid item xs={4}>
                                    <FormInput title="Last name" type="text"/>
                                </Grid>
                            </Grid>
                            <Grid container spacing={4}>
                                <Grid item xs={4}>
                                    <FormInput title="Phone number" type="phone"/>
                                </Grid>
                                <Grid item xs={4}>
                                    <FormInput title="Email address" type="email"/>
                                </Grid>
                            </Grid>
                            <Grid container spacing={4}>
                                <Grid item xs={12}>
                                    <FormInput title="Message" type="text" multiline rows="5"/>
                                </Grid>
                            </Grid>
                        </form>
                    </Container>
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
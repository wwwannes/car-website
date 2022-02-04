import React, {useEffect, useState} from 'react';
import { useParams } from "react-router-dom";
import PropTypes from 'prop-types';

import { CardMedia, Container, Grid, LinearProgress, Typography } from '@mui/material';
import { Box } from '@mui/system';

import CustomizedAccordions from '../components/general/CustomizedAccordions';
import FormInput from '../components/form/FormInput';
import { getVehicleData } from '../composables/ApiCalls';

function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
}
TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

export default function VehicleDetails(){
    const params = useParams();

    const [searchData] = useState({});
    const [vehicleData, setVehicleData] = useState([]); 
    const [optionsData, setOptionsData] = useState([]);

    const [loaded, setLoaded] = useState(false);

    /*const handleChange = (event, newValue) => {
        setValue(newValue);
    };*/
    
    useEffect(() => {
        getVehicleData({chiffre: params.id}, "search_json").then( res => {
            setVehicleData(res.data.vehicles[0]);
            setOptionsData(Object.entries(res.data.vehicles[0].options));
            console.log(Object.entries(res.data.vehicles[0].options));
            setLoaded(true);
        });

    }, [searchData]);

    /*const a11yProps = ((index) => {
        return {
            id: `simple-tab-${index}`,
            'aria-controls': `simple-tabpanel-${index}`,
        };
    })*/

    return(
        <>
            {loaded &&
                <>
                    <Container maxWidth={"xl"} disableGutters={true} sx={{position: 'relative'}, {mt: 20}}>
                        <Grid container spacing={2}>
                            <Grid item xs={6}>
                                <CardMedia component="img" src={vehicleData.picServer+"/"+vehicleData.images[0].name}/>
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
                        <Typography variant="h4" component="h2" className="title">Contact us.</Typography>
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
import React, {useEffect} from 'react';
import { useParams } from "react-router-dom";
import axios from 'axios';
import PropTypes from 'prop-types';

import { CardMedia, Container, Grid, LinearProgress, Tab, Tabs, Typography } from '@mui/material';
import { Box } from '@mui/system';
import InvertColorsRoundedIcon from '@mui/icons-material/InvertColorsRounded';
import SpeedRoundedIcon from '@mui/icons-material/SpeedRounded';
import CalendarTodayRoundedIcon from '@mui/icons-material/CalendarTodayRounded';
import MeetingRoomRoundedIcon from '@mui/icons-material/MeetingRoomRounded';
import EventSeatRoundedIcon from '@mui/icons-material/EventSeatRounded';
import LocalGasStationRoundedIcon from '@mui/icons-material/LocalGasStationRounded';

import CustomizedAccordions from '../components/general/CustomizedAccordions';
import FormInput from '../components/form/FormInput';

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

    const [searchData, setSearchData] = React.useState({
        gw: "search_json",
        mkey: "1-40248-2565679",
        language: 2,
        chiffre: params.id
    });
    const [vehicleData, setVehicleData] = React.useState([]); 
    const [loaded, setLoaded] = React.useState(false);
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    
    useEffect(() => {
        axios.get(
            'https://content.modix.net/soap/kfz/',
            {
                params: searchData
            }
        )
          .then(res => {
            setVehicleData(res.data.vehicles[0]);
            setLoaded(true);
            console.log(res.data)
        })
    }, [])

    const a11yProps = ((index) => {
        return {
            id: `simple-tab-${index}`,
            'aria-controls': `simple-tabpanel-${index}`,
        };
    })

    return(
        <>
            {loaded &&
                <>
                    <Container>
                        <Grid container spacing={2}>
                            <Grid item xs={6}>
                                <CardMedia component="img" src={vehicleData.picServer+"/"+vehicleData.images[0].name}/>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography variant="h4" component="h1">{vehicleData.mainData.manufacturer.name} {vehicleData.mainData.model.name}</Typography>
                                <Typography variant="subtitle1" component="h2">{vehicleData.mainData.freetextSubModel}</Typography>

                                <Grid container spacing={2}>
                                    <Grid item xs={4}>
                                        <MeetingRoomRoundedIcon color="primary" fontSize="small"/>
                                        <Typography variant="h7">Doors</Typography><br/>
                                        <Typography variant="h7">{vehicleData.mainData.doors}</Typography>
                                    </Grid>
                                    <Grid item xs={4}>
                                        <EventSeatRoundedIcon color="primary" fontSize="small"/>
                                        <Typography variant="h7">Seats</Typography><br/>
                                        <Typography variant="h7">{vehicleData.mainData.seats}</Typography>
                                    </Grid>

                                    <Grid item xs={4}>
                                        <CalendarTodayRoundedIcon color="primary" fontSize="small"/>
                                        <Typography variant="h7">First Registration</Typography><br/>
                                        <Typography variant="h7">{vehicleData.dates.registrationDate}</Typography>
                                    </Grid>
                                    <Grid item xs={4}>
                                        <InvertColorsRoundedIcon color="primary" fontSize="small"/>
                                        <Typography variant="h7">Color</Typography><br/>
                                        <Typography variant="h7">{vehicleData.mainData.colorName}</Typography>
                                    </Grid>
                                    <Grid item xs={4}>
                                        <SpeedRoundedIcon color="primary" fontSize="small"/>
                                        <Typography variant="h7">Mileage</Typography><br/>
                                        <Typography variant="h7">{vehicleData.mainData.mileage}</Typography>
                                    </Grid>
                                    <Grid item xs={4}>
                                        <LocalGasStationRoundedIcon color="primary" fontSize="small"/>
                                        <Typography variant="h7">Fuel type</Typography><br/>
                                        <Typography variant="h7">{vehicleData.mainData.fuel.name}</Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Container>
                    <Container>
                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                            <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                                <Tab label="Description" {...a11yProps(0)} />
                                <Tab label="Item Two" {...a11yProps(1)} />
                                <Tab label="Item Three" {...a11yProps(2)} />
                            </Tabs>
                        </Box>
                        <TabPanel value={value} index={0}>
                            {vehicleData.description}
                        </TabPanel>
                        <TabPanel value={value} index={1}>
                            Item Two
                        </TabPanel>
                        <TabPanel value={value} index={2}>
                            Item Three
                        </TabPanel>
                    </Container>
                    <Container>
                        <Grid container spacing={2}>
                            <Grid item xs={6}>
                                Specification.
                                <CustomizedAccordions title="Performance" description="waka waka waka"/>
                                <CustomizedAccordions title="Emission" description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget."/>
                            </Grid>
                            <Grid item xs={6}>
                                <CardMedia component="img" src="https://images.unsplash.com/photo-1416169607655-0c2b3ce2e1cc?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80"/>
                            </Grid>
                        </Grid>
                    </Container>
                    <Container>
                        Contact us.
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
import { Box, Button, Card, CardMedia, Container, Grid, Typography } from '@mui/material';
import axios from 'axios';
import React from 'react';
import { useEffect } from 'react';
import FormSelect from '../components/form/FormSelect';

export default function Homepage(){
    const [loaded, setLoaded] = React.useState(false);
    const [availableData, setAvailableData] = React.useState({});
    const [searchData, setSearchData] = React.useState({
        gw: "search_form_json",
        mkey: "1-40248-2565679",
        language: 2
    });

    const updateForm = (newValue, searchName) => {
        if(searchName === "model"){
            setSearchData(prevState => ({
                ...prevState,
                [searchName]: newValue
            }))
        }
    };

    const refreshForm = () => {
        setLoaded(false);

        axios.get(
            'https://content.modix.net/soap/kfz/',
            {
                params: searchData
            }
        )
          .then(res => {
            setAvailableData(res.data);
            setLoaded(true);
            console.log(loaded)
        })
    }

    /* componentDidMount & if searchData changes */
    useEffect(() => {
        refreshForm();
    }, [searchData]);

    return(
        <>
            <Container maxWidth={false} disableGutters={true} sx={{position: 'relative'}}>
                <Card sx={[{ mb: 15 }, {background: 'black'}]}>
                    <CardMedia
                        component="video" 
                        src="../assets/videos/production ID_4488715.mp4" 
                        autoPlay 
                        muted
                        loop
                        sx={[{opacity: 0.4}]}
                    />
                    {/*<CardMedia 
                        component="img" 
                        src="https://via.placeholder.com/1920x1080"
                        sx={{height: '100vh'}}
                    />*/}
                </Card>
                <Grid container spacing={3} sx={[
                    {width: 650},
                    {background: 'white'}, 
                    {position: 'absolute'}, 
                    {bottom: 50}, 
                    {left: '50%'},
                    {transform: 'translateX(-50%)'}
                ]}>
                    <Grid item xs={12} sx={{px: 2}}>
                        <Typography variant='h6'>Search stock</Typography>
                    </Grid>
                    <Grid item xs={5} sx={{p: 2}}>
                        <FormSelect 
                            data={availableData.manufacturer} 
                            label="Manufacturer" 
                            id="manufacturer"
                            parentCallback={updateForm}
                        />
                    </Grid>
                    <Grid item xs={5} sx={{p: 2}}>
                        <FormSelect 
                            data={availableData.model} 
                            label="Model" 
                            id="model"
                            parentCallback={updateForm}
                        />
                    </Grid>
                    <Grid item xs={2} sx={{p: 2}}>
                        <Button variant="contained">Show</Button>
                    </Grid>
                </Grid>
            </Container>

            {/* FAVORITE CARS */}
            <Container maxWidth="xl" sx={{ my: 15 }}>
                <Typography variant='h3' sx={[{fontWeight: 'bold'}, {textTransform: 'uppercase'}, {mb: 5}]}>Stock selection.</Typography>
                <Grid container spacing={4}>
                    <Grid item xs={4}>
                        <CardMedia 
                            component="img" 
                            src="https://via.placeholder.com/550x330"
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <CardMedia 
                            component="img" 
                            src="https://via.placeholder.com/550x330"
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <CardMedia 
                            component="img" 
                            src="https://via.placeholder.com/550x330"
                        />
                    </Grid>
                </Grid>
            </Container>

            {/* COMPANY PHILOSOPHY */}
            <Container maxWidth="xl" sx={{ my: 15 }}>
                <Grid container spacing={4}>
                    <Grid item xs={6}>
                        <CardMedia 
                            component="img"
                            src="https://via.placeholder.com/850"
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <Typography variant='h3' sx={[{fontWeight: 'bold'}, {textTransform: 'uppercase'}, {mb: 5}]}>Philosophy.</Typography>
                        <Typography variant="paragraph">Sed nec tincidunt leo. Phasellus risus est, finibus non viverra id, malesuada pulvinar justo. Nunc dolor ipsum, elementum et nisl id, rhoncus condimentum metus. Maecenas scelerisque erat sed dui tempor, facilisis pellentesque tellus maximus. Etiam rhoncus augue quis enim fermentum, vel tristique risus lacinia. Proin cursus urna a dolor malesuada feugiat. Donec mollis nisi quam, a maximus tortor fermentum at. Duis egestas interdum nibh, id fermentum urna vestibulum vitae. Maecenas tincidunt ullamcorper finibus. Mauris egestas lectus nec sem bibendum mollis.</Typography>
                    </Grid>
                </Grid>
            </Container>

            {/* VEHICLE PROMOTION */}
            <Container maxWidth={false} disableGutters={true} sx={[{my: 10}, {height: 550}, {position: "relative"}]}>
                <CardMedia 
                    component="img" 
                    src="https://via.placeholder.com/1920x550"
                    sx={[{position: "absolute"}]}
                />
                <Box sx={[{position: "absolute"}, {background: "white"}, {p: 3}, {right: 50}, {bottom: 50}, {width: 450}]}>
                    <Typography variant='h3' sx={[{fontWeight: 'bold'}, {textTransform: 'uppercase'}, {mb: 5}]}>Promotion.</Typography>
                    <Typography variant="paragraph">Sed nec tincidunt leo. Phasellus risus est, finibus non viverra id, malesuada pulvinar justo. Nunc dolor ipsum, elementum et nisl id, rhoncus condimentum metus.</Typography>
                </Box>
            </Container>

            {/* LOCATIONS */}
            <Container maxWidth="xl" sx={{ mt: 15, mb: 25 }}>
                <Typography variant='h3' sx={[{fontWeight: 'bold'}, {textTransform: 'uppercase'}, {mb: 5}]}>Our locations.</Typography>
                <Grid container spacing={4}>
                    <Grid item xs={6}>
                        <CardMedia 
                            component="img"
                            src="https://via.placeholder.com/850"
                        />
                        <Typography variant='h5' sx={[{fontWeight: 'bold'}, {my: 3}]}>Contact us.</Typography>
                        <Typography variant="paragraph">Sed nec tincidunt leo. Phasellus risus est, finibus non viverra id, malesuada pulvinar justo. Nunc dolor ipsum, elementum et nisl id, rhoncus condimentum metus. Maecenas scelerisque erat sed dui tempor, facilisis pellentesque tellus maximus. Etiam rhoncus augue quis enim fermentum, vel tristique risus lacinia. Proin cursus urna a dolor malesuada feugiat. Donec mollis nisi quam, a maximus tortor fermentum at. Duis egestas interdum nibh, id fermentum urna vestibulum vitae. Maecenas tincidunt ullamcorper finibus. Mauris egestas lectus nec sem bibendum mollis.</Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <CardMedia 
                            component="img"
                            src="https://via.placeholder.com/850"
                        />
                        <Typography variant='h5' sx={[{fontWeight: 'bold'}, {my: 3}]}>Contact us.</Typography>
                        <Typography variant="paragraph">Sed nec tincidunt leo. Phasellus risus est, finibus non viverra id, malesuada pulvinar justo. Nunc dolor ipsum, elementum et nisl id, rhoncus condimentum metus. Maecenas scelerisque erat sed dui tempor, facilisis pellentesque tellus maximus. Etiam rhoncus augue quis enim fermentum, vel tristique risus lacinia. Proin cursus urna a dolor malesuada feugiat. Donec mollis nisi quam, a maximus tortor fermentum at. Duis egestas interdum nibh, id fermentum urna vestibulum vitae. Maecenas tincidunt ullamcorper finibus. Mauris egestas lectus nec sem bibendum mollis.</Typography>
                    </Grid>
                </Grid>
            </Container>

            {/* INSTAGRAM */}
        </>
    );
}
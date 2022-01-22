import { Card, CardMedia, Container, Grid, Typography } from '@mui/material';
import React from 'react';

export default function Homepage(){
    return(
        <>
            <Card>
                {/*<CardMedia component="video" src="../assets/videos/homepage-city.mp4" autoPlay/>*/}
                <CardMedia 
                    component="img" 
                    src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1583&q=80"
                />
            </Card>
            <Container>
                <Grid container spacing={4}>
                    <Grid item xs={12}>
                        <Typography variant="h3" align="center">Lorem Ipsum.</Typography>
                    </Grid>
                    <Grid item xs={4}>
                        <CardMedia 
                            component="img" 
                            src="https://images.unsplash.com/photo-1504711434969-e33886168f5c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
                        />
                        <Typography variant="h6" align="center">Your Perfect Samples.</Typography>
                        <Typography variant="paragraph">With our free and speedy sample service, it's super easy to find the tile you'll love.</Typography>
                    </Grid>
                    <Grid item xs={4}>
                        <CardMedia 
                            component="img" 
                            src="https://images.unsplash.com/photo-1537511446984-935f663eb1f4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
                        />
                        <Typography variant="h6" align="center">Friendly Advice.</Typography>
                        <Typography variant="paragraph">Need some help? Our awesome customer service team can answer any of your tile questions.</Typography>
                    </Grid>
                    <Grid item xs={4}>
                        <CardMedia 
                            component="img" 
                            src="https://images.unsplash.com/photo-1518458028785-8fbcd101ebb9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
                        />
                        <Typography variant="h6" align="center">Better For Less.</Typography>
                        <Typography variant="paragraph">We handpick our tiles to make sure you'll get better tiles, at better prices, than you'll find elsewhere.</Typography>
                    </Grid>

                    <Grid item xs={6}>
                        <CardMedia 
                            component="img"
                            src="https://images.unsplash.com/photo-1525182008055-f88b95ff7980?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <Typography>Contact us.</Typography>
                        <Typography variant="paragraph">Sed nec tincidunt leo. Phasellus risus est, finibus non viverra id, malesuada pulvinar justo. Nunc dolor ipsum, elementum et nisl id, rhoncus condimentum metus. Maecenas scelerisque erat sed dui tempor, facilisis pellentesque tellus maximus. Etiam rhoncus augue quis enim fermentum, vel tristique risus lacinia. Proin cursus urna a dolor malesuada feugiat. Donec mollis nisi quam, a maximus tortor fermentum at. Duis egestas interdum nibh, id fermentum urna vestibulum vitae. Maecenas tincidunt ullamcorper finibus. Mauris egestas lectus nec sem bibendum mollis.</Typography>
                    </Grid>
                </Grid>
            </Container>
        </>
    );
}
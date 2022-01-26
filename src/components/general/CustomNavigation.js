import { Container, Grid, Typography } from "@mui/material";
import React from "react";
import { NavLink } from "react-router-dom";

export default function CustomNavigation(){

    return(
        <>
            <Container maxWidth="xl" disableGutters={false} sx={[
                {my: 1}, 
                {position: "fixed"}, 
                {zIndex: 999999}, 
                {ml: "auto"}, 
                {mr: "auto"},
                {left: '50%'},
                {top: 10},
                {transform: 'translateX(-50%)'},
                {background: 'white'}
            ]}>
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <Typography variant="h4" gutterBottom>Demo Dealer</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <nav>
                                <Grid container spacing={2}>
                                    <Grid item xs={4}>
                                        <Typography align="right" gutterBottom>
                                            <NavLink 
                                                to="vehicles" 
                                                className={(navData) => navData.isActive ? "active" : "" }
                                                style={(navData) => ({
                                                    color: navData.isActive ? "green" : "red"
                                                })}
                                            >Stock</NavLink>
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={4}>
                                        <Typography align="right" gutterBottom>
                                            <NavLink 
                                                to="philosophy" 
                                                className={(navData) => navData.isActive ? "active" : "" }
                                                style={(navData) => ({
                                                    color: navData.isActive ? "green" : "red"
                                                })}
                                            >Philosophy</NavLink>
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={4}>
                                        <Typography align="right" gutterBottom>
                                            <NavLink 
                                                to="contact" 
                                                className={(navData) => navData.isActive ? "active" : "" }
                                                style={(navData) => ({
                                                    color: navData.isActive ? "green" : "red"
                                                })}
                                            >Contact us</NavLink>
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </nav>
                        </Grid>
                    </Grid>
            </Container>
        </>
    )
}
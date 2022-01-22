import { Grid, Link, Typography } from "@mui/material";
import React from "react";
import { NavLink } from "react-router-dom";

export default function CustomNavigation(){

    return(
        <>
            <nav>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <Typography variant="h4" gutterBottom>Jimmie's Car</Typography>
                    </Grid>
                    <Grid item xs={1}>
                        <Typography align="right" gutterBottom>
                            <NavLink 
                                to="/" 
                                className={(navData) => navData.isActive ? "active" : "" }
                                style={(navData) => ({
                                    color: navData.isActive ? "green" : "red"
                                })}
                            >Home</NavLink>
                        </Typography>
                    </Grid>
                    <Grid item xs={1}>
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
                    <Grid item xs={1}>
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
                    <Grid item xs={1}>
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
        </>
    )
}
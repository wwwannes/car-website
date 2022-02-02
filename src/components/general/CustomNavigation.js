import { Container, Grid, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";

export default function CustomNavigation(){
    return(
        <>
            <Container 
                maxWidth="xl" 
                disableGutters={false} 
                className="nav-container"
                sx={[
                    {my: 1}, 
                    {position: "fixed"}, 
                    {zIndex: 999999}, 
                    {ml: "auto"}, 
                    {mr: "auto"},
                    {left: '50%'},
                    {top: 10},
                    {transform: 'translateX(-50%)'},
                ]}
            >
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <Typography variant="h4" component="h1" gutterBottom className="nav-dealer-name">Demo Dealer</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <nav>
                                <Grid container spacing={2}>
                                    <Grid item xs={4}>
                                        <Typography align="right" gutterBottom>
                                            <NavLink 
                                                to="vehicles" 
                                                className={(navData) => navData.isActive ? "active" : "" }
                                            >Stock</NavLink>
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={4}>
                                        <Typography align="right" gutterBottom>
                                            <NavLink 
                                                to="philosophy" 
                                                className={(navData) => navData.isActive ? "active" : "" }
                                            >Philosophy</NavLink>
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={4}>
                                        <Typography align="right" gutterBottom>
                                            <NavLink 
                                                to="contact" 
                                                className={(navData) => navData.isActive ? "active" : "" }
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
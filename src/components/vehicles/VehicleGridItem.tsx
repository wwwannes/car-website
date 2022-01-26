import React from 'react';
import { Card, CardActionArea, CardContent, CardMedia, Grid, Typography } from '@mui/material';
import { Link } from "react-router-dom";

import GridItem from '../../interfaces/GridItem';

export default class VehicleGridItem extends React.Component<GridItem, {}>{
    constructor (props: GridItem){
        super(props);
    }

    render(){
        return(
            <Grid item xs={this.props.numberOfColumns}>
                <Card variant="outlined">
                    <CardActionArea>
                        <Link to={`/vehicle/${this.props.manufacturer}/${this.props.model}/${this.props.id}`}>
                            <CardMedia component="img" image={this.props.picServer+"/"+this.props.image}/>
                            <CardContent>
                                <Typography gutterBottom variant="h6" component="div">{this.props.manufacturer} {this.props.model}</Typography>
                                <Typography variant="body2" color="text.secondary">{this.props.price}</Typography>
                            </CardContent>
                        </Link>
                    </CardActionArea>
                </Card>
            </Grid>
        );
    }
}
import React, {Fragment, useEffect} from 'react';

import Searchform from '../components/search/Searchform';
import VehicleGrid from '../components/vehicles/VehicleResults';

import Container from '@mui/material/Container';
import { Button, Drawer } from '@mui/material';

export default function SearchResultPage(props){
    
    const [queryData, setQueryData] = React.useState({});

    const [state, setState] = React.useState({
        left: false
    });

    const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
        return;
        }

        setState({ ...state, [anchor]: open });
    };

    useEffect(() => {
        //console.log(queryData)
    }, [queryData])

    const updateResults = (data) => {
        setQueryData(data);
    };

    return(
        <>
            <h1>SearchResultPage</h1>
            <Fragment key="left">
                <Button onClick={toggleDrawer("left", true)}>Modify search</Button>
                <Drawer
                sx={{
                    width: 300,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                    width: 300,
                    boxSizing: 'border-box',
                    },
                }}
                anchor="left"
                open={state["left"]}
                onClose={toggleDrawer("left", false)}
                >
                <Searchform 
                    parentCallback={updateResults}
                />
                </Drawer>
            </Fragment>
            <Container maxWidth="lg">
                <VehicleGrid queryData={queryData}/>
            </Container>
            </>
    );
}
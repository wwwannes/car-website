import {Fragment, useEffect, useState} from 'react';

import Searchform from '../components/search/Searchform';
import VehicleGrid from '../components/vehicles/VehicleResults2';

import Container from '@mui/material/Container';
import { Button, Drawer } from '@mui/material';

/* https://animate.style */
import 'animate.css';

export default function SearchResultPage(props){
    
    const [queryData, setQueryData] = useState({});

    const [state, setState] = useState({
        left: false
    });

    const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setState({ ...state, [anchor]: open });
    };

    const updateResults = (data) => {
        setQueryData(data)
    };

    return(
        <>
            <h1>SearchResultPage</h1>
            <div className="search-panel animate__animated animate__slideInRight">
                <Searchform 
                    parentCallback={updateResults}
                />
            </div>
            {/*<Fragment key="left">
                <Button onClick={toggleDrawer("left", true)}>Modify search</Button>
                <Drawer
                    sx={{
                        width: 450,
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
            </Fragment>*/}
            <Container maxWidth="xl">
                <VehicleGrid queryData={queryData}/>
            </Container>
        </>
    );
}
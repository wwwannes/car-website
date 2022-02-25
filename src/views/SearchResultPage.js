import {useState} from 'react';

import Searchform from '../components/search/Searchform';
import VehicleGrid from '../components/vehicles/VehicleResults2';

import Container from '@mui/material/Container';

/* https://animate.style */
import 'animate.css';

export default function SearchResultPage(){
    
    const [queryData, setQueryData] = useState({});

    const updateResults = (data) => {
        setQueryData(data);
    };

    return(
        <>
            <h1>SearchResultPage</h1>
            <div className="search-panel">
                <Searchform 
                    parentCallback={updateResults}
                />
            </div>
            <Container maxWidth="xl">
                <VehicleGrid queryData={queryData}/>
            </Container>
        </>
    );
}
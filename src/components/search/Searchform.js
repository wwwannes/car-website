import {useCallback, useContext, useEffect, useState} from 'react';
import {Container, Slide} from '@mui/material';

import searchPanelContext from '../../composables/Contexts';

import FormSlider from '../form/FormSlider';
import FormSelect from '../form/FormSelect';
import FormCheckbox from '../form/FormCheckbox';
import {getVehicleData} from '../../composables/ApiCalls';

export default function Searchform(props){
    const [searchInit, setSearchInit] = useState(false);
    const [loaded, setLoaded] = useState(false);
    const [availableData, setAvailableData] = useState({});
    const [searchData, setSearchData] = useState({});
    const [priceRange, setPriceRange] = useState([]);
    const [mileageRange, setMileageRange] = useState([]);

    const searchContext = useContext(searchPanelContext);

    const updateForm = (newValue, searchName) => {
        /* From/To logic for the sliders */
        if(newValue.length > 1){
            const minLabel = `${searchName}_from`;
            const maxLabel = `${searchName}_to`;
            setSearchData(prevState => ({
                ...prevState,
                [minLabel]: newValue[0],
                [maxLabel]: newValue[1]
            }))
        } else {
            setSearchData(prevState => ({
                ...prevState,
                [searchName]: newValue
            }))
        }
    };

    const refreshForm = useCallback(() => {
        setLoaded(false);

        getVehicleData(searchData).then( res => {
            setAvailableData(res.data);
        });
    }, [searchData]);

    useEffect(() => {
        if(availableData.found !== undefined){
            if(!searchInit){
                setPriceRange([
                    Math.floor(availableData.price[0].value / 1000) * 1000, 
                    availableData.price[1] ? Math.ceil(availableData.price[1].value / 1000) * 1000 : null
                ]);
                setMileageRange([
                    Math.floor(availableData.mileage[0].value / 1000) * 1000, 
                    availableData.mileage[1] ? Math.ceil(availableData.mileage[1].value / 1000) * 1000 : null
                ]);

                setSearchInit(true);
            }
            props.parentCallback(searchData);
            setLoaded(true);
        }
    }, [availableData]);

    /* componentDidMount & if searchData changes */
    useEffect(() => {
        refreshForm();
    }, [refreshForm]);

    return(
        <>
            <Slide direction="left" in={searchContext.isOpen}>
                <Container 
                    sx={{
                        "py": 5
                    }}
                >

                    <span onClick={searchContext.toggleSearchPanel}>Close</span><br/>

                    {availableData.found &&
                        <span>A total of <b>{availableData.found}</b> vehicles were found</span>
                    }
                    <FormSelect 
                        data={availableData.color} 
                        value={searchData.color || ''}
                        label="Color" 
                        id="color"
                        parentCallback={updateForm}
                        disabled={!loaded}
                    />
                    <FormSelect 
                        data={availableData.manufacturer} 
                        label="Manufacturer" 
                        id="manufacturer"
                        parentCallback={updateForm}
                        disabled={!loaded}
                    />
                    <FormSelect 
                        data={availableData.model} 
                        label="Model" 
                        id="model"
                        parentCallback={updateForm}
                        disabled={!loaded}
                    />
                    <FormSelect 
                        data={availableData.fuel} 
                        label="Fueltype" 
                        id="gas"
                        parentCallback={updateForm}
                        disabled={!loaded}
                    />

                    <FormSlider
                        min={priceRange[0]}
                        max={priceRange[1]}
                        step={1000}
                        id="price"
                        title="Price"
                        prefix="€"
                        parentCallback={updateForm}
                    />

                    <FormSlider
                        min={mileageRange[0]}
                        max={mileageRange[1]}
                        step={1000}
                        id="km"
                        title="Mileage"
                        suffix="km"
                        parentCallback={updateForm}
                    />

                    {/*<FormCheckbox
                        label="Leather"
                        id="leather"
                        parentCallback={updateForm}
                    />*/}
                </Container>
            </Slide>
        </>
    );
}
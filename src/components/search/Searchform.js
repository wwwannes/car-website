import React, {useCallback, useEffect} from 'react';
import axios from 'axios';
import { Container } from '@mui/material';

import FormSlider from '../form/FormSlider';
import FormSelect from '../form/FormSelect';
import FormCheckbox from '../form/FormCheckbox';

export default function Searchform(props){
    const [loaded, setLoaded] = React.useState(false);
    const [availableData, setAvailableData] = React.useState({});
    const [searchData, setSearchData] = React.useState({
        gw: "search_form_json",
        mkey: "1-40248-2565679",
        language: 2
    });
    const [priceRange, setPriceRange] = React.useState([]);
    const [mileageRange, setMileageRange] = React.useState([]);

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

        axios.get(
            'https://content.modix.net/soap/kfz/',
            {
                params: searchData
            }
        )
          .then(res => {
            setAvailableData(res.data);

            /* When initialising searchform */ 
            if(availableData.found === undefined){
                setPriceRange([Math.floor(res.data.price[0].value / 1000) * 1000, Math.ceil(res.data.price[1].value / 1000) * 1000]);
                setMileageRange([Math.floor(res.data.mileage[0].value / 1000) * 1000, Math.ceil(res.data.mileage[1].value / 1000) * 1000]);
            }

            props.parentCallback(searchData);
            setLoaded(true);
        })
    }, [searchData]);

    /* componentDidMount & if searchData changes */
    useEffect(() => {
        refreshForm();
    }, [refreshForm]);

    return(
        <Container maxWidth="ms">
            <form action="" className="">
                <div className="row p-3">
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
                </div>

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

                <FormCheckbox
                    label="Leather"
                    id="leather"
                    parentCallback={updateForm}
                />

                {/*<div className="row p-3">
                    <Box sx={{ width: 300 }}>
                        <Slider
                            min={availableData ? 0 : availableData.price[0].value}
                            max={availableData ? 10000 : availableData.price[1].value}
                            step={1000}
                            className="col"
                            id="price"
                            valueLabelDisplay="auto"
                            getAriaLabel={() => 'Temperature range'}
                            onMouseUp={updateForm}
                        />
                    </Box>
                </div>

                <div className="row p-3">
                    <FormGroup>
                        <FormControlLabel control={<Checkbox defaultChecked />} label="Label" onChange={updateForm}/>
                        <FormControlLabel disabled control={<Checkbox />} label="Disabled" onChange={updateForm}/>
                    </FormGroup>
                </div>*/}
                {availableData.found &&
                    <span>A total of <b>{availableData.found}</b> vehicles were found</span>
                }
            </form>
        </Container>
    );
}

/*export default class Searchform extends Component{
    constructor(props){
        super(props);
        this.state = {
            availableData: {},
            searchData: [],
            priceRange: [
                {value: 0},
                {value: 100000}
            ],
            selectedPriceRange: [0, 0]
        }
    }

    updateForm = (event) => {
        console.log(event);
    }

    componentDidMount() {
        axios.get(`https://content.modix.net/soap/kfz/?gw=search_form_json&mkey=1-27651-1337707&language=2`)
          .then(res => {
            this.setState({
                availableData: res.data,
                priceRange: res.data.price,
                selectedPriceRange: [res.data.price[0].value,res.data.price[1].value]
            });
            console.log(this.state);
        })
    }

    render(){
        const { availableData, priceRange, selectedPriceRange } = this.state;

        const handleChange = (event, newValue) => {
            this.setState({
                selectedPriceRange: newValue
            });
        };

        const updateForm = (newValue, searchName) => {

            console.log(this.state.searchData);

            const newQuery = {"LOL": newValue};
            this.setState(prevState => {
                return
                    ...prevState.searchData,
                    newQuery
                }
            }, () => console.log(this.state));
        }

        return(
            <div className="container">
                <form action="" className="">
                    <div className="row p-3">
                        <FormSelect 
                            data={availableData.color} 
                            label="Color" 
                            id="color"
                            parentCallback={updateForm}
                        />
                        <FormSelect 
                            data={availableData.manufacturer} 
                            label="Manufacturer" 
                            id="manufacturer"
                            parentCallback={updateForm}
                        />
                        <FormSelect 
                            data={availableData.fuel} 
                            label="Fueltype" 
                            id="fuel"
                            parentCallback={updateForm}
                        />
                    </div>

                    <FormSlider/>

                    <div className="row p-3">
                        <Box sx={{ width: 300 }}>
                            <Slider
                                min={priceRange[0].value}
                                max={priceRange[1].value}
                                step={1000}
                                className="col"
                                value={selectedPriceRange}
                                valueLabelDisplay="auto"
                                getAriaLabel={() => 'Temperature range'}
                                onChange={handleChange}
                            />
                        </Box>
                    </div>

                    <div className="row p-3">
                        <FormGroup>
                            <FormControlLabel control={<Checkbox defaultChecked />} label="Label" onChange={this.updateForm()}/>
                            <FormControlLabel disabled control={<Checkbox />} label="Disabled" onChange={this.updateForm()}/>
                        </FormGroup>
                    </div>
                    {this.state.availableData.found &&
                        <span>A total of <b>{this.state.availableData.found}</b> vehicles were found</span>
                    }
                </form>
            </div>
        );
    }
}*/
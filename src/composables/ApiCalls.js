import axios from 'axios';

const defaultSearchLink = 'https://content.modix.net/soap/kfz/';
const defaultData = {
    mkey: "1-40248-2565679",
    language: 2
}

export function getVehicleData(data, type = "search_form_json"){

    const searchData = {...defaultData, gw: type,...data}

    return axios
        .get(defaultSearchLink,
            {
                params: searchData
            }
        )
        .then(res => res)
        .catch(error => {
            console.error(error);
        });
}
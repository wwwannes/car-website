import axios from 'axios';

const defaultSearchLink = 'https://content.modix.net/soap/kfz/';
const defaultData = {
    mkey: "1-40248-2565679",
    language: 2,
    noModelIndent: 1,
    addDealers: 1
}

export function getVehicleData(data, type = "search_form_json"){

    const searchData = {...defaultData, gw: type,...data}

    return axios
        .get(defaultSearchLink,
            {
                params: searchData
            }
        )
        .then((res) => {
            return res;
        })
        .catch(error => {
            console.error(error);
        });
}
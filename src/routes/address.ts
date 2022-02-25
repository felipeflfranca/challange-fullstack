import axios from "axios";
import { Router } from 'express';
import { maps } from '../conifg/maps';

export const address = Router();

export type Address = {
    place?: string;
    number?: string;
    district?: string;
    postal_code?: string;
    city?: string;
    state?: string;
    country?: string;
    lat?: number;
    lng?: number;
};

address.get('/search', async (req, res) => {
    const { address } = req.query;

    if (address) {
        await axios({
            method: 'GET',
            url: `${maps.url}?address=${address}&key=${maps.key}`,
        }).then((response) => {
            const data = response.data;
            if (data.status === "OK") {
                const { address_components, geometry } = data.results[0];

                const addressModel: Address = {};
                
                const keys = Object.keys(address_components);
                keys.forEach(key => {
                    const type = address_components[key].types[0];
                    const value = address_components[key].long_name;

                    switch (type) {
                        case 'street_number':
                            addressModel.number = value;
                            break;
                        case 'route':
                            addressModel.place = value;
                            break;
                        case 'administrative_area_level_2':
                            addressModel.city = value;
                            break;
                        case 'administrative_area_level_1':
                            addressModel.state = value;
                            break;
                        case 'country':
                            addressModel.country = value;
                            break;
                        case 'postal_code':
                            addressModel.postal_code = value;
                            break;
                        default:
                            break;
                    }
                });

                addressModel.lat = geometry.location.lat;
                addressModel.lng = geometry.location.lng;

                res.json(addressModel);
            } else {
                res.status(404).json({ message: 'Endereço não encontrado' });
            }
        });
    } else {
        res.status(400).json({ message: 'O parâmetro "address" não foi informado' });
    };
});
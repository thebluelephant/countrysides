import React, { useEffect, useState } from "react";
import { useAppContext } from "../..";
import s from './PostRegistrationPopUp.module.scss';
import { insertOrUpdateGatheringPlacesWithAccountId } from "../../api/gathering_places.tsx";
import { updateAccountById } from "../../api/account.tsx";


type Props = {
    closePopUp: () => void
}
const PostRegistrationPopUp = ({ closePopUp }: Props) => {

    const { account } = useAppContext();
    const [showErrorMessage, seShowErrorMessage] = useState(false);
    const [cities, setCities] = useState();
    const [searchTerm, setSearchTerm] = useState('');
    const [foundedCities, setFoundedCities] = useState<[]>();
    const [form, setForm] = useState({ username: '', firstname: '', lastname: '', city: { location_name: null, location_insee: null, location_coordinates: { lat: '', lon: '' } } })

    useEffect(() => {
        const getCity = setTimeout(() => {
            if (searchTerm && cities) {
                const result = cities.filter((city) => city.location_name.toLowerCase().includes(searchTerm))
                setFoundedCities(result);
            }
        }, 1000)

        return () => clearTimeout(getCity)
    }, [searchTerm, cities])

    const loadCities = () => {
        if (!cities) {
            import('../../api/france.js').then((module) => {
                setCities(module.cities);
            });
        }
    }
    const onFormSubmit = () => {
        const userData = { firstname: form.firstname, lastname: form.lastname, username: form.username }
        updateAccountById(account.id, userData)
        insertOrUpdateGatheringPlacesWithAccountId(form.city, account.id).then((status) => {
            if (status === 201) {
                closePopUp()
            } else {
                seShowErrorMessage(true)
            }
        })
    }

    const onFoundedCityClick = (foundedCity) => {
        const coordinates = foundedCity.location_coordinates.split(", ")
        setSearchTerm(foundedCity.location_name)
        setForm({ ...form, city: { location_name: foundedCity.location_name.toLowerCase(), location_insee: foundedCity.location_insee, location_coordinates: { lat: coordinates[0], lon: coordinates[1] } } })
        setFoundedCities([])
    }
    return (
        (account && !account.username) &&
        <div className={s.popup}>

            <p>Bonjour ! Nous avons besoin d'en savoir un peu plus sur vous pour personnaliser votre experience sur Countrysides ! </p>
            {showErrorMessage && <p>Une erreur s'est produite</p>}
            <label htmlFor="username">Nom d'utilisateur</label>
            <input type="text" name="username" id="username" onChange={(e) => setForm({ ...form, username: e.target.value })} />
            <label htmlFor="firstname">Prénom</label>
            <input type="text" name="firstname" id="firstname" onChange={(e) => setForm({ ...form, firstname: e.target.value })} />
            <label htmlFor="lastname">Nom</label>
            <input type="text" name="lastname" id="lastname" onChange={(e) => setForm({ ...form, lastname: e.target.value })} />
            <div className={s.city_input}>
                <label htmlFor="city">Ville</label>
                <input onFocus={loadCities} type="text" name="city" value={searchTerm} id="city" onChange={(e) => setSearchTerm(e.target.value)} />
                {foundedCities?.map((foundedCity) =>
                    <p onClick={() => { onFoundedCityClick(foundedCity) }}>{foundedCity.location_name}</p>
                )}
            </div>
            <button onClick={onFormSubmit}>Valider</button>

        </div>

    )
};

export default PostRegistrationPopUp;
import React, { useEffect, useState } from "react";
import { useAppContext } from "../..";
import s from './PostRegistrationPopUp.module.scss';
import { insertOrUpdateGatheringPlacesWithAccountId } from "../../api/gathering_places.tsx";
import { updateAccountById } from "../../api/account.tsx";
import Title from "../Title/Title.tsx";


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
        }, 700)
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
        const userData = { firstname: form.firstname, lastname: form.lastname, location_insee: form.city.location_insee }
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
        (account && !account.location_insee) &&
        <div className={s.popupContainer}>
            <div className={s.popup}>
                <Title title="Bienvenue sur Countrysides !" />

                <p>Nous avons besoin d'en savoir un peu plus sur vous pour personnaliser votre experience ! </p>
                {showErrorMessage && <p>Une erreur s'est produite</p>}

                <div className={s.form}>
                    <span className={s.field}>
                        <label htmlFor="firstname">Prénom</label>
                        <input type="text" name="firstname" id="firstname" onChange={(e) => setForm({ ...form, firstname: e.target.value })} />
                    </span>

                    <span className={s.field}>
                        <label htmlFor="lastname">Nom</label>
                        <input type="text" name="lastname" id="lastname" onChange={(e) => setForm({ ...form, lastname: e.target.value })} />
                    </span>
                    <span className={s.field}>
                        <label htmlFor="city">Ville</label>
                        <input onFocus={loadCities} type="text" name="city" value={searchTerm} id="city" onChange={(e) => setSearchTerm(e.target.value)} />
                        {
                            !!foundedCities?.length &&
                            <div className={s.foundedCities}>
                                {foundedCities?.map((foundedCity) =>
                                    <p onClick={() => { onFoundedCityClick(foundedCity) }}>{foundedCity.location_name}</p>
                                )}
                            </div>
                        }
                    </span>
                </div>
                <button onClick={onFormSubmit}>Valider</button>
            </div>
        </div>


    )
};

export default PostRegistrationPopUp;
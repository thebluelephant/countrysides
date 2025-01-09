export const getInseeCode = async (address: string) => {
    const result = await fetch(`https://api-adresse.data.gouv.fr/search/?q=${address}`).then(response => response.json())
        .then(data => data.features[0].properties.citycode)

    return result
}


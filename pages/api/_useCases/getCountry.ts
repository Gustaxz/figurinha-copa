import { apiCountries } from "../../../assets/api";

interface IResponse {
    fifa: string
    flags: {
        png: string
    }
}

export async function getCountry(country: string) {
    const results: IResponse[] = (await apiCountries.get(`/name/${country}`)).data

    const code = results[0].fifa
    const flag = results[0].flags.png

    return {
        code,
        flag
    }
}
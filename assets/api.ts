import axios from "axios"

export const apiCountries = axios.create({
    baseURL: "https://restcountries.com/v3.1"
})

export const thisApi = axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_BASE_PATH}/api`
})
import { CarProps , FilterProps } from "@/types";

export async function fetchCars(filter : FilterProps) {
    const {manufacturer , model , year , fuel , limit} = filter;
    const url = `https://cars-by-api-ninjas.p.rapidapi.com/v1/cars?make=${manufacturer}&year=${year}&model=${model}&limit=${limit}&fuel=${fuel}`;
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '1c5b71cd1fmshb978960bd192bcep15c9dbjsn909b01800d05',
            'X-RapidAPI-Host': 'cars-by-api-ninjas.p.rapidapi.com'
        }
    };
    try {
        const response = await fetch(url, options);
        const result = await response.json();
        return result;
    } catch (error) {
        console.error(error);
    }
}

export const calculateCarRent = (city_mpg: number, year: number) => {
    const basePricePerDay = 50; // Base rental price per day in dollars
    const mileageFactor = 0.1; // Additional rate per mile driven
    const ageFactor = 0.05; // Additional rate per year of vehicle age
  
    // Calculate additional rate based on mileage and age
    const mileageRate = city_mpg * mileageFactor;
    const ageRate = (new Date().getFullYear() - year) * ageFactor;
  
    // Calculate total rental rate per day
    const rentalRatePerDay = basePricePerDay + mileageRate + ageRate;
  
    return rentalRatePerDay.toFixed(0);
  };
  
export const generateCarImageUrl = (car:CarProps , angle?:string) =>{
    const url = new URL('https://cdn.imagin.studio/getimage?&customer=injugyagogoicompany');
    const {make , year , model} = car;
    url.searchParams.append('make', make);
    url.searchParams.append('modelFamily', model.split(' ')[0]);
    url.searchParams.append('modelYear', `${year}`);
    url.searchParams.append('angle',`${angle}`);
    return `${url}`
}

export const updateSearchParams = (type:string , value:string)=>{
    const params = new URLSearchParams(window.location.search)
    params.set(type , value);
    const newPathName = `${window.location.pathname}?${params.toString()}`
    return newPathName;
}
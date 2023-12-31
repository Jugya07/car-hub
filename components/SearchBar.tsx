"use client"
import { useState } from "react"
import Image from "next/image"
import {useRouter} from "next/navigation"
import {SearchManufacturer} from "@/components"

const SearchButton = ({otherClasses}:{otherClasses:string}) => (
  <button type="submit" className={`-ml-3 z-10 ${otherClasses}`}>
    <Image src="/magnifying-glass.svg" alt="magnifying-glass" width={40} height={40} className="object-contain"/>
  </button>
)

const SearchBar = () => {
  const [manufaturer , setManufacturer] = useState("")
  const [model , setModel] = useState("")
  const Router = useRouter()
  const handleSearch = (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if(manufaturer === "" || model === "") return alert('Please fill in the searchBar')
    updateSearchParams(model.toLowerCase() , manufaturer.toLowerCase());
  }
  const updateSearchParams = (model:string , manufacturer:string) => {
    const params = new URLSearchParams(window.location.search)
    if(model){
      params.set('model' , model)
    }else{
      params.delete('model')
    }
    if(manufacturer){
      params.set('manufacturer' , manufacturer)
    }else{
      params.delete('manufacturer')
    }
    const newPathName = `${window.location.pathname}?${params.toString()}`
    Router.push(newPathName)
  }
  return (
    <form className="searchbar" onSubmit={handleSearch}>
      <div className="searchbar__item">
        <SearchManufacturer
        manufacturer={manufaturer}
        setManufacturer={setManufacturer}
        />
        <SearchButton otherClasses="sm:hidden"/>
      </div>
      <div className="searchbar__item">
        <Image src="/model-icon.png" width={25} height={25} className="absolute w-[20px] h-[20px] ml-4" alt="carmodel"/>
        <input type="text" name="model" value={model} onChange={(e)=>setModel(e.target.value)} 
        placeholder="Tiguan"
        className="searchbar__input"/>
        <SearchButton otherClasses="sm:hidden"/>
      </div>
      <SearchButton otherClasses="max-sm:hidden"/>
    </form>
  )
}

export default SearchBar
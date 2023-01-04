import React, { useEffect, useState } from 'react'

export function FilterBar({setMercado, setSearchString, searchBar = null}){
    const [mercados, setMercados] = useState(null)
    const [dropdownText, setDropdownText] = useState("Mercados")

    function onClickSearch(){
        const searchString= document.getElementById("searchBar").value
        setSearchString(searchString)
    }

    function onClickDropDownItem(mercado){
        if(mercado === null) setDropdownText("Mercados")
        else setDropdownText(mercado)
        setMercado(mercado)
    }

    useEffect(() => {
        const getMercadosData = async ()=> {
            const response = await fetch('api/mercados')
            const data = await response.json()
            setMercados(data)
        }

        getMercadosData()
        
    }, [])
    
    function useSearchBar(){
        if(searchBar != null){
            return (
                <form class="d-flex" role="search">
                    <input class="form-control me-2" id= "searchBar" type="search" placeholder="Search" aria-label="Search"/>
                    <button class="btn btn-outline-success" type="button" onClick = { () => onClickSearch()}>Search</button>
                </form>
            )
        }
    }

    return (
        <nav class="navbar bg-light">
        <div class = "container-fluid">
            {mercados && <div class="dropdown">
                <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                    {dropdownText}
                </button>
                <ul class="dropdown-menu">
                    {dropdownText != "Mercados" && <li><button class="dropdown-item" onClick={() => onClickDropDownItem(null)}>Todos</button></li>}
                    {mercados.map(mercado => 
                        <li><button class="dropdown-item" onClick={() => onClickDropDownItem(mercado)}>{mercado}</button></li>
                    )}
                </ul>
                </div>}
            {useSearchBar()}
        </div>
        </nav>
    )
}
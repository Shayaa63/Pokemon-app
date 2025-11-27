import { useState, useEffect } from 'react'

function Pokemon({ name }) {
    useEffect(() => {
        fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
        .then((response) => response.json())
        .then((data) => {
            console.log(data);})
    }, [name]);


    return (
    <div>
        
    </div>
    )
}
export default Pokemon

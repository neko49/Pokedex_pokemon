import './pokemonCard.css'
import React from "react";
import { Link } from "react-router-dom"



function PokemonCard({id, name, image, types}) {
    const style = `avatar-background thumb-container ${types[0].type.name}`;
    // const typeImg = `${process.env.PUBLIC_URL}/type-icons/${type}.png`
    
    return (
        <Link to={`/pokemon/${id}`} className="linkStyle" >
            <div className={style}>
                <div className="number"><small>#0{id}</small></div>
                <img src={image} alt={name} />
                <div className="detail-wrapper">
                    <small>
                        {types.map((type, index) =>
                            
                            <img key={index} alt={type.type.name} className="logo" src={`${process.env.PUBLIC_URL}/type-icons/${type.type.name}.png`}/>  
                            
                            
                        )}
                        
                    </small>
                    <h3>{name}</h3>
                </div>
            </div>
        </Link>
    )
}
export default PokemonCard
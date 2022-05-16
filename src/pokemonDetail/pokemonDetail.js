import React, {useEffect, useState} from 'react'
import {
    useParams,
    Link
  } from "react-router-dom"
import { Button, Grid, Paper, Avatar } from '@material-ui/core';
import PokemonCard from '../componentPokemon/pokemonCard'
import './pokemonDetail.css'

export default function PokemonDetail ()
{
    //récupérer le paramètre id passé dans l'url
    const { id } = useParams();
    const [species, setSpecies] =  useState();
    const [pokemon, setPokemon] =  useState();
    const [show, setShow] =  useState(false);
    const [nextPokemon, setNextPokemon] = useState();
    const [previousPokemon, setPreviousPokemon] = useState();

    
    const getPokemon = async (url) =>
    {

        return new Promise((resolve, reject) => {
            fetch(url)
            .then(res => res.json())
            .then(data => {
                resolve(data);
            })
        })

        // const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
        // const result = await res.json();
        
        // // console.log(result.types)
        // // return result
        // setPokemon(result)
        // // console.log(result);
    }

    
    const fetchData = async () => {
    
        let response = await getPokemon(`https://pokeapi.co/api/v2/pokemon/${id}`);
        setPokemon(response);
        
        //traitement pour le next et previous
        if( id > 1 )
        { 
            let previousResponse = await getPokemon(`https://pokeapi.co/api/v2/pokemon/${id-1}`);
            setPreviousPokemon(previousResponse)
        }
        if( id <151){
            // var nb = ;
            let nextResponse = await getPokemon(`https://pokeapi.co/api/v2/pokemon/${parseInt(id)+1}`);
            setNextPokemon(nextResponse);
        }

    
        let pokemonSpecies = await getPokemon(`https://pokeapi.co/api/v2/pokemon-species/${id}/`);
        setSpecies(pokemonSpecies)


        // let evolution = await getPokemon(`https://pokeapi.co/api/v2/evolution-chain/${id}/`)
        // setEvolution(evolution);
        setShow(true);
    };
    
    
    useEffect(() => {

        
        fetchData();// eslint-disable-next-line
    }, [])


    return(
        <Paper style={{margin:10, marginTop:20}}>
        {show && 
        
        <Grid container spacing={2}>

            <Grid item container spacing={2} xs={12}>
                
                
                    
                <Grid item md={11} xs={11} style={{paddingLeft:20}}>
                {previousPokemon &&
                    <Link to={`/pokemon/${previousPokemon.id}`} >
                    <Avatar className="linkStyle" alt={previousPokemon.name} src={previousPokemon.sprites.other.dream_world.front_default} />
                    <p style={{fontSize:10}}>previous</p>
                    </Link>}
                </Grid> 
                
                
                <Grid item md={1} xs={1} style={{textAlign:'right'}}>
                {nextPokemon && 
                    <Link className="linkStyle" to={`/pokemon/${nextPokemon.id}`} >
                    <Avatar alt={nextPokemon.name} src={nextPokemon.sprites.other.dream_world.front_default} style={{paddingLeft:"70%"}}/>
                    <p style={{fontSize:10}}>next</p>
                    </Link>}
                </Grid>

            </Grid>
           
            

            <Grid item xs={12} container spacing={2}>
                <Grid item xs={2} >
                    <Paper>
                    {pokemon != null &&
                    <PokemonCard 
                    className="pokemonCardStyle"
                    id={pokemon.id}
                    name={pokemon.name}
                    image={pokemon.sprites.other.dream_world.front_default}
                    types={pokemon.types}
                    /> }
                    </Paper>
                </Grid>
                    

                <Grid item container xs={10}>
                        
                        <Grid item xs={5} spacing={2}>
                            <h2>Bio</h2>
                            
                            <Grid item container direction="column" spacing={2}>

                                <Grid item container spacing={2}  className="item_container">
                                    <Grid item>
                                        { 
                                        `${pokemon.name}, ${pokemon.types[0].type.name} ${pokemon.types[1] && `and ${pokemon.types[1].type.name}`} pokemon.
                                        `
                                        }
                                    </Grid>
                                </Grid>
                                <Grid item container spacing={2}  className="item_container">
                                    <Grid item>
                                        Height :
                                    </Grid>
                                    <Grid item  className="item_content">
                                        {pokemon.height/10}m
                                    </Grid>
                                </Grid>
                                <Grid item container spacing={2}  className="item_container">
                                    <Grid item>
                                    Weight :
                                    </Grid>
                                    <Grid item  className="item_content">
                                    {pokemon.weight/10}kg
                                    </Grid>
                                </Grid>
                                <Grid item container spacing={2}  className="item_container">
                                    <Grid item>
                                    Abilities :
                                    </Grid>
                                    <Grid item  className="item_content">
                                        {pokemon.abilities.map((abilities, index) =>
                                            
                                            `${abilities.ability.name } `
                                            // console.log(abilities)
                                        
                                        )}
                                    </Grid>
                                </Grid>
                            
                            
                            </Grid>
                            {/* <p className="description">{ 
                                `${pokemon.name}, ${pokemon.types[0].type.name} ${pokemon.types[1] && `and ${pokemon.types[1].type.name}`} pokemon.
                                `
                                }
                                {<>
                                    <p>Height :  {pokemon.height/10}m</p> 
                                    <p>Weight :  {pokemon.weight/10}kg</p> 
                                    <p>Abilities :  {pokemon.abilities.map((abilities, index) =>
                                        
                                            `${abilities.ability.name } `
                                            // console.log(abilities)
                                        
                                    )} </p> 
                                </>
                                }


                            </p> */}
                        </Grid>
                        <Grid item xs={1} spacing={2}>

                        </Grid>
                        <Grid item xs={5} spacing={2}>
                            <h2>Training</h2>
                            
                            <Grid item container direction="column" spacing={2}>
                                <Grid item container spacing={2}  className="item_container">
                                    <Grid item>
                                        Base exp :
                                    </Grid>
                                    <Grid item  className="item_content">
                                        {pokemon.base_experience}
                                    </Grid>
                                </Grid>
                                <Grid item container spacing={2}  className="item_container">
                                    <Grid item>
                                        Base happiness :
                                    </Grid>
                                    <Grid item  className="item_content">
                                        {species.base_happiness}
                                    </Grid>
                                </Grid>
                                <Grid item container spacing={2} className="item_container">
                                    <Grid item>
                                        Catch rate :
                                    </Grid>
                                    <Grid item className="item_content">
                                        {species.capture_rate}
                                    </Grid>
                                </Grid>
                                <Grid item container spacing={2} className="item_container">
                                    <Grid item>
                                        Growth rate : 
                                    </Grid>
                                    <Grid item className="item_content">
                                        {species.growth_rate.name}
                                    </Grid>
                                </Grid>

                                
                            </Grid>
                        </Grid>



                        {/* <Grid item xs={12}>
                            <h2>Evolution</h2>

                            {
                             
                             

                            }

                        </Grid> */}



                        <Grid item xs={12} container direction="column">
                            <h2>Stats</h2>

                            <Grid item container spacing={1}>
                            {pokemon.stats.map((stat, index) =>
                                <Grid item xs={2}>
                                <p>{stat.stat.name}</p>
                                <p>{stat.base_stat}</p>

                                </Grid>
                            )}
                            </Grid>
                            
                        </Grid>

                </Grid>

                    

                

            </Grid>


            <Grid item md={3} xs={12}>
                <Link className="linkStyle" to="/home"><Button style={{marginLeft:"5%"}} >Back</Button></Link>
            </Grid>
        </Grid>
        
        }
        </Paper>
    )
}
import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { ThemeContext } from '../context/theme-context';

function PokemonList() {
    const [pokemonList, setPokemonList] = useState([]);
    const [visiblePokemon, setVisiblePokemon] = useState(10);
    const { theme } = useContext(ThemeContext)

    useEffect(() => {
        async function fetchPokemon() {
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${visiblePokemon}`);

            const data = await response.json();
            setPokemonList(data.results);
        }
        fetchPokemon();
    }, [visiblePokemon]);

    const [pokemonDetails, setPokemonDetails] = useState([]);

    useEffect(() => {
        async function fetchPokemonDetails() {

            const details = await Promise.all(
                pokemonList.map(async (pokemon) => {
                    const response = await fetch(pokemon.url);
                    return response.json();
                })
            );
            setPokemonDetails(details);
        }

        if (pokemonList.length > 0) {
            fetchPokemonDetails();
        }
    }, [pokemonList]);

    const loadMorePokemon = () => {
        setVisiblePokemon(visiblePokemon + 10);
    };

    return (
        <Div style={{ color: theme.color, backgroundColor: theme.background}}>
            <H1 style={{ color: theme.color, backgroundColor: theme.background}}>Pokémon List</H1>
            <Ul>
                {pokemonDetails.map((pokemon, index) => (
                    <Li key={index}>
                        <Link to={`/pokemon/${index + 1}`}>
                            <Img src={pokemon.sprites.front_default} alt={pokemon.name} />
                            <P>{pokemon.name}</P>
                        </Link>
                    </Li>
                ))}
            </Ul>
            <button onClick={loadMorePokemon}>Carregar mais</button>
        </Div>
    );
}

const Div = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin:20px;
`

const H1 = styled.h1`
    font-size: 1.8rem;
`

const Ul = styled.ul`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
`

const Li = styled.li`
    list-style-type: none;
    display: flex;
    flex-direction: column;
    margin: 2.5rem;
    padding: 2rem;
    justify-content: center;
    background-color: lightblue;
    border-radius: 10px;
    cursor: pointer;
`

const Img = styled.img`
    width: 11rem;
`

const P = styled.p`
    display: flex;
    align-items: center;
    justify-content: center;
`

export { PokemonList }
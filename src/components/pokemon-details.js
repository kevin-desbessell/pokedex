import React, { useState, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import styled from 'styled-components';
import { ThemeContext } from '../context/theme-context';

function PokemonDetails() {
    const { id } = useParams();
    const [pokemonDetails, setPokemonDetails] = useState(null);
    const [abilitiesDetails, setAbilitiesDetails] = useState([]);
    const { theme } = useContext(ThemeContext)

    useEffect(() => {
        const fetchPokemonDetails = async () => {
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
            const data = await response.json();
            setPokemonDetails(response.ok ? data : null);

            const abilities = data.abilities.map((ability) => ability.ability.url);
            fetchAbilitiesDetails(abilities);
        };
        fetchPokemonDetails();
    }, [id]);

    const fetchAbilitiesDetails = async (abilities) => {
        const promises = abilities.map(async (abilityUrl) => {
            const response = await fetch(abilityUrl);
            const data = await response.json();
            return data;
        });
        const abilitiesData = await Promise.all(promises);
        setAbilitiesDetails(abilitiesData);
    };

    return (
        <div style={{ color: theme.color, backgroundColor: theme.background}}>
            <Link to={'/'} style={{ color: theme.color, backgroundColor: theme.background}}>Voltar para o menu principal</Link>
            <H1 style={{ color: theme.color, backgroundColor: theme.background}}>Pokémon Details</H1>
            {pokemonDetails && (
                <Div>
                    <Img src={pokemonDetails.sprites.front_default} alt={pokemonDetails.name} />
                    <h2>{pokemonDetails.name}</h2>
                    <h3>Abilities:</h3>
                    <Ul>
                        {abilitiesDetails.map((ability, index) => (
                            <li key={index}>
                                {ability.name} - {ability.effect_entries[0].effect}
                            </li>
                        ))}
                    </Ul>
                    <h3>Moves:</h3>
                    <Ul2>
                        {pokemonDetails.moves.map((move, index) => (
                            <li key={index}>{move.move.name}</li>
                        ))}
                    </Ul2>
                    <h3>Type:</h3>
                    <p>{pokemonDetails.types[0].type.name}</p>
                </Div>
            )}
        </div>
    );
}

const H1 = styled.h1`
    display: flex;
    justify-content: center;
    align-items: center;
`

const Div = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: lightblue;
    border-radius: 15px;
    margin: 1rem 6rem;
    `

const Img = styled.img`
    width: 10rem;
    margin-top: 2rem;
`

const Ul = styled.ul`
    list-style-type: none;
`

const Ul2 = styled.ul`
    list-style-type: none;
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    margin: 1rem;
    `

export { PokemonDetails }
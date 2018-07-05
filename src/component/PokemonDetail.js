import React from 'react';
import './PokemonDetail.css'
const imageDir = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/';

class PokemonDetail extends React.Component {

    constructor(props){
        super(props);

        this.modifyName = this.modifyName.bind(this);
    }

    modifyName(modName) {
        //const modName = this.props.pokemonInfo.name;
        if(modName){
        return modName
            .replace(/-/g,' ') //removes the dash
            .toLowerCase()
            .split(' ')
            .map(function(word) {
              return word[0].toUpperCase() + word.substr(1); //make the first letter of each word capitalized
            })
            .join(' ');
        }
    }
    
    render() {

        return (
            <div>
                <div className ="spriteImage">
                    <img className="adjustRatio" alt= "" src={`${imageDir}${this.props.targetID}.png`}/> 
                </div>
                
                <div className ="dataWrapper">
                    <h4> ID: {this.props.pokemonInfo.id} </h4>
                    <h4> Name: {this.modifyName(this.props.pokemonInfo.name)}  </h4>
                    <h4> Type: {this.modifyName(this.props.pokemonInfo.type)} {this.modifyName(this.props.secondType)} </h4>
                    <h4> Height: {this.props.pokemonInfo.height} </h4>
                    <h4> Weight: {this.props.pokemonInfo.weight} </h4>
                </div>
            </div>
        )
           
        
    }
}

export default PokemonDetail;
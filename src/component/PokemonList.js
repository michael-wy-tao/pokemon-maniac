import React from 'react';
import './PokemonList.css'
const imageDir = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/';

class PokemonList extends React.Component{
    
    spriteList(){
        const pokeNames = this.props.name;
        const pokeIDs = this.props.pokeID;

        let cells = [];
        for (let i = 0; i < pokeIDs.length; i++){
            cells.push(
                <button className = "button" onClick = {this.handleClick.bind(this, pokeIDs[i])} key={i}> 
                    <h1>{pokeNames[i]} <br/></h1>
                    <img className = "img" alt= "" src={`${imageDir}${pokeIDs[i]}.png`}/>
                </button>
            );
        }
        
        return(
                <div onError={this.addDefaultSrc}>
                    <p>{cells}</p>
                </div>
            );
        
    }

    addDefaultSrc(e){
        const defaultImage = imageDir.concat('0.png');
        e.target.src = defaultImage
    }

    handleClick(i){
        
        this.props.onClickDetail(i);

    }

    render(){
        
            return(
            
            <div >  
                {this.spriteList()}
            </div>
            
            )
        
    }

}

export default PokemonList;
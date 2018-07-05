import React from 'react';
import './App.css'
import TypeSort from "./component/TypeSort";
import PokemonList from "./component/PokemonList";
import PokemonDetail from "./component/PokemonDetail";
import PokemonDetailClass from "./component/PokemonDetailClass";
import PokeBattle from "./component/PokeBattle"

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      type: '0',
      name: [],
      pokeID: ['0'],
      targetID: '0',
      pokemonInfo: [],
      secondType: ''
    };

    this.updateType = this.updateType.bind(this);
    this.pokeSort = this.pokeSort.bind(this);
    this.onClickDetail = this.onClickDetail.bind(this);
    this.modifyName = this.modifyName.bind(this);
    this.modifyUrl = this.modifyUrl.bind(this);
  }
  
  updateType(newValue){
    
    this.setState({
      type:newValue,
    });
    
  }
  
  pokeSort = async (e) => {
    
    e.preventDefault();
    
    if (this.state.type === "0") {
      const api_call = await fetch(`https://pokeapi.co/api/v2/pokemon/?limit=802`)
      const response = await api_call.json();
      console.log(response);

      let name_a = this.state.name.slice();
      let pokeID_a = this.state.pokeID.slice();
      

      for(let k = 0; k < response.results.length; k++){
        name_a[k] = response.results[k].name
        name_a[k] = this.modifyName(name_a[k])
        pokeID_a[k] = response.results[k].url
        pokeID_a[k] = this.modifyUrl(pokeID_a[k])
      }

      name_a.splice(response.results.length, name_a.length - response.results.length); //This will clear the leftover results from previous searches
      pokeID_a.splice(response.results.length, pokeID_a.length - response.results.length);
      
      
      this.setState({
        name: name_a,
        pokeID: pokeID_a
        
      });

    }
    
    else {
      const api_call = await fetch(`https://pokeapi.co/api/v2/type/${this.state.type}`)
      const response = await api_call.json();
      console.log(response);

      let name_b = this.state.name.slice();
      let pokeID_b = this.state.pokeID.slice();
      

      for (let i = 0; i < response.pokemon.length; i++) {
        name_b[i] = response.pokemon[i].pokemon.name
        name_b[i] = this.modifyName(name_b[i])
        pokeID_b[i] = response.pokemon[i].pokemon.url
        pokeID_b[i] = this.modifyUrl(pokeID_b[i])
      }
      
      name_b.splice(response.pokemon.length, name_b.length - response.pokemon.length); //This will clear the leftover results from previous searches
      pokeID_b.splice(response.pokemon.length, pokeID_b.length - response.pokemon.length);
      
      
      this.setState({
        name: name_b,
        pokeID: pokeID_b
      });
  
    }
  }

  onClickDetail(targetId){
  
    fetch(`https://pokeapi.co/api/v2/pokemon/${targetId}`)
    .then(res => res.json()) //.then((resJson=>{console.log(resJson)}))  
    .then(data => {
      const pokemon = new PokemonDetailClass(data);
      this.setState({ pokemonInfo: pokemon });
      
      if(data.types[1])
      {
        this.setState({ secondType: data.types[1].type.name })
      }
      else{
        this.setState({ secondType:''})
      }
      
     
    })
    .catch(err => console.log(err));
   
    this.setState({
      targetID: targetId
    })
    
  }

  modifyName(str) {
    if(str){
    return str
        .replace(/-/g,' ') //removes the dash
        .toLowerCase()
        .split(' ')
        .map(function(word) {
          return word[0].toUpperCase() + word.substr(1); //make the first letter of each word capitalized
        })
        .join(' ');
      }
  }

  modifyUrl(str) {
    return str
        .replace(/\D/g,'') //removes all the non-digit character from the url
        .replace("2",''); //removes the leftover '2'

  }

  render() {
    return (
      <div className ="appWrapper">
        <div className = "pokedexBorder" >  
          <div className = "listWrapper" >
              <TypeSort 
                pokeSort = {this.pokeSort} 
                updateType = {this.updateType} />
              
              <PokemonList 
                name = {this.state.name} 
                pokeID = {this.state.pokeID} 
                onClickDetail = {this.onClickDetail} />       
          </div>
          <div className = "detailView" >
              <PokemonDetail 
                targetID = {this.state.targetID} 
                pokemonInfo= {this.state.pokemonInfo} 
                secondType = {this.state.secondType}
                
                />
          </div> 
        </div>
        <div className = "battleBorder">
              <PokeBattle 
                pokemonInfo = {this.state.pokemonInfo}
                modifyName = {this.modifyName} />
        </div>
      </div>
    );
  }
}

export default App;

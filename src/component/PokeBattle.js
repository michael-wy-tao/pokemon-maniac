import React from 'react'
import PokemonDetailClass from "./PokemonDetailClass";
import './PokeBattle.css'

const imageDir = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/';
let allySwing = false;
let enemySwing = false;
class PokeBattle extends React.Component{
    
    constructor(props){
        super(props);
        this.state = {
            
            enemyPoke: '0',
            allyPoke: '0',
            enemyPokeInfo: [],
            allyPokeInfo: [],
            allySkill: ['0'],
            enemySkill:['0'],
            allyGeneratedSkill:[],
            enemyGeneratedSkill:[],
            allySecondType: '',
            enemySecondType:'',
            enemyCurrentHp: '',
            allyCurrentHp: '',
            enemyHpPercent: 100,
            allyHpPercent: 100,
            allyChosen: false,
            enemyChosen: false,
            ready: true,
            hideFight: false,
            hideMoves: false,
            showingChooseChar: true,
            fightNow: false,
            enemyTurn: false,
            allyTurn: false
            
        }
        
        this.randomAllyPoke = this.randomAllyPoke.bind(this);
        this.randomEnemyPoke = this.randomEnemyPoke.bind(this);
        this.getAllySkill = this.getAllySkill.bind(this);
        this.getEnemySkill = this.getEnemySkill.bind(this);
        this.readyClick = this.readyClick.bind(this);
        this.useFirstSkill = this.useFirstSkill.bind(this);
        this.useSecondSkill = this.useSecondSkill.bind(this);
        this.useThirdSkill = this.useThirdSkill.bind(this);
        this.useFourthSkill = this.useFourthSkill.bind(this);
        this.enemyMove = this.enemyMove.bind(this);
        this.winOrLose = this.winOrLose.bind(this);
        this.resetAll = this.resetAll.bind(this);
        
    }
    
    randomAllyPoke(){
        
        
        const ran2 = Math.floor((Math.random() * 649) + 1);
        
        fetch(`https://pokeapi.co/api/v2/pokemon/${ran2}`)
        .then(res => res.json()) //.then((resJson=>{console.log(resJson)}))  
        .then(data => {
        const pokemon = new PokemonDetailClass(data);
        pokemon.name = this.props.modifyName(pokemon.name);
        pokemon.type = this.props.modifyName(pokemon.type);
        
        this.setState({ 
            allyPokeInfo: pokemon, 
            allyCurrentHp: data.stats[5].base_stat,
            allyChosen: true 
        });
        
        let allySkill = this.state.allySkill.slice();
        
        for(let i = 0; i < data.moves.length; i++){
            allySkill[i] = data.moves[i].move.name
            allySkill[i] = this.props.modifyName(allySkill[i])
        }

        this.setState({allySkill: allySkill})
      
        if(data.types[1])
        {
            this.setState({ allySecondType: data.types[1].type.name })
        }
        else{
            this.setState({ allySecondType:''})
        }
      
     
        })
        
        .catch(err => console.log(err));

        this.setState({
            
            allyPoke: ran2
        })
        
           
    }

    randomEnemyPoke(){
        
        const ran1 = Math.floor((Math.random() * 802) + 1);
        
        
        fetch(`https://pokeapi.co/api/v2/pokemon/${ran1}`)
        .then(res => res.json()) //.then((resJson=>{console.log(resJson)}))  
        .then(data => {
        const pokemon = new PokemonDetailClass(data);
        pokemon.name = this.props.modifyName(pokemon.name);
        pokemon.type = this.props.modifyName(pokemon.type);
        
        this.setState({ 
            enemyPokeInfo: pokemon, 
            enemyCurrentHp: data.stats[5].base_stat,
            enemyChosen: true 
        });
        
        let enemySkill = this.state.enemySkill.slice();
        
        for(let i = 0; i < data.moves.length; i++){
            enemySkill[i] = data.moves[i].move.name
            enemySkill[i] = this.props.modifyName(enemySkill[i])
        }

        this.setState({enemySkill: enemySkill})
      
        if(data.types[1])
        {
            this.setState({ enemySecondType: data.types[1].type.name })
        }
        else{
            this.setState({ enemySecondType:''})
        }
      
     
        })
        
        .catch(err => console.log(err));

        this.setState({
            enemyPoke: ran1,
            
        })
        
           
    }

    readyClick(){
        this.setState( {
            ready : false,
            showingChooseChar: false,
            fightNow: false,
            hideFight: true
        });
    }

    getAllySkill(){
        
        let allySkillSlot = this.state.allySkill.slice();
        const numSkill = this.state.allySkill.length;
        let randomSkill = 0;
        
        for(let n = 0; n < 4; n++)
            {
                randomSkill = Math.floor((Math.random() * numSkill) + 1);
                allySkillSlot[n] = allySkillSlot[randomSkill];
            }
        this.setState({
            allyGeneratedSkill: allySkillSlot,
            fightNow: true,
            hideMoves: true
            
        },function(){this.getEnemySkill()})
        
    }

    getEnemySkill(){
        let enemySkillSlot = this.state.enemySkill.slice();
        const numSkill = this.state.enemySkill.length;
        let randomSkill = 0;
        
        for(let m = 0; m< 4; m++)
        {
            randomSkill = Math.floor((Math.random() * numSkill) + 1);
            enemySkillSlot[m] = enemySkillSlot[randomSkill];
        }
        this.setState({enemyGeneratedSkill: enemySkillSlot}
           
        )
    }

    useFirstSkill(){
        if(this.winOrLose()){
            console.log("Used",this.state.allyGeneratedSkill[0]);
            let randomDamage = Math.floor((Math.random() * 20) + 1);
            let newHp = this.state.enemyCurrentHp - randomDamage;
            let percentLoss = Math.floor(((randomDamage)/this.state.enemyPokeInfo.hp)*100);
            let newPercent = this.state.enemyHpPercent - percentLoss;
            console.log("Enemy HP% left:", newPercent);

            if(newHp < 1)
            {
                newHp = 0;
            }
            if( newPercent < 1 )
            {
                newPercent = 0;
            }
            allySwing = true;
            enemySwing = false;
            this.setState({
                enemyTurn: true, 
                enemyHpPercent: newPercent,
                enemyCurrentHp: newHp
            })
            
            setTimeout(function(){
                this.enemyMove();
            }.bind(this), 2400);
        }
        else{
            this.resetAll();
        }
            
    }

    useSecondSkill(){
        if(this.winOrLose()){
            console.log("Used",this.state.allyGeneratedSkill[1]);
            let randomDamage = Math.floor((Math.random() * 20) + 1);
            let newHp = this.state.enemyCurrentHp - randomDamage;
            let percentLoss = Math.floor(((randomDamage)/this.state.enemyPokeInfo.hp)*100);
            let newPercent = this.state.enemyHpPercent - percentLoss;
            console.log("Enemy HP% left:", newPercent);

            if(newHp < 1)
            {
                newHp = 0;
            }
            if( newPercent < 1 )
            {
                newPercent = 0;
            }
            allySwing = true;
            enemySwing = false;
            this.setState({
                enemyTurn: true, 
                enemyHpPercent: newPercent,
                enemyCurrentHp: newHp
            })
            
            setTimeout(function(){
                this.enemyMove();
            }.bind(this), 2400);
        }
        else{
            this.resetAll();
        }
    }

    useThirdSkill(){
        if(this.winOrLose()){
            console.log("Used",this.state.allyGeneratedSkill[2]);
            let randomDamage = Math.floor((Math.random() * 20) + 1);
            let newHp = this.state.enemyCurrentHp - randomDamage;
            let percentLoss = Math.floor(((randomDamage)/this.state.enemyPokeInfo.hp)*100);
            let newPercent = this.state.enemyHpPercent - percentLoss;
            console.log("Enemy HP% left:", newPercent);

            if(newHp < 1)
            {
                newHp = 0;
            }
            if( newPercent < 1 )
            {
                newPercent = 0;
            }
            allySwing = true;
            enemySwing = false;
            this.setState({
                enemyTurn: true, 
                enemyHpPercent: newPercent,
                enemyCurrentHp: newHp
            })
            
            setTimeout(function(){
                this.enemyMove();
            }.bind(this), 2400);
        }
        else{
            this.resetAll();
        }
    }

    useFourthSkill(){
        if(this.winOrLose()){
            console.log("Used",this.state.allyGeneratedSkill[3]);
            let randomDamage = Math.floor((Math.random() * 20) + 1);
            let newHp = this.state.enemyCurrentHp - randomDamage;
            let percentLoss = Math.floor(((randomDamage)/this.state.enemyPokeInfo.hp)*100);
            let newPercent = this.state.enemyHpPercent - percentLoss;
            console.log("Enemy HP% left:", newPercent);

            if(newHp < 1)
            {
                newHp = 0;
            }
            if( newPercent < 1 )
            {
                newPercent = 0;
            }
            allySwing = true;
            enemySwing = false;
            this.setState({
                enemyTurn: true, 
                enemyHpPercent: newPercent,
                enemyCurrentHp: newHp
            })
            
            setTimeout(function(){
                this.enemyMove();
            }.bind(this), 2400);
        }
        else{
            this.resetAll();
        }
    }

    enemyMove(){
        
        if(this.winOrLose()){
            let oneInFour = Math.floor((Math.random() * 4) + 1);
            console.log("Enemy used",this.state.enemyGeneratedSkill[oneInFour]);
            let randomDamage = Math.floor((Math.random() * 20) + 1);
            let newHp = this.state.allyCurrentHp - randomDamage;
            let percentLoss = Math.floor(((randomDamage)/this.state.allyPokeInfo.hp)*100);
            let newPercent = this.state.allyHpPercent - percentLoss;

            if(newHp < 1)
            {
                newHp = 0;
            }
            if( newPercent < 1 )
            {
                newPercent = 0;
            }
            allySwing = false;
            enemySwing = true;
            console.log("Ally HP% left:", newPercent);
            
            this.setState({
                enemyTurn: false, 
                allyHpPercent: newPercent,
                allyCurrentHp: newHp
            })

            setTimeout(function(){
                this.winOrLose();
            }.bind(this), 100);
        }
        else{
            this.resetAll();
        }
    }

    winOrLose(){
        
        if(this.state.allyCurrentHp < 1)
        {
            alert("You Lost");
            
        }
        else if (this.state.enemyCurrentHp < 1)
        {
            alert("You Won");
            
        }
        else
        {
            return true;
        }
    }

    resetAll(){
        allySwing = false;
        enemySwing = false;
        this.setState({
            hideFight: false,
            fightNow: false,
            showingChooseChar: true,
            ready: true,
            enemyHpPercent: 100,
            allyHpPercent: 100,
            enemyCurrentHp: this.state.enemyPokeInfo.hp,
            allyCurrentHp: this.state.allyPokeInfo.hp,
            hideMoves: false
        })
    }



     
    render(){
        return(
            <div >
               
                <div className = "bottom-menu">
                        <div className ="text-box-left" style={{ display: (this.state.hideMoves ? '' : 'none') }}>
                                <button className = "button-move-top-left" 
                                        style={{ display: (this.state.fightNow ? '' : 'none') }}
                                        onClick = {this.useFirstSkill}>
                                        {this.state.allyGeneratedSkill[0]}
                                </button>
                            
                            
                                <button className = "button-move-top-right"
                                        style={{ display: (this.state.fightNow ? '' : 'none') }}
                                        onClick = {this.useSecondSkill}>
                                        {this.state.allyGeneratedSkill[1]}
                                </button>
                            
                            
                                <button className = "button-move-bot-left" 
                                        style={{ display: (this.state.fightNow ? '' : 'none') }}
                                        onClick = {this.useThirdSkill}>
                                        {this.state.allyGeneratedSkill[2]}
                                </button>
                            
                            
                                <button className = "button-move-bot-right" 
                                        style={{ display: (this.state.fightNow ? '' : 'none') }}
                                        onClick = {this.useFourthSkill}>
                                        {this.state.allyGeneratedSkill[3]}
                                </button>
                        </div>
                                
                              
                        

                        <div className = "actionMenu">
                            
                                <button className= "buttonFight" 
                                        style={{ display: (this.state.hideFight ? '' : 'none') }} 
                                        onClick = {this.getAllySkill}> 
                                        Fight 
                                </button>
                            
                            
                                <button className = "buttonBag" 
                                        style={{ display: (this.state.hideFight ? '' : 'none') }}>
                                        Bag
                                </button>
                            
                            
                                <button className = "buttonPokemon" 
                                        style={{ display: (this.state.hideFight ? '' : 'none') }}> 
                                        Pokemon
                                </button>
                            
                            
                                <button className = "buttonRun" 
                                        style={{ display: (this.state.hideFight ? '' : 'none') }}>
                                        Run
                                </button>
                            
                            <button className ="buttonRandomAlly"
                                    style={{ display: (this.state.showingChooseChar ? '' : 'none') }} 
                                    onClick = {this.randomAllyPoke}> 
                                    Random Ally! 
                            </button>
                            <button className = "buttonRandomEnemy"
                                    style={{ display: (this.state.showingChooseChar ? '' : 'none') }}
                                    onClick = {this.randomEnemyPoke}> 
                                    Random Enemy! 
                            </button>
                            <button className = {!this.state.allyChosen || !this.state.enemyChosen ? 'disabled' : "buttonReadyBattle"}
                                   
                                    style={{ display: (this.state.ready ? '' : 'none') }}
                                    onClick = {this.readyClick}> 
                                    Ready to Battle 
                            </button>
                            
                        </div>
                </div>

                <div className = "allyPokemonStat">
                    <h1 className = "pokemonName">
                        {this.state.allyPokeInfo.name}
                    </h1>
                    <h2 className = "level">
                        Level:1
                    </h2>
                    <div className = "hpAlly">
                        <div className = "hp-bar-fill" style={{width: this.state.allyHpPercent+'%'}}>
                        </div>
                    </div>
                    <div className = "allyCurrentHp" style={{ display: (this.state.allyChosen ? '' : 'none') }}>
                            {this.state.allyCurrentHp}/{this.state.allyPokeInfo.hp}
                    </div>
                </div>

                <div className = "enemyPokemonStat">
                    <h1 className = "pokemonName">
                        {this.state.enemyPokeInfo.name}
                    </h1>
                    <h2 className = "level">
                        Level:1
                    </h2>
                    <div className = "hpEnemy" >
                        <div className = "hp-bar-fill" style={{width: this.state.enemyHpPercent+'%'}}>
                        </div>    
                    </div>
                    <div className = "enemyCurrentHp" style={{ display: (this.state.enemyChosen ? '' : 'none') }}>
                    
                        {this.state.enemyCurrentHp}/{this.state.enemyPokeInfo.hp}
                                
                    </div>
                </div>

                
                <div className = "allyPokemonPlace">
                        <img className = { allySwing ? "allyAtkAnimation" : "pokemonAlly"}  alt="" src={`${imageDir}/back/${this.state.allyPoke}.png`}/>
                </div>
                <div className = "enemyPokemonPlace">
                        <img className = { enemySwing ? "enemyAtkAnimation" : "pokemonEnemy"} alt="" src={`${imageDir}${this.state.enemyPoke}.png`}/>
                </div>
                
                
                
            </div>
        )
    }
}

export default PokeBattle 
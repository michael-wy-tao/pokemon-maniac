class PokemonDetailClass {
    constructor(data) {
      this.id = data.id;
      this.name = data.name;
      this.height = data.height
      this.weight = data.weight
      this.speed = data.stats[0].base_stat
      this.specialDef = data.stats[1].base_stat
      this.specialAtk = data.stats[2].base_stat
      this.def = data.stats[3].base_stat
      this.atk = data.stats[4].base_stat
      this.hp = data.stats[5].base_stat
      this.spriteF = data.sprites.front_default;
      this.spriteB = data.sprites.back_default;
      this.type = data.types[0].type.name;  
        
    }
  }
  
  export default PokemonDetailClass;
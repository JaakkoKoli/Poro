const getType = (types) =>{
    const rarity = Math.round(Math.log10(Math.pow(Math.random()*100+1,2)))+1
    types = types.findAll(type => type.rarity===rarity)
    return(types[Math.round(Math.random()*(types.length-1))])
}

const getLevel = (exp, level) => {
    while(true){
        if(exp>level*10){
            exp-=level*10
            level++
        }
    }
    return({exp, level})
}

const getPoro = (types, user_id) => {
    const type = getType(types)
    return({
        name: type.name,
        type: type,
        owner: user_id,
        date: Date(),
        experience: 0,
        level: 0,
        healthIV: Math.round(Math.random()*10),
        attackIV: Math.round(Math.random()*10),
        defenseIV: Math.round(Math.random()*10)
    })
}

module.exports = {getPoro, getLevel}
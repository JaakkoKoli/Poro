import React from 'react';

const Poro = (props) => {
  const source = require('../poros/'+props.p.type.picture)
  return(
    <td>
      <img src={source} alt="not found" /><br />
      {props.p.name}<br />
      {'('+props.p.type.name+')'}<br />
      {'level '+props.p.level}<br />
    </td>
  )
}

const PoroRow = (props) => {
  return (
    <tr>
      {props.poros.map(poro => <Poro p={poro} key={poro._id} /> )}
    </tr>
  )
}

const Poros = (props) => {
  if(props.user===null){
    return(
      <div>
      You need to <a href="https://api.twitch.tv/kraken/oauth2/authorize?client_id=pho06vchppcq16eknimsbqagdxkxya&redirect_uri=http://localhost:3000&response_type=code">log in</a> to view your poros.
      </div>
    )
  }
  const poroList=[]
  var pointer=-1
  for(var i=0;i<props.user.poros.length;i++){
    if(i%5===0){
      pointer++
      poroList[pointer]=[]
    }
    poroList[pointer][i%5]=props.user.poros[i]
  }
  return (
    <table>
      <tbody>
        {poroList.map(l=> <PoroRow poros={l} key={l[0]._id} />)}
      </tbody>
    </table>
  )
}

export default Poros
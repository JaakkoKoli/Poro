import React from 'react';
import axios from 'axios';

const Poro = (props) => {
  const source = require('../poros/'+props.type.picture)
  return(
    <tr>
      <td>
        <img src={source} alt="not found" />
      </td>
      <td>
        {props.rarity[props.type.rarity]}
      </td>
      <td>
        {props.type.name}
      </td>
      <td>
      {props.user !== null ? (props.owned.filter(id => id===props.type._id).length>0 ? '✅' : '❌') : '❌'}
      </td>
    </tr>
  )
}


class Porodex extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      user: props.user,
      types: [],
      owned: [],
      rarity: ['unavailable','ultra rare','very rare','rare','uncommon','common']
    }
  }

  setOwned(){
    this.setState({owned: this.state.user!==null ? this.state.user.poros.map(poro => poro.type._id) : []})
  }

  componentWillMount(){
    axios.get('http://localhost:3001/data')
        .then(res => {
          this.setState({
            types: res.data.types
          })
        })
        .catch(e => console.log(e))
    this.setOwned()
  }
  
  render (){
    return(
      <table border="1px solid">
        <tbody>
          <tr>
            <td>
              Poro
            </td>
            <td>
              Name
            </td>
            <td>
              Rarity
            </td>
            <td>
              Owned
            </td>
          </tr>
          {this.state.types.map(t => <Poro key={t._id} type={t} user={this.state.user} owned={this.state.owned} rarity={this.state.rarity} />)}
        </tbody>
      </table>
    )
  }
}

export default Porodex
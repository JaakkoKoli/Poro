import React from 'react';
import axios from 'axios';

const Poro = (props) => {
  const source = require('../poros/'+props.poro.type.picture)
  return(
    <div border="1px solid">
      You received <br />
      <img src={source} alt="not found" /><br />
      {props.poro.name} <br />
      {'('+props.poro.type.name+')'} <br />
      {'level '+props.poro.level} <br />
    </div>
  )
}

class Shop extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      user: props.user,
      access_token: props.access_token,
      new_poro: null,
      set_user: props.set_user
    }
  }
  
  buyPoro = () => () => {
    if(this.state.user!==null){
      if(this.state.user.snacks>=100){
        const config = {
          "headers": {
            "access_token": this.state.access_token
          }
        }
        axios.get('http://localhost:3001/buyporo', config)
          .then(res => {
            if(res.data.user&&res.data.new_poro){
              this.state.set_user(res.data.user)
              this.setState({
                user: res.data.user,
                new_poro: res.data.new_poro
              })
              window.setTimeout(function(){this.setState({new_poro: null})}.bind(this),4000)
            }else{

            }
          })
      }
    }
  }

  render(){
      return (
      <div>
        {this.state.new_poro===null ? <button onClick={this.buyPoro()}>Buy a Poro -- 100 snacks</button> : <Poro poro={this.state.new_poro} />}
        <br />
      </div>
    )
  }
}
//<Poro poro={this.state.new_poro} />
export default Shop
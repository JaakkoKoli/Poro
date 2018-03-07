import React from 'react';

const User = (props) => {
  if(props.user!==null){
    const source = require('../poros/'+props.user.mainporo.type.picture)
    return (
      <table>
        <tbody>
          <tr>
            <td>
              <h3>{props.user.name}</h3><br />
              <img src={props.user.picture} alt="profile pic" />
            </td>
            <td>
              <h4>{props.user.mainporo.name}</h4><br />
              ({props.user.mainporo.type.name})<br />
              <img src={source} alt="poro" />
            </td>
          </tr>
        </tbody>
      </table>
    )
  }else{
    return(
      <div>
        not logged in
      </div>
    )
  }
}

export default User
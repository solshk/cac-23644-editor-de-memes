import React, { useState, useEffect } from "react";

const Api = () => {

    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetch("http://reqres.in/api/users")
            .then(data => data.json())
            .then(json => setUsers(json.data)); //aca se lo pasamos a la variable de estado
    }, []);

    // console.log({users});

  return (
    <div>
        <h2>Ejemplo de Api</h2>
        <ul>  
              {users.map( user => (
                  <li>
                      <img src={user.avatar} />
                      <p>{user.first_name}</p>
                  </li>
              ))}
        </ul>

    </div>
  )
}

export default Api;
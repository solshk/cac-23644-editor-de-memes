import React, { useState, useEffect } from "react";

const Api = () => {

    const [memes, setMemes] = useState([]);
    const [imgmeme, setImgmeme] = useState();

    useEffect(() => {
        fetch("https://api.imgflip.com/get_memes")
            .then(data => data.json())
            .then(json => setMemes(json.data.memes)); //aca se lo pasamos a la variable de estado
    }, []);

    const seleccionarImg = (e) => {
        setImgmeme(e.target.src);
        // console.log(e.target);
        // console.log(e.target.src);
    }

    return (
        
        <div>
            <figure>
                <img src={imgmeme} alt="" style={{ width: "10rem" }} />
            </figure>

            <h2>Ejemplo de Api</h2>
          
            <div className="galeria">
                {memes.map( meme => (
                    <div className="contenedor-img" >
                        <img src={meme.url} className="img" onClick={seleccionarImg} />
                    </div>))
                }                  
            </div> 
        </div>
    )
}

export default Api;
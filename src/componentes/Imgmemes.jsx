import html2canvas from "html2canvas";
import React, { useState, useEffect } from "react";

export default function Imgmemes() {
 
    // declaro las variabes de estado aca abajo
    const [memes, setMemes] = useState([]);
    const [imgmeme, setImgmeme] = useState("https://i.imgflip.com/30b1gx.jpg");
    const [textmeme, setTextmeme] = useState();

    const textomeme = (e) =>{
        setTextmeme(e.target.value);
        // console.log(e.target.value);
    }

    useEffect(() => {
        fetch("https://api.imgflip.com/get_memes")
            .then(data => data.json())
            .then(json => setMemes(json.data.memes)); //aca se lo pasamos a la variable de estado
    }, []);

    const seleccionarImg = (e) => {
        setImgmeme(e.target.src);
    }
  
    const descargar = (e) => {
        html2canvas(document.querySelector("#exportar"),
            {logging: true, letterRendering: 1, allowTaint:false, useCORS:true}).then(function (canvas){
            let img = canvas.toDataURL("memes/jpg"); 
            let link = document.createElement("a"); 
            link.download = "memepropio.jpg";  
            link.href = img;
            link.click();
        });
    }

    return (
        <div className="text-center">
            <h1>Editor de Memes</h1>

            <div className="container">
                <div className="meme-container">
                    <figure id="exportar">
                        <p className="textoMeme">{textmeme}</p>
                        <img src={imgmeme} style={{ height: "100%", width: "100%"}}/>
                    </figure>
                </div> 

                
                <div className="editor-container">
                    <h4>Seleccioná la imagen:</h4>
                    <div className="galeria-container">
                        {memes.map(meme => (
                            <div className="contenedor-img" >
                                <img src={meme.url} className="img" onClick={seleccionarImg} alt={meme.name}/>
                            </div>))
                        }               
                    </div> 

                    <div className="texto-container">
                        <h4>Ingresa el texto:</h4>
                        <input onChange={textomeme} className="form-control m-auto d-block" type="text" placeholder="Texto 1" />
                    </div>
                </div>  
            </div>

            <button onClick={descargar} type="button" className="btn btn-primary mt-4 mb-4">Descargar</button>

        </div>
    )
}
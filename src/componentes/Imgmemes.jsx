import html2canvas from "html2canvas";
import React, { useState, useEffect } from "react";

export default function Imgmemes() {

    // declaro las variabes de estado aca abajo
    const [memes, setMemes] = useState([]);
    const [imgmeme, setImgmeme] = useState("https://i.imgflip.com/30b1gx.jpg");

    const [textosMeme, setTextosMemes] = useState([{ texto: "", fontSize: "", fontFamily: "Verdana", color: "#F701D8", ejex: 10, ejey: 10 }]);


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
            { logging: true, letterRendering: 1, allowTaint: false, useCORS: true }).then(function (canvas) {
                let img = canvas.toDataURL("memes/jpg");
                let link = document.createElement("a");
                link.download = "memepropio.jpg";
                link.href = img;
                link.click();
            });
    }

    const handleClick = () => {
        setTextosMemes([...textosMeme, { texto: "Ingrese aqui el texto", fontSize: 18, fontFamily: "Verdana", color: "#F701D8", ejex: 10, ejey: 10 }]);
    }

    const handleChange = (e, i) => {
        const { name, value } = e.target
        const onChangeVal = [...textosMeme]
        onChangeVal[i][name] = value
        setTextosMemes(onChangeVal)
    }

    const handleDelete = (i) => {
        const deleteVal = [...textosMeme]
        deleteVal.splice(i, 1)
        setTextosMemes(deleteVal)
    }


    return (
        <div className="text-center">
            <h1>Editor de Memes</h1>

            <div className="container">
                <div className="meme-container">
                    <figure id="exportar">
                        {textosMeme.map((val) =>
                            <p className="texto-meme" style={{ fontSize: `${val.fontSize}px`, transform: `translate(${val.ejex}px, ${val.ejey}px)`, color: `${val.color}`, fontFamily: `${val.fontFamily}` }}>{val.texto}</p>
                        )}
                        <img src={imgmeme} className="d-block" style={{ height: "100%", width: "100%" }} alt="meme nuevo" />
                    </figure>
                </div>


                <div className="editor-container">
                    <h4>Seleccioná otra imagen:</h4>

                    <div className="galeria-container">
                        {memes.map(meme => (
                            <div className="contenedor-img" >
                                <img src={meme.url} className="img" onClick={seleccionarImg} alt={meme.name} />
                            </div>))
                        }
                    </div>

                    <div className="texto-container">
                        <div className="editor-row">
                            <h4>Ingresa el texto:</h4>
                            <button className="btn btn-primary" onClick={handleClick}>+</button>
                        </div>

                        {textosMeme.map((val, i) =>
                            <div>
                                <div className="editor-row">
                                    <input name="texto" className="form-control" type="text" placeholder="Ingresá el texto acá" onChange={(e) => handleChange(e, i)} />
                                    <input name="color" type="color" className="color" value={val.color} onChange={(e) => handleChange(e, i)} />
                                    <button className="btn btn-primary" onClick={handleDelete}>x</button>
                                </div>

                                <div className="editor-row">
                                    <div>
                                        <label>Ubicación horizontal:
                                            <input name="ejex" type="range" min="0" max="400" value={val.ejex} onChange={(e) => handleChange(e, i)} />
                                        </label>
                                        <label>Ubicación vertical:
                                            <input name="ejey" type="range" min="0" max="600" value={val.ejey} onChange={(e) => handleChange(e, i)} />
                                        </label>
                                    </div>
                                    <div>
                                        <label style={{ marginBottom: "1rem", marginRight: ".5rem" }}>Fuente:</label>
                                        <select name="fontFamily" value={val.fontFamily} onChange={(e) => handleChange(e, i)}>
                                            <option value={"Verdana"}>Verdana</option>
                                            <option value={"Impact"}>Impact</option>
                                            <option value={"Arial"}>Arial</option>
                                        </select>

                                        <label>Tamaño de la letra</label>
                                        <input name="fontSize" type="range" min="10" max="100" value={val.fontSize} onChange={(e) => handleChange(e, i)} />
                                    </div>
                                </div>
                            </div>
                        )
                        }
                    </div>
                </div>
            </div>

            <button onClick={descargar} type="button" className="btn btn-primary" id="btn-descargar">Descargar</button>

            <footer>
                <p class="footer__creditos">Hecho con ❤ por <a href="https://github.com/solshk">solshk</a></p>
            </footer>

        </div>
    )
}
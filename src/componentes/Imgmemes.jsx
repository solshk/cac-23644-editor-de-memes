import html2canvas from "html2canvas";
import React, { useState, useEffect } from "react";

export default function Imgmemes() {

    // declaro las variabes de estado aca abajo
    const [memes, setMemes] = useState([]);
    const [imgmeme, setImgmeme] = useState("https://i.imgflip.com/30b1gx.jpg");

    const [textmeme, setTextmeme] = useState();
    const [fontSize, setFontSize] = useState(25);
    const [ejex, setEjex] = useState(10);
    const [ejey, setEjey] = useState(10);
    const [color, setColor] = useState("#331462");
    const [fontFamily, setFontFamily] = useState("Verdana");

    const [textmeme2, setTextmeme2] = useState();
    const [fontSize2, setFontSize2] = useState(30);
    const [ejex2, setEjex2] = useState(20);
    const [ejey2, setEjey2] = useState(20);
    const [color2, setColor2] = useState("#F701D8");
    const [fontFamily2, setFontFamily2] = useState("Verdana");


    const textomeme = (e) => {
        setTextmeme(e.target.value);
        // console.log(e.target.value);
    }

    const textomeme2 = (e) => {
        setTextmeme2(e.target.value);
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
            { logging: true, letterRendering: 1, allowTaint: false, useCORS: true }).then(function (canvas) {
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
                        <p className="texto-meme" style={{ fontSize: `${fontSize}px`, transform: `translate(${ejex}px, ${ejey}px)`, color: `${color}`, fontFamily: `${fontFamily}` }}>{textmeme}</p>
                        <p className="texto-meme" style={{ fontSize: `${fontSize2}px`, transform: `translate(${ejex2}px, ${ejey2}px)`, color: `${color2}`, fontFamily: `${fontFamily2}` }}>{textmeme2}</p>

                        <img src={imgmeme} className="d-block" style={{ height: "100%", width: "100%" }} alt="meme nuevo" />
                    </figure>
                </div>


                <div className="editor-container">
                    <h4>Seleccioná la imagen:</h4>

                    <div className="galeria-container">
                        {memes.map(meme => (
                            <div className="contenedor-img" >
                                <img src={meme.url} className="img" onClick={seleccionarImg} alt={meme.name} />
                            </div>))
                        }
                    </div>

                    <div className="texto-container">
                        <h4>Ingresa el texto:</h4>
                        <div className="editor-row">
                            <input onChange={textomeme} className="form-control" type="text" placeholder="Texto 1" />
                            <input type="color" className="color" value={color} onChange={(e) => setColor(e.target.value)} />
                        </div>

                        <div className="editor-row">
                            <div>
                                <label>Ubicación horizontal:
                                    <input type="range" min="0" max="400" value={ejex} onChange={(e) => setEjex(e.target.value)} />
                                </label>
                                <label>Ubicación vertical:
                                    <input type="range" min="0" max="600" value={ejey} onChange={(e) => setEjey(e.target.value)} />
                                </label>
                            </div>

                            <div>
                                <label style={{marginBottom:"1rem", marginRight:".5rem"}}>Fuente:</label>
                                <select onChange={(e) => setFontFamily(e.target.value)}>
                                    <option value={"Verdana"}>Verdana</option>
                                    <option value={"Impact"}>Impact</option>
                                    <option value={"Arial"}>Arial</option>
                                </select>

                                <label>Tamaño de la letra</label>
                                <input type="range" min="10" max="100" value={fontSize} onChange={(e) => setFontSize(e.target.value)} />
                            </div>
                        </div>

                        <div className="editor-row">
                            <input onChange={textomeme2} className="form-control" type="text" placeholder="Texto 2" />
                            <input type="color" className="color" value={color2} onChange={(e) => setColor2(e.target.value)} />
                        </div>

                        <div className="editor-row">
                            <div>
                                <label>Ubicación horizontal:
                                    <input type="range" min="0" max="400" value={ejex2} onChange={(e) => setEjex2(e.target.value)} />
                                </label>
                                <label>Ubicación vertical:
                                    <input type="range" min="0" max="600" value={ejey2} onChange={(e) => setEjey2(e.target.value)} />
                                </label>
                            </div>

                            <div>
                                <label style={{ marginBottom: "1rem", marginRight: ".5rem" }}>Fuente:</label>
                                <select onChange={(e) => setFontFamily2(e.target.value)}>
                                    <option value={"Verdana"}>Verdana</option>
                                    <option value={"Impact"}>Impact</option>
                                    <option value={"Arial"}>Arial</option>
                                </select>

                                <label>Tamaño de la letra</label>
                                <input type="range" min="10" max="100" value={fontSize2} onChange={(e) => setFontSize2(e.target.value)} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <button onClick={descargar} type="button" className="btn btn-primary mt-4 mb-4">Descargar</button>

        </div>
    )
}
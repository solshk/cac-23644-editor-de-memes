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
        setTextosMemes([...textosMeme, { texto: "", fontSize: 18, fontFamily: "Verdana", color: "#F701D8", ejex: 10, ejey: 10 }]);
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
            <nav className="navbar navbar-expand-lg navbar-dark">
                <div className="container-fluid align-items-end ">
                    <h1>Editor de Memes</h1>
                    <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="offcanvas offcanvas-end text-bg-dark" tabindex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
                        <div className="offcanvas-header">
                            <h5 className="offcanvas-title" id="offcanvasNavbarLabel">Editor de Memes</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                        </div>
                        <div className="offcanvas-body">
                            <ul className="navbar-nav justify-content-end text-start flex-grow-1 pe-3">
                                <li className="nav-item ">
                                    <a className="nav-link active" aria-current="page" href="https://github.com/solshk/cac-23644-editor-de-memes">Repo</a>
                                </li>
                                <li className="nav-item">
                                    <p className="nav-link">CaC - React 2023</p>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </nav>


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

                    <div className="elegir-imagen-container">
                        <h4>Seleccioná otra imagen:</h4>
                        <div className="galeria-container">
                            {memes.map(meme => (
                                <div className="contenedor-img" key={meme.id}>
                                    <img src={meme.url} className="img" onClick={seleccionarImg} alt={meme.name} />
                                </div>))
                            }
                        </div>
                    </div>

                    <div className="texto-container">
                        <div className="editor-row">
                            <h4>Ingresa el texto:</h4>
                            <button className="btn btn-primary" id="btn-colorcito" onClick={handleClick}>+</button>
                        </div>

                        {textosMeme.map((val, i) =>
                            <div>
                                <div className="editor-row">
                                    <input name="texto" className="form-control" type="text" placeholder="Ingresá el texto acá" value={val.texto} onChange={(e) => handleChange(e, i)} />
                                    <input name="color" type="color" className="color" value={val.color} onChange={(e) => handleChange(e, i)} />
                                    <button className="btn btn-primary" id="btn-colorcito" onClick={() => handleDelete(i)}>x</button>
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
                <p className="footer__creditos">Hecho con ❤ por <a href="https://github.com/solshk">solshk</a></p>
            </footer>

        </div>
    )
}
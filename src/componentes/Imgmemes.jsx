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
        <div className="imgMemes">
            <nav class="navbar navbar-dark navbar-expand-lg">
                <div class="container-fluid">
                    <h1>Memeland</h1>
                    <button class="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasDarkNavbar" aria-controls="offcanvasDarkNavbar" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="offcanvas offcanvas-end text-bg-dark" tabindex="-1" id="offcanvasDarkNavbar" aria-labelledby="offcanvasDarkNavbarLabel">
                        <div class="offcanvas-header">
                            <h5 className="offcanvas-title" id="offcanvasNavbarLabel">Editor de Memes</h5>
                            <button type="button" class="btn-close btn-close-white" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                        </div>
                        <div class="offcanvas-body">
                            <ul class="navbar-nav justify-content-end flex-grow-1 pe-3">
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

            <main className="meme-nuevo">
                <div>
                    <figure id="exportar">
                        {textosMeme.map((val) =>
                            <p className="texto-meme" style={{ fontSize: `${val.fontSize}px`, transform: `translate(${val.ejex}px, ${val.ejey}px)`, color: `${val.color}`, fontFamily: `${val.fontFamily}` }}>{val.texto}</p>
                        )}
                        <img src={imgmeme} className="d-block" style={{ height: "100%", width: "100%" }} alt="meme nuevo" />
                    </figure>
                </div>
            </main>

            <div className="btn-descargar d-flex align-items-center justify-content-center">
                <button onClick={descargar} type="button" className="btn btn-primary" id="btn-descargar">Descargar</button>
            </div>

            <section className="text-editor">
                <div className="editor-subtitulo">
                    <h4>Ingresá el texto:</h4>
                    <button className="btn btn-primary" id="btn-colorcito" onClick={handleClick}>+</button>
                </div>

                <div>
                    {textosMeme.map((val, i) =>
                        <div className="cajita-editor">
                            <div className="editor-row">
                                <input name="texto" className="form-control editor-row-input-texto" type="text" placeholder="Ingresá el texto acá" value={val.texto} onChange={(e) => handleChange(e, i)} />
                                <input name="color" type="color" className="color" value={val.color} onChange={(e) => handleChange(e, i)} />
                                <button className="btn btn-primary" id="btn-colorcito" onClick={() => handleDelete(i)}>x</button>
                            </div>

                            <div className="editor-row">
                                <div className="editor-row-inputs container-fluid">
                                    <div>
                                        <div className="editor-row-margin d-flex align-items-center flex-wrap">
                                            <label>Ubicación X:</label>
                                            <input name="ejex" type="range" min="0" max="400" value={val.ejex} onChange={(e) => handleChange(e, i)} />
                                        </div>
                                        <div className="d-flex align-items-center flex-wrap">
                                            <label>Ubicación Y:</label>
                                            <input name="ejey" type="range" min="0" max="600" value={val.ejey} onChange={(e) => handleChange(e, i)} />
                                        </div>
                                    </div>
                                    <div>
                                        <div className="editor-row-margin d-flex align-items-center flex-wrap">
                                            <label>Tamaño fuente</label>
                                            <input name="fontSize" type="range" min="10" max="100" value={val.fontSize} onChange={(e) => handleChange(e, i)} />
                                        </div>
                                        <div className="d-flex align-items-center flex-wrap">
                                            <label>Fuente:</label>
                                            <select name="fontFamily" value={val.fontFamily} onChange={(e) => handleChange(e, i)}>
                                                <option value={"Verdana"}>Verdana</option>
                                                <option value={"Impact"}>Impact</option>
                                                <option value={"Arial"}>Arial</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                    }
                </div>
            </section>

            <section className="meme-gallery">
                <h4>Seleccioná otra imagen:</h4>
                <div className="galeria-container">
                    {memes.map(meme => (
                        <div className="contenedor-img" key={meme.id}>
                            <img src={meme.url} className="img" onClick={seleccionarImg} alt={meme.name} />
                        </div>))
                    }
                </div>
            </section>

            <footer>
                <div className="footerp">
                    <p className="footer__creditos">Hecho con ❤ por <a href="https://github.com/solshk">solshk</a></p>
                </div>
            </footer>

        </div>
    )
}
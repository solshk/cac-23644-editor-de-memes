// import html2canvas from "html2canvas";
import React, {useState} from "react";

export default function Imgmemes() {

    // declaro las variabes de estado aca abajo
    const [imgmeme, setImgmeme] = useState();
    const [textmeme, setTextmeme] = useState();

    const textomeme = (e) =>{
        setTextmeme(e.target.value);
        // console.log(e.target.value);
    }

    const seleccionarImg = (e) => {
        setImgmeme(e.target.value);
        // console.log(e.target.value);
    }


    return (
        <div className="text-center">
            <h1 className="">Editor de Memes</h1>

            <h3>Ingresa el texto:</h3>
            <input onChange={textomeme} className="form-control w-50 m-50 m-auto d-block" type="text" placeholder="Escribí acá" />

            <h3>Seleccioná la imagen:</h3>
            <select onChange={seleccionarImg} className="form-select form-select-lg mb-3 w-50 m-auto">
                <option value={1}>Futurama</option>
                <option value={2}>Bob esponja</option>
                <option value={3}>Señora</option>
                <option value={9}>Calamardo</option>
            </select>

            <figure>
                <p>{textmeme}</p>
                <img src={`./img/${imgmeme}.jpeg`} alt="" style={{ width: "10rem" }} />
                
            </figure>
        </div>
    )
}
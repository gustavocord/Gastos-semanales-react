import React, {useState} from 'react';
import Error from './Error';
import shortid from 'shortid';
import PropTypes from 'prop-types';





const Formulario = ({guardarGasto, guardarCrearGasto ,restante }) => {
    const [nombre , guardarNombre]= useState('');
    const [cantidad , guaradarCantiad]= useState(0);
    const [error , guardarError]=useState(false);
    const [mensajeError,guardarMensaje]=useState('');

    

    const agrearGasto = e =>{

        e.preventDefault();

        //validar
    
     
        if(cantidad<1 || isNaN(cantidad) || nombre.trim()===''  ) {
           
            guardarError(true);
            guardarMensaje('ambos campos son obligatorios o presupuesto incorrecto ');
            return;
        } else if ( restante - cantidad <0){
             guardarError(true);
             guardarMensaje('Usted no tiene dinero disponible para ese gasto ');
             return;
            }
        console.log(mensajeError);
        
        guardarError(false);
        //construir el gasto

        const gasto = {
                nombre,
                cantidad,
                id: shortid.generate()
        }

        //pasar el gasto al principal

        guardarGasto(gasto);  
        guardarCrearGasto(true);
        //resetar el form

        guaradarCantiad(0);
        guardarNombre('');
        
    }

    
    
    return ( 
        <form
            onSubmit={agrearGasto}
        >
            <h2>Agrega tus gastos aqui</h2>
                {error ? <Error mensaje ={mensajeError} />:null}

            <div className="campo">
                <label>Nombre Gastos</label>
                <input
                    type="text"
                    className="u-full-width"
                    placeholder="Ej. transporte"
                    value={nombre}
                    onChange={e => guardarNombre(e.target.value)}
                ></input>
            </div>
            
            <div className="campo">
                <label>Cantidad  Gastos</label>
                <input
                    type="number"
                    className="u-full-width"
                    placeholder="Ej. 300"
                    value={cantidad}
                    onChange={e => guaradarCantiad(parseInt( e.target.value ,10))}
                ></input>
            </div>
            <input
                type="submit"
                className="button-primary u-full-width"
                value="Agregar gasto"
            ></input>


        </form>
     );
}
Formulario.propTypes ={
    guardarGasto: PropTypes.func.isRequired,
    guardarCrearGasto: PropTypes.func.isRequired,
    restante: PropTypes.number.isRequired

}
export default Formulario;

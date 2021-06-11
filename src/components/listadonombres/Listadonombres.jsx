import React, { useState } from 'react';
import uniqid from 'uniqid';

export const Listadonombres = () => {
    const [nombre, setNombre] = useState('');
    const [listanombres, setListaNombres] = useState([]);
    const [modoEdicion, setModoEdicion] = useState(false);
    const [id, setId] = useState('');
    const [error, setError] = useState(null);

    const addNombre = (e) => {
        e.preventDefault();
        if (!nombre.trim()) {
            setError('El campo nombre está vacío');
            return;
        }
        const nuevoNombre = {
            id: uniqid(),
            name: nombre
        }
        setListaNombres([...listanombres, nuevoNombre]);
        setNombre('');
        setError(null);
    }

    const deleteName = (id) => {
        const nuevo_listado = listanombres.filter(name => name.id != id);
        setListaNombres(nuevo_listado);
    }

    const edicion = (item) => {
        setModoEdicion(true);
        setNombre(item.name);
        setId(item.id);
    }

    const editarNombre = (e) => {
        e.preventDefault();
        const nuevo_listado = listanombres.map(item => item.id === id ? { id:id, name:nombre } : item)
        setListaNombres(nuevo_listado);
        setModoEdicion(false);
        setNombre('');
    }

    return (
        <div>
            <h2>Aplicación de CRUD test</h2>
            <div className="row">
                <div className="col">
                    Listado de nombres
                    <ul className="list-group">
                        {
                            listanombres.map( (nombre, i) => 
                                <li key={i} className="list-group-item"> 
                                    { nombre.name } 
                                    <button 
                                        className="btn btn-danger float-right"
                                        onClick={() => deleteName(nombre.id)}
                                    >
                                        Borrar
                                    </button>
                                    <button 
                                        className="btn btn-info float-right"
                                        onClick={() => edicion(nombre)}
                                    >
                                        Editar
                                    </button>
                                </li>
                                
                            )
                        }
                    </ul>
                </div>
                <div className="col">
                    Formulario para añadir nombres
                    <form onSubmit={(modoEdicion) ? editarNombre : addNombre} className="form-group">
                        <input 
                            onChange={(e) => setNombre(e.target.value)} 
                            className="form-control mb-3" 
                            type="text" 
                            placeholder="Introduce nombre"
                            value={nombre}
                        />
                        <input 
                            className="btn btn-info btn-block form-control" 
                            type="submit" 
                            value={(modoEdicion) ? "Editar nombre" : "Registrar nombre" }
                        />
                    </form>
                    {
                        (error != null) ? (
                            <div className="alert alert-danger mt-3">
                                { error }
                            </div>
                        ) : (
                            <div></div>
                        )
                    }
                </div>
            </div>
        </div>
    )
}

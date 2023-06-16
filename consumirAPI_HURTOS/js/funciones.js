 
//al desplegar en el servidor colocar la base de datos del servidor 
const url = 'http://localhost:8084/api/hurto'

const listarDatos= async()=>{
    let respuesta=''
    let body = document.getElementById('contenido')
    //url de donde se tiene la api
    //consultar/ trabajar apis desde javascript
    fetch (url, {
        method:'GET',
        mode:'cors',
        headers:{"Content-type": "application/json; charset=UTF-8"}
    })

    //obtener la respuesta y convertirla a json 

    .then((resp)=> resp.json())
    //data contiene la informacion
    .then(function(data){
        //devuelve los datos
        let listaHurtos = data.hurtos
        //manera de llevar  rapido la lista
        return listaHurtos.map(function(hurto){
            
            respuesta+=`<tr><td>${hurto.direccion}</td>`+
            `<td>${hurto.latitud}</td>`+
            `<td>${hurto.longitud}</td>`+
            `<td>${hurto.descripcion}</td>`+
            `<td>${hurto.fecha}</td>`+
            `<td> <a class="waves-effect waves-light btn modal-trigger" href="#modal1" onclick='editar( ${JSON.stringify(hurto)})'>Editar</a><td><a class="waves-effect waves-light btn modal-danger red" href='#' onclick='eliminar(${JSON.stringify(hurto)})'>Eliminar</a></td></tr>`   
            body.innerHTML= respuesta 
            
        })
    })
}

const registrar = async() =>{

    let _direccion = document.getElementById('direccion').value
    let _latitud = document.getElementById('latitud').value
    let _longitud = document.getElementById('longitud').value

    let _descripcion = document.getElementById('descripcion').value
    let _fecha = document.getElementById('fecha').value

    if ((_direccion.length>0 && _latitud.length>0)){
        let _hurto = {
            direccion : _direccion,
            latitud : _latitud,
            longitud: _longitud,
            descripcion : _descripcion,
            fecha: _fecha
        }
        fetch (url,{
            method: 'POST',
            mode: 'cors',
            body: JSON.stringify(_hurto),//Convertir el objeto _usuario a un JSON
            headers: {"Content-type": "application/json; charset=UTF-8"}
        })
        .then((resp)=> resp.json())
        .then(json => {
         //   alert(json.msg)// mensaje que retorna la api
         Swal.fire(
            json.msg,
            '',
            'success'
          )
    })
        
    }else{
       // alert('La contraseña y la confirmación de contraseña no coinciden')
       Swal.fire(
        'La informacion no esta siendo ingresada por favor corregir',
        '',
        'error'
      )
    }   
}


const editar=(hurto)=>{
    document.getElementById('direccion').value= ''
    document.getElementById('latitud').value=''
    document.getElementById('longitud').value= ''
    document.getElementById('descripcion').value= ''
    document.getElementById('fecha').value= ''

    document.getElementById('direccion').value= hurto.direccion
    document.getElementById('latitud').value= hurto.latitud
    document.getElementById('longitud').value= hurto.longitud
    document.getElementById('descripcion').value= hurto.descripcion
    document.getElementById('fecha').value= hurto.fecha
    
}


//Actualizar editar
const actualizar = async() =>{

    let _direccion = document.getElementById('direccion').value
    let _latitud = document.getElementById('latitud').value
    let _longitud = document.getElementById('longitud').value

    let _descripcion = document.getElementById('descripcion').value
    let _fecha = document.getElementById('fecha').value

    if ((_direccion.length>0 && _latitud.length>0)){
        let _hurto = {
            direccion : _direccion,
            latitud : _latitud,
            longitud : _longitud,
            descripcion : _descripcion,
            fecha: _fecha
        }
        fetch (url,{
            method: 'PUT',
            mode: 'cors',
            body: JSON.stringify(_hurto),//Convertir el objeto _usuario a un JSON
            headers: {"Content-type": "application/json; charset=UTF-8"}
        })
        .then((resp)=> resp.json())
        .then(json => {
            alert(json.msg)
    })
        
    }else{
        alert('Los parametros no coinciden')
    }   
}


const eliminar = (id)=>{
    if(confirm('Esta seguro de realizar la eliminacion?')== true){
  
    
            let hurto = {
                _id: id
            }
            fetch (url,{
                method: 'DELETE',
                mode: 'cors',
                body: JSON.stringify(hurto),//Convertir el objeto _usuario a un JSON
                headers: {"Content-type": "application/json; charset=UTF-8"}
            })
            .then((resp)=> resp.json())
            .then(json => {
                alert(json.msg)
        })
       
    }
    
}

if(document.querySelector('#btnRegistrar')){
    document.querySelector('#btnRegistrar')
    .addEventListener('click',registrar)

}

if(document.querySelector('#btnActualizar')){
   document.querySelector('#btnActualizar')
   .addEventListener('click',actualizar)
}





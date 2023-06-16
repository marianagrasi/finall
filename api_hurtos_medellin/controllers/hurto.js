//Importar paquetes requeridos de node
const {response}= require('express')



//Importacion de los modelos 
const Hurto=require('../models/hurto')

//insercion, modificacion de datos

//consultar
const hurtoGet = async(req, res = response)=>{
    const{direccion}= req.query // desestructuracion obtiene lo que se manda del navegador
    

    //Buscar todos los hurtos colsultar los hurtos
    const hurtos = await Hurto.find()
    res.json({
        hurtos
    })
}


const hurtoPost= async(req, res= response)=>{
    //captura atributos o parametros
    const body=req.body
    let mensaje=''
    console.log(body)
   
   // const{nombre,password,rol,estado}=req.query
   // try si esta bien ejecuta lo de adentro el cath si esta malo muestra error
   try{
    const hurto= new Hurto(body) //instaciar el objeto
 

    //guardar objeto
    await hurto.save()
    mensaje='La insercion se realizo exitosamente'

   } catch(error){
    if (error) {
        if (error.name === 'ValidationError') {
            console.error(Object.values(error.errors).map(val => val.message))
            mensaje = Object.values(error.errors).map(val => val.message)
        }
    }
    console.log(mensaje)
    
       
    }


    res.json({
        msg: mensaje
    })

    
}
const hurtoPut= async(req, res= response)=>{
    //captura atributos o parametros
    const{_id, direccion, latitud, longitud, descripcion, fecha}=req.body
    let mensaje=''
    //realizar la moficiacion
   // el campo 1 es con el cual se va hacer la busqueda los demas son los campos que se va a modificar ejem nombre:nombre
    
    try{
        const hurto= await Hurto.findOneAndUpdate({_id:_id}, { direccion:direccion, latitud:latitud, longitud:longitud, descripcion:descripcion})
        mensaje='La modificacion se efectuo correctamente'

    }
    catch(error){
        mensaje='Se presentaron problemas en la modificacion'

    }

   

    res.json({
        msg: mensaje 
    })

}

const hurtoDelete= async(req, res= response)=>{
    //captura atributos o parametros
    const{_id}=req.body
    let mensaje=''
    //realizar la moficiacion
   // el campo 1 es con el cual se va hacer la busqueda los demas son los campos que se va a modificar ejem nombre:nombre
    
    try{
        const hurto= await Hurto.deleteOne({_id : _id})
        mensaje='La eliminacion se efectuo correctamente.'

    }
    catch(error){
        mensaje='Se presentaron problemas en  la eliminacion.'

    }

   

    res.json({
        msg: mensaje 
    })

}


module.exports={
    hurtoGet,
    hurtoPost,
    hurtoPut,
    hurtoDelete
}

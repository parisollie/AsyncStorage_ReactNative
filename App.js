import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Button, TouchableHighlight } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'


const App =  () => {

  //Vid 226, ver a lo que el usuario ponga 
  const [ inputTexto, guardarInputTexto] = useState('');
  //Vid 228 
  const [ nombreStorage, guardarNombreStorage] = useState('');

  //Vid 227 
  useEffect(() => {
    obtenerDatosStorage();
  }, []);

  //Vid 226, para guardar usamos el async  
  const guardarDatos = async () => {
    try {
      //con setItem guardamos lo que tenemos en el state inputTexto
      await AsyncStorage.setItem('nombre',  inputTexto);
      //Vid 228, al recargar y al momento de volver a salavar de nuevo 
      guardarNombreStorage(inputTexto)
    } catch (error) {
      console.log(error);
    }
    console.log('guardando..')
  }

  //Vid 227
  const obtenerDatosStorage = async () => {
    try {
      //Para obtener los datos usamos el get 
        const nombre = await AsyncStorage.getItem('nombre');
        guardarNombreStorage(nombre)
    } catch (error) {
      console.log(error);
    }
  }

  //Vid 228 
  const eliminarDatos = async () => {
    try {
      //Remove para eliminar 
      await AsyncStorage.removeItem('nombre');
      guardarNombreStorage('')
    } catch (error) {
      console.log(error);
    }
  }

  //Si existe el nombrestorage pon el nombre sino no pongas nada 
  return (
    <>
      <View style={styles.contenedor}>
        { nombreStorage ? <Text> Hola: {nombreStorage} </Text> : null }
          

          <TextInput 
            //Vid 225
            placeholder="Escribe tu Nombre"
            style={styles.input}
            //Vid 226 , toma el texto 
            onChangeText={ texto => guardarInputTexto(texto) } 
          />

          <Button 
            title="Guardar"
            color='#333'
            //Vid 226 , es lo que guardaremos ene ls torage 
            onPress={ () => guardarDatos() }
          />

        { nombreStorage ? (
          <TouchableHighlight
          //Vid 228 
            onPress={ () => eliminarDatos() }
            style={styles.btnEliminar}>
              <Text style={styles.textoEliminar}>Eliminar Nombre &times;</Text>
          </TouchableHighlight>
        ) : null }
  
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  contenedor: {
    flex: 1,
    backgroundColor: '#0FB8A8',
    alignItems: 'center',
    justifyContent: 'center'
  },
  input: {
    borderColor: '#666',
    borderBottomWidth: 1,
    width: 300,
    height: 40
  },
  btnEliminar: {
    backgroundColor: 'red',
    marginTop: 90,
    padding: 10,
  },
  textoEliminar: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    textTransform: 'uppercase',
    width: 300
  }

});

export default App;

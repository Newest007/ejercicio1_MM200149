import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, FlatList, TouchableHighlight, TouchableWithoutFeedback, Keyboard, Platform, StatusBar, ImageBackground } from 'react-native';
import Registro from './src/components/Datos_Empleados';
import Formulario from './src/components/Formulario';
import AsyncStorage from '@react-native-async-storage/async-storage';

//Rama Arian
const App = () => {

  const [registros, setRegistros] = useState([]);
  const [mostrarform, guardarMostrarForm] = useState(false);

  useEffect(() => {
    const obtenerRegistrosStorage = async () => {
      try {
        const registrosStorage = await AsyncStorage.getItem('registros');
        if (registrosStorage) {
          setRegistros(JSON.parse(registrosStorage))
        }
      } catch (error) {
        console.log(error);
      }
    }
    obtenerRegistrosStorage();
  }, []);


  const eliminarRegistro = id => {
    const registrosFiltrados = registros.filter(registros => registros.id !== id);
    setRegistros(registrosFiltrados);
    guardarRegistrosStorage(JSON.stringify(registrosFiltrados));
  }

  const mostrarFormulario = () => {
    guardarMostrarForm(!mostrarform);
  }

  const cerrarTeclado = () => {
    Keyboard.dismiss();
  }

  const guardarRegistrosStorage = async (registrosJSON) => {
    try {
      await AsyncStorage.setItem('registros', registrosJSON);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <ImageBackground source={require('./src/img/fondo2.jpg')}style={styles.backgroundImage}> 
      <TouchableWithoutFeedback onPress={()=> cerrarTeclado()}>
        <View style={styles.contenedor}>
          <Text style={styles.titulo}>Administrador de Empleados</Text>
          <View>
            <TouchableHighlight onPress={() => mostrarFormulario()} style={styles.btnMostrarForm}>
              <Text style={styles.textoMostrarForm}> {mostrarform ? 'Cancelar Crear Registro' : 'Crear Nuevo Registro'} </Text>
            </TouchableHighlight>
          </View>

          <View style={styles.contenido}>
            {mostrarform ? (
              <>
              <Text style={styles.titulo}>Crear Nuevo Registro</Text>
              <Formulario
              registros={registros}
              setRegistros={setRegistros}
              guardarMostrarForm={guardarMostrarForm}
              guardarRegistrosStorage={guardarRegistrosStorage}
              />
              </>
            ) : (
              <>
                <Text style={styles.titulo}> {registros.length > 0 ? 'Registros guardados:' : 'No hay registros, agrege una'} </Text>
                <FlatList
                style={styles.listado}
                data={registros}
                renderItem={({ item }) => <Registro item={item}
                eliminarRegistro={eliminarRegistro} />}
                keyExtractor={registro => registro.id}
                />
              </>
            )}
          </View>

        </View>
      </TouchableWithoutFeedback>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  contenedor: {
    
    flex: 1,
    marginTop:40
  },
  titulo: {
    color: '#FFF',
    marginTop: Platform.OS === 'ios' ? 40 : 20,
    marginBottom: 20,
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  titulo1: {
    color: '#FFF',
    marginTop: Platform.OS === 'ios' ? 40 : 20,
    marginBottom: 20,
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop:-2
    },

  contenido: {
    flex: 1,
    marginHorizontal: '2.5%',
    
  },

  listado: {
    flex: 1,
  },


  //Boton
  btnMostrarForm: {
    padding: 10,
    backgroundColor: '#2c278d',
    marginVertical: 10,
    alignItems: 'center',
    marginLeft:70,
    marginRight:70,
    borderRadius:10
  },

  textoMostrarForm: {
    color: '#FFF',
    fontWeight: 'bold',
    textAlign: 'center'
    },

    backgroundImage: {
      flex: 1,
      resizeMode: 'cover', 
      justifyContent: 'center',
      marginTop:45
    },
});
export default App;

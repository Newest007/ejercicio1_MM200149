import React, {useState} from "react";
import {Text, StyleSheet, View, TextInput, TouchableHighlight, Alert, ScrollView, Dimensions} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import shortid from "react-id-generator";
import colors from '../utils/colors';
const windowHeight = Dimensions.get('window').height;

const Formulario = ({registros, setRegistros, guardarMostrarForm, guardarRegistrosStorage }) =>
{
    
    const [nombre, guardarNombre] = useState('');
    const [apellido, guardarApellido] = useState('');
    let [añostrabajados, guardarAños] = useState(0);
    let [salario, guardarSalario] = useState(0);
    let [categoria, guardarCategoria] = useState(0);
    //const [incremento, guardarIncremento] = useState('');
    
    
    const crearNuevoRegistro = () => {
        
        //const [nuevo_salario, guardarNuevoSalario] = useState(null);

        if (nombre === '' || apellido === '' || añostrabajados === 0 || salario === 0 || categoria === 0 || añostrabajados > 29 ) {
        
        mostrarAlerta();
        return;
        }

        let incremento_años = (añostrabajados + (añostrabajados*0.03));
        let incremento_total = ((categoria * salario) + (incremento_años * salario));
        let salario_prox = (salario + incremento_total);
        //guardarNuevoSalario(salario_prox);
        
        const registro = { nombre, apellido, añostrabajados, salario, categoria, salario_prox };
        registro.id = shortid();
        console.log(registro);

        const registrosNuevos = [...registros, registro];
        setRegistros(registrosNuevos);

        guardarRegistrosStorage(JSON.stringify(registrosNuevos));

        guardarMostrarForm(false);

        guardarNombre('');
        guardarApellido('');
        guardarAños(0);
        guardarSalario(0);
        guardarCategoria(0);

    }

    const mostrarAlerta = () => {
        Alert.alert(
            'Error', //Titulo
            'Debe de llenar todos los campos, además recuerde que el máximo de años que puede trabajar son 29', 
            [{
                text:'Ok'
            }]
        )
    }
    return (
        <>
            <ScrollView style={styles.formulario}>
                <View>
                    <Text style={styles.label}>Nombre: </Text>
                    <TextInput
                    style={styles.input}
                    onChangeText={texto=>guardarNombre(texto)}
                    />
                </View>

                <View>
                    <Text style={styles.label}>Apellido: </Text>
                    <TextInput
                    style={styles.input}
                    onChangeText={texto=>guardarApellido(texto)}
                    />
                </View>

                <View>
                    <Text style={styles.label}>Años Trabajados: </Text>
                    <TextInput
                    style={styles.input}
                    onChangeText={texto=>guardarAños(parseInt(texto))}
                    keyboardType='numeric'
                    />
                </View>
        
                <View>
                    <Text style={styles.label}>Salario: </Text>
                    <TextInput
                    style={styles.input}
                    onChangeText={texto=>guardarSalario(parseFloat(texto))}
                    keyboardType='numeric'
                    />
                </View>

                <View>
                    <Text style={styles.label}>Categoria: </Text>
                    <Picker
                    selectedValue={categoria}
                    onValueChange={(itemValue) => guardarCategoria(itemValue)}>
                        <Picker.Item label="Seleccione una Categoria" value=''/>
                        <Picker.Item label="Categoría 1 : 15%" value={0.15}/>
                        <Picker.Item label="Categoría 2 : 10%" value={0.10}/>
                        <Picker.Item label="Categoría 1 : 5%" value={0.05}/>
                    </Picker>

                </View>

                <View>
                    <TouchableHighlight onPress={()=>crearNuevoRegistro()}
                    style={styles.btnSubmit}>
                        <Text style={styles.textoSubmit}>Crear Nuevo Registro</Text>
                    </TouchableHighlight>
                </View>

            </ScrollView>
        </>
    );
}

const styles = StyleSheet.create({
    formulario: {
        backgroundColor: '#FFF',
        paddingHorizontal: 20,
        paddingVertical: 10,
        height: windowHeight * 0.2,
    },
    label: {
        fontWeight: 'bold',
        fontSize: 18,
        marginTop: 10
    },
    input: {
        marginTop: 10,
        height: 40,
        borderColor: '#e1e1e1',
        borderWidth: 1,
        borderStyle: 'solid',
        borderRadius:15
    },
    titulo1: {        
        marginTop: Platform.OS === 'ios' ? 40 : 20,
        marginBottom: 30,
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop:5,
        textDecorationLine:'underline'
    },
    btnSubmit: {
        padding: 10,
        backgroundColor: '#2c278d',
        marginVertical: 10,
        borderRadius:20,
        marginTop:20
    },
    textoSubmit: {
        color: '#FFF',
        fontWeight: 'bold',
        textAlign: 'center'
    }
})

export default Formulario;
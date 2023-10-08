import React from "react";
import {Text, StyleSheet, View, TouchableHighlight} from 'react-native';

const Registro =({item, eliminarRegistro}) => {

    const dialogoEliminar = id => {
        console.log('eliminando....', id);
        eliminarRegistro(id);
    }

    return (
        <View style={styles.contenedor}>
        <View style={styles.datos}>
            <View>
                <Text style={styles.label}>Nombre: </Text>
                <Text style={styles.texto}>{item.nombre} {item.apellido}</Text>
            </View>
            <View>
                <Text style={styles.label}>Años que ha trabajado: </Text>
                <Text style={styles.texto}>{item.añostrabajados}</Text>
            </View>
            <View>
                <Text style={styles.label}>Salario: </Text>
                <Text style={styles.texto}>${item.salario}</Text>
            </View>

            <View>
                <Text style={styles.label}>Categoria: </Text>
                <Text style={styles.texto}>{item.categoria}</Text>
            </View>

            <View>
                <Text style={styles.label}>Nuevo Salario: </Text>
                <Text style={styles.texto}>${item.salario_prox}</Text>
            </View>

            <View>
                <TouchableHighlight onPress={()=>dialogoEliminar(item.id)} style={styles.btnEliminar}>
                    <Text style={styles.textoEliminar}>Eliminar &times; </Text>
                </TouchableHighlight>
            </View>
        </View>
        </View>
    )
}


const styles=StyleSheet.create({
    contenedor:{
        marginLeft:20,
        marginRight:20,        
    }, 
    datos: {
        backgroundColor: '#FFF',
        borderBottomColor: '#e1e1e1',
        borderStyle: 'solid',
        borderBottomWidth: 1,
        paddingVertical: 20,
        paddingHorizontal: 10,
        borderRadius:10,
        marginTop:20,   
        marginBottom:20     
    },
    label: {
        fontWeight: 'bold',
        fontSize: 18,
        marginTop: 15   
    },
    texto: {
        fontSize: 18,
    },
    btnEliminar: {
        padding: 10,
        backgroundColor: 'red',
        marginVertical: 10,
        borderRadius:15,
        marginLeft:40,
        marginRight:40
    },
    textoEliminar: {
        color: '#FFF',
        fontWeight: 'bold',
        textAlign: 'center'
    }
})

export default Registro;


import React, {useEffect, useState} from 'react';
import firebase from '../../firebase';
import { StyleSheet, TextInput, Text, View, Button } from 'react-native';

export default function AddUsers({navigation}){
     //constante de verificação que será usada para realizar o retorno a página principal do app. enquanto for false veremos a renderização de confirmação. Quando for true, direciona para o inicio. 
    const [ok,setOk] = useState(false);
     //estado que irá receber os valores do firebase para inserção
    const [state, setState] = useState({
        nome: '',
        email: ''
    });

    // console.log(state);
    //função para realizar mudança automática no estado
    const handleInputChange = (name, value) =>{
        setState({
            ...state, [name]: value
        })
    }

    //inserir em uma collection
    const addUser = async () => {
        //através da função assincrona com await ele irá executar o comando de add() onde irá inserir o objeto dentro collection users. Será criado um doc com um id aleatório com as informações passadas dentro dele. A função then irá mostrar uma mensagem de alerta dizendo salved, caso não consiga inserir, será acionado catch.
        await firebase.db.collection('users').add(state).then(
            ()=>{
                alert("salved");
                //quando ocorre a deleção o estado ok é alterado para true e renderizado
                setOk(true);
            }
        ).catch(
            ()=>alert("não foi possivel inserir")
        )
    }
    //quando ocorre a renderização por conta da exclusão, por ok ser true ele entra no if e retorna para a página anterior.    
    if(ok){
        alert("entrou");
        navigation.popToTop();
    }

    console.log(state);
    return(
        <View style={styles.container}>
            <Text style={styles.h1}>Adicionar Usuário</Text>
            {/**campo  Nome*/}
            {/* <Text>{state.nome}</Text>
            <Text>{state.email}</Text> */}
            <TextInput
                style={styles.input}
                placeholder='Nome'
                defaultValue={state.nome}
                onChangeText={
                    (value)=>handleInputChange('nome', value)
                }
            />
            <TextInput
                style={styles.input}
                placeholder='email'
                textContentType='emailAddress'
                defaultValue={state.email}
                onChangeText={
                    (value)=>handleInputChange('email', value)
                }
            />

            <Button
                style={styles.input}
                title="Adicionar"
                onPress={addUser}
            />
        </View>
        
    )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems:'center',
    padding:12
  },
  h1:{
      fontSize:20,
      fontWeight:'bold',
      padding:12
  }, 
  input:{
    height:60, 
    width:'90%',
    borderWidth:1, 
    padding:10,
    marginTop:5
  }
});

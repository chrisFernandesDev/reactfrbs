import React, {useEffect, useState} from 'react';
import firebase from '../../firebase';
import { StyleSheet, Button, Text, View, ActivityIndicator, FlatList } from 'react-native';

export default function ListUsers({navigation}){
    const [loading, setLoading] = useState(true);
    const [state, setState] = useState([]);

    
    useEffect(
        () => navigation.addListener('focus', () => {
            pegaDados()
        }), []
    )

    console.log(state);
    //recebendo todos os docs de users
    const  pegaDados = async () => {
        //iniciando a referência do firebase firestore, acessando a collection users
        const users = firebase.db.collection("users");
        //constante que armazena o que chamamos de querySnapshot esperando o retorno da função através do await. get() é uma função que retorna o valor  para o querySnapshot
        const querySnapshot = await users.get();
        //dados está recebendo os documentos alinhados no formato de array com várias informações
        const dados = querySnapshot.docs;
        //forEach irá trazer doc a doc para receber mostrar os dados organizados em object através do comando data()
        const listUsers = [];
        dados.forEach(
        doc => {
            listUsers.push({
                ...doc.data(),
                key: doc.id
            })
        })    
        setState(listUsers);
        setLoading(false);
      }

    if(loading){
        return <ActivityIndicator/>
    }

    return(
        <View style={styles.container}>
            <Text style={styles.h1}>Lista de usuários</Text>
            <FlatList
                data={state}
                renderItem={({ item }) => (
                <View style={styles.container}>
                    <Text>User codigo: {item.key}</Text>
                    <Text>User Nome: {item.nome}</Text>
                    <Text>User Email: {item.email}</Text>
                    <Button
                        title="editar"
                        onPress={() => {navigation.navigate('EditUsers', item.key)}}
                    />
                    <Button
                        title="excluir"
                        style={styles.alert}
                        onPress={() => {navigation.navigate('DeleteUsers', item.key)}}
                    />
                </View>
                )}
            />
            <Button
                title="Adicionar"
                onPress={() => {setLoading(true);navigation.navigate('AddUsers')}}
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
    },
    alert:{
        backgroundColor:'red',
    }
  });
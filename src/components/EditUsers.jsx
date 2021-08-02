import React, {useEffect, useState} from 'react';
import firebase from '../../firebase';
import { StyleSheet, TextInput, Text, View, Button } from 'react-native';

export default function EditUsers({route, navigation}){
    //constante de verificação que será usada para realizar o retorno a página principal do app. enquanto for false veremos a renderização de confirmação. Quando for true, direciona para o inicio. 
    const [ok,setOk] = useState(false);
    //recebe o valor passado pelo botão para usar a key como referencia de realizar a exclusão
    const key = route.params;
    //estado que irá receber os valores do firebase para edição
    const [state, setState] = useState({
        nome: '',
        email: ''
    });
    //será responsável por acionar a função que busca os dados do usuário através da key recebida. quando o componente está focado aciona a função.
    useEffect(
        () => navigation.addListener('focus', () => {
            //alert(key);
            userById(key);
        }), []
    )

    //recebendo um doc através do id
     const userById = async (id) => {
    //iniciando a referência do firebase firestore, acessando a collection users
    const users = firebase.db.collection('users');
    //através da função doc() iremos passar como parâmetro o id do documento.
    const doc = await users.doc(id).get();
    //doc.data() irá mostrar os dados no formato de objeto.
    setState(doc.data());
  }

    // console.log(state);
    //função para realizar mudança automática no estado
    const handleInputChange = (name, value) =>{
        setState({
            ...state, [name]: value
        })
    }

    //editar um dado pela referencia do doc
    const editarUser = async () =>{
    //iniciando a referência do firebase firestore, acessando a collection users
    const users = firebase.db.collection('users');
    //através da função assincrona com await ele irá executar o comando de update() realizando a alteração no doc com a key. O state com os valores atualizados serão usados para dar o update. A função then irá mostrar uma mensagem de alerta dizendo edited, caso não consiga editar, será acionado catch.
    await users.doc(key).update(state).then(
      ()=>{
          alert("edited")
          //quando ocorre a deleção o estado ok é alterado para true e renderizado
          setOk(true);
        }
    ).catch(
      ()=>alert("não foi possivel editar")
    )
  }
    //quando ocorre a renderização por conta da exclusão, por ok ser true ele entra no if e retorna para a página anterior.
    if(ok){
        // alert("entrou");
        navigation.popToTop();
    }

    //dentro dos campos de formulário haverá os valores vindo do usuário escolhido por conta do defaultvalue com o estado.propriedade
    return(
        <View style={styles.container}>
            <Text style={styles.h1}>Editar Usuário</Text>
          
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
                title="Editar"
                onPress={editarUser}
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

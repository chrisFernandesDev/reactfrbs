import React, {useState} from 'react';
import firebase from '../../firebase';
import { StyleSheet, Text, View, Button } from 'react-native';

export default function DeleteUsers({route, navigation}){
    //constante de verificação que será usada para realizar o retorno a página principal do app. enquanto for false veremos a renderização de confirmação. Quando for true, direciona para o inicio. 
    const [ok,setOk] = useState(false);
    //recebe o valor passado pelo botão para usar a key como referencia de realizar a exclusão
    key = route.params;
    
    //deletar um dado pela referencia do doc
    const deleteUser = async () =>{
    //iniciando a referência do firebase firestore, acessando a collection users
    const users = firebase.db.collection('users');
    //através da função assincrona com await ele irá executar o comando de delete() realizando a exclusão no doc com a key recebida. A função then irá mostrar uma mensagem de alerta dizendo deleted, caso não consiga excluir, será acionado catch.
    await users.doc(key).delete()
    .then(
      ()=>{
          alert("deleted");
          //quando ocorre a deleção o estado ok é alterado para true e renderizado
          setOk(true);
    }
    ).catch(
      ()=>alert("não encontrado")
    )
  }
    //quando ocorre a renderização por conta da exclusão, por ok ser true ele entra no if e retorna para a página anterior.
    if(ok){
        // alert("entrou");
        //
        navigation.popToTop();
    }
    return(
        <View style={styles.container}>
            <Text style={styles.h1}>Deseja excluir o User?</Text>
            {/**o botão abaixo aciona a função de exclusão */}
            <Button
                title="Sim"
                onPress={deleteUser}
            />
            {/**o botão abaixo aciona a função de remover todos da pilha */}
            <Button
                title="Não"
                onPress={()=>navigation.popToTop()}
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

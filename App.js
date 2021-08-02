import React from 'react';
import { StatusBar} from 'react-native';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import ListUsers from './src/components/ListUsers';
import AddUsers from './src/components/AddUsers';
import EditUsers from './src/components/EditUsers';
import DeleteUsers from './src/components/DeleteUsers';

const Stack = createStackNavigator();
export default function App() {
  // const [loading, setLoading] = useState(true);
  // const [state, setState] = useState([]);
  
  // useEffect(
  //   ()=>{
  //     pegaDados();  
  //   },[]
  // )

  // console.log(state);
  // //recebendo todos os docs de users
  // const  pegaDados = async () => {
  //     //iniciando a referência do firebase firestore, acessando a collection users
  //     const users = firebase.db.collection("users");
  //     //constante que armazena o que chamamos de querySnapshot esperando o retorno da função através do await. get() é uma função que retorna o valor  para o querySnapshot
  //     const querySnapshot = await users.get();
  //     //dados está recebendo os documentos alinhados no formato de array com várias informações
  //     const dados = querySnapshot.docs;
  //     //forEach irá trazer doc a doc para receber mostrar os dados organizados em object através do comando data()
  //     const listUsers = [];
  //     dados.forEach(
  //       doc => {
  //         listUsers.push({
  //             ...doc.data(),
  //             key: doc.id
  //           })
  //       }
  //     )    
  //     setState(listUsers);
  //     setLoading(false);
  // }
  // //mostrando docs através da condição where
  // const pegaDadosCondicao = async () => {
  //   //iniciando a referência do firebase firestore, acessando a collection users
  //   const users = firebase.db.collection("users");
  //   //através da função where que recebe 3 parâmetros o primeiro é o campo que será feita a consulta, o segundo parâmetro o operador de condição (==, >, <, >=, <=) e o terceiro parâmetro é o valor a ser utilizado para consulta. No exemplo abaixo ficaria assim, nome == 'Lais'
  //   const retorno = await users.where('nome', '==', 'Lais').get();
  //   //forEach irá trazer doc a doc para receber mostrar os dados organizados em object através do comando data()
  //   retorno.forEach(
  //     user => console.log(user.data())
  //   )
  // }
  
  // //recebendo um doc através do id
  // const pegarDoc = async () => {
  //   //iniciando a referência do firebase firestore, acessando a collection users
  //   const users = firebase.db.collection('users');
  //   //através da função doc() iremos passar como parâmetro o id do documento.
  //   const doc = await users.doc("u107rfXt5YGDGmjogDUG").get();
  //   //doc.data() irá mostrar os dados no formato de objeto.
  //   //console.log(doc.data());
  // }
  // //inserir em uma collection
  // const inserirDado = async () => {
  //   //através da função assincrona com await ele irá executar o comando de add() onde irá inserir o objeto dentro collection users. Será criado um doc com um id aleatório com as informações passadas dentro dele. A função then irá mostrar uma mensagem de alerta dizendo salved, caso não consiga inserir, será acionado catch.
  //   await firebase.db.collection('users').add({
  //     nome:'Filipe',
  //     email:'f@f.com'
  //   }).then(
  //     ()=>alert("salved")
  //   ).catch(
  //     ()=>alert("não foi possivel inserir")
  //   )
  // }
  // //editar um dado pela referencia do doc
  // const editarDoc = async () =>{
  //   //iniciando a referência do firebase firestore, acessando a collection users
  //   const users = firebase.db.collection('users');
  //   //através da função assincrona com await ele irá executar o comando de update() realizando a alteração no doc com id u107rfXt5YGDGmjogDUG. O campo a ser alterado no exemplo é o nome recebendo o valor luankmc. A função then irá mostrar uma mensagem de alerta dizendo salved, caso não consiga inserir, será acionado catch.
  //   await users.doc("u107rfXt5YGDGmjogDUG").update({
  //     nome:'luankmc'
  //   }).then(
  //     ()=>alert("edited")
  //   ).catch(
  //     ()=>alert("não foi possivel editar")
  //   )
  // }
  // //deletar um dado pela referencia do doc
  // const deletarDoc = async () =>{
  //   //iniciando a referência do firebase firestore, acessando a collection users
  //   const users = firebase.db.collection('users');
  //   //através da função assincrona com await ele irá executar o comando de delete() realizando a exclusão no doc com id u107rfXt5YGDGmjogDUG. A função then irá mostrar uma mensagem de alerta dizendo salved, caso não consiga inserir, será acionado catch.
  //   await users.doc("u107rfXt5YGDGmjogDUG").delete()
  //   .then(
  //     ()=>alert("deleted")
  //   ).catch(
  //     ()=>alert("não encontrado")
  //   )
  // }

  // if(loading){
  //   return <ActivityIndicator/>
  // }
  return (
    <NavigationContainer>
      <StatusBar/>
      <Stack.Navigator initialRouteName="ListUsers">
          <Stack.Screen name="ListUsers" component={ListUsers} />
          <Stack.Screen name="AddUsers" component={AddUsers}/>
          <Stack.Screen name="EditUsers" component={EditUsers}/>
          <Stack.Screen name="DeleteUsers" component={DeleteUsers}/>
      </Stack.Navigator>
    </NavigationContainer>
    
  );
}

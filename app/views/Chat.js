import React from 'react';
import { View, KeyboardAvoidingView } from 'react-native'
import { Header, Icon } from 'react-native-elements';
import Chatbot from 'react-native-chatbot';
import { connect } from 'react-redux';


class Chat extends React.Component {
  static navigationOptions = {
		drawerIcon: () => <Icon name='md-chatboxes' type='ionicon' color='#000' />
  }

  steps = [];

  constructor(props) {
    super(props);
    this.GetMessages();
  }

  GetMessages(){
    //this.props.botMessages[0].length == 0
    if (true) {
      this.steps.push({
        id: '0',
        message: 'Hola, ' + this.props.loggedInUser.name + ' soy DocBot',
        end: true,
      });
    }else{
      triggerId = 1;
      this.steps.push({
        id: (triggerId-1).toString(),
        message: 'Hola, ' + this.props.loggedInUser.name + ' soy DocBot',
        trigger: triggerId.toString(),
      });
      triggerId++;
      for(let i = 0; i < this.props.botMessages[0].length; i++){
        this.steps.push({
          id: (triggerId-1).toString(),
          message: 'Hola, ' + this.props.loggedInUser + ' soy DocBot',
          trigger: triggerId.toString(),
        });
        triggerId++;
        this.steps.push({
          id: (triggerId-1).toString(),
          options: [
            { value: 1, label: 'Formal', trigger: '3' },
            { value: 2, label: 'Informal', trigger: '8' },
          ],
        });
      }
    }
  }

  render(){
    return(
      <KeyboardAvoidingView
        behavior='padding'
      >
        <Chatbot 
          headerComponent={
            <Header
              placement='left'
              leftComponent={
                <Icon 
                  name='md-menu' 
                  type='ionicon' 
                  color='#fff' 
                  onPress={() => this.props.navigation.openDrawer()}/>
              }
              centerComponent={{ text: 'Inicio', style: { color: '#fff' } }}
              containerStyle={{
                backgroundColor: '#1438A6',
              }}
            />
          }
          steps={this.steps} 
          botBubbleColor='#3F51B5'
          botFontColor='#fff'
          optionBubbleColor='#3F51B5'
          optionFontColor='#fff'
          userBubbleColor='#1438A6'
          userFontColor='#fff'
        />
      </KeyboardAvoidingView>
    );
  }
}

function mapStateToProps(state){
	return{
    loggedInUser: state.loggedInUser,
    botMessages: state.botMessages
	}
}

function mapDispatchToProps(dispatch){
	return{
		saveUser : () => dispatch({type:'Save_User', payload: userGlobal})
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Chat);

/*{
      id: '0',
      message: 'Hola, ' + this.props.loggedInUser + ' soy DocBot',
      trigger: '1',
    },
    {
      id: '1',
      message: 'Por ordenes de mas arriba **coff coff** Profesores **coff coff* lo siento hasta los bots tenemos tos, en fin quien me programó me obliga a pedir que me comentes como quieres que te trate',
      trigger: '2',
    },
    {
      id: '2',
      options: [
        { value: 1, label: 'Formal', trigger: '3' },
        { value: 2, label: 'Informal', trigger: '8' },
      ],
    },
    {
      id: '3',
      message: 'Muy bien, como usted desee',
      trigger: '4',
    },
    {
      id: '4',
      message: 'Ahora, ¿podría decirme cuántas veces desea que le recuerde sobre tomar sus medicamentos?',
      trigger: '5',
    },
    {
      id: '5',
      user: true,
      validator: (value) => {
        if (isNaN(value)) {
          return 'Por favor, el valor debe ser numérico';
        }
        return true;
      },
      trigger: '6',
    },
    {
      id: '6',
      message: 'Muchas gracias señor/a ' + this.props.loggedInUser + ' así se hará',
      trigger: '7',
    },
    {
      id: '7',
      message: 'Hasta luego y que tenga un excelente dia',
      end: true,
    },
    {
      id: '8',
      message: 'Muy bien, así será',
      trigger: '9',
    },
    {
      id: '9',
      message: '¿Cuántas veces deseas que te recuerde tomar los medicamentos?',
      trigger: '10',
    },
    {
      id: '10',
      user: true,
      validator: (value) => {
        if (isNaN(value)) {
          return 'El valor debe ser numérico';
        }
        return true;
      },
      trigger: '11',
    },
    {
      id: '11',
      message: 'Ok, lo tendré en cuenta',
      trigger: '12',
    },
    {
      id: '12',
      message: 'Hasta luego',
      end: true,
    },*/

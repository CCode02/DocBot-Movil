import React from 'react';
import { Dimensions, View, Text, Image, StyleSheet, TextInput, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import { Hoshi } from 'react-native-textinput-effects';
import { Button } from 'react-native-elements';
import { Card } from '../components/card.js';
import { CardSection } from '../components/cardsection.js';
import { Spinner } from '../components/Spinner.js';
import { signIn } from '../services/api.js';

/**
   * Login del médico
   * @param {*} email 
   * @param {*} password 
   */
const login = (user, password) =>{
    signIn(user,password)
      .then(response => {
		console.log(response.json());
		return response.json();
      })
      .then(json => {
        if (json["login"] == true) {
			this.props.navigation.navigate('Main');
        } else {
			this.setState({ error: 'Usuario o contraseña incorrecto', loading: false });
		}
      })
      .catch(error => {
        console.log(error.message);
        
      });
  };

export  class Login extends React.Component {
	static navigationOptions = {
		header: null
	}
	state = { user: '', password: '', error: '', loading: false };

	onLoginFail() {
		this.setState({
			error: '*Usuario o contraseña incorrecta.',
			loading: false
		});
	}

	onButtonPress() {
		this.setState({ error: ''});		
		this.props.navigation.navigate('Main');
		//login(this.state.user, this.state.password)
		/*if(login(this.state.user, this.state.password)){
			this.props.navigation.navigate('Main');
		}else{
			this.setState({ error: 'Usuario o contraseña incorrecto', loading: false });
		}*/
	}

  render(){
    return(
      <KeyboardAvoidingView
        behavior='padding'
        keyboardVerticalOffset={-64}
      >
      <Card>
				<CardSection>
  				<View style={{
  					height: 200,
  					flex: 1,
  					flexDirection: 'column',
  					justifyContent: 'space-around',
  					alignItems: 'center',
						marginTop: 20
  				}}
  				>
  				    <Image source={require('../resources/logo.png')} style={{ flex: 1,resizeMode: 'contain'}}/>
  				</View>
        </CardSection>
  			<CardSection>
  				<View style={{
  					height: 250,
  					flex: 1,
  					flexDirection: 'column',
  					justifyContent: 'space-around',
  					alignItems: 'center',
  				}}>
  					<Text style={{ color: 'red', fontSize: 16 }}>{this.state.error}</Text>
  					<Hoshi
  						value={this.state.user}
  						onChangeText={user => this.setState({ user })}
  						label={'Usuario'}
  						style={{ width: 300 }}
  						borderColor={'#000000'}
  					/>
  					<Hoshi
  						secureTextEntry
  						value={this.state.password}
  						onChangeText={password => this.setState({ password })}
  						label={'Contraseña'}
  						style={{ width: 300 }}
  						borderColor={'#000000'}
  					/>
					
					<TouchableOpacity
					style={{alignContent: 'center', alignItems: 'center', backgroundColor: "#545aa1", borderRadius: 25, marginTop: 20, width: '60%'}} onPress={ this.onButtonPress.bind(this)}
					 >
						 <Text style={{color:'#fff', fontSize: 20, margin: 10}}>Ingresar</Text>
					 </TouchableOpacity>
  				</View>
  			</CardSection>
			</Card >
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
	button:{
		backgroundColor: "blueviolet",
		width: Dimensions.get('window').width*0.8,
		height: 40,
		borderColor: 'blueviolet',
		borderWidth: 5,
		borderRadius: 25,
		alignItems: 'center'
	},
	buttonText:{
		color: 'white',
		fontSize: 20,
		textAlign: 'center'
	}
});
/*<Button
						rounded
						title="Ingresar"
						onPress={ this.onButtonPress.bind(this)}
						buttonStyle={{
							marginTop: 20,
							borderRadius: 25,
							backgroundColor: "#545aa1",
							width: '100%',
						}}
						titleStyle={{
							alignItems: 'center'
						}}
						containerStyle={{
							justifyContent: 'center'
						}}
					/>*/
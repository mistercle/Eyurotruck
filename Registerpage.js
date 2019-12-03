import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet
} from "react-native";


class Registerpage extends React.Component {
  static navigationOptions = {
    title : '회원가입 화면',
  };
    constructor(props) {
        super(props); 
      }
    state = {
        email: "",
        password: "",
        pNumber : "",
    }


    handleEmail = text => {
        this.setState({ email: text });
    };
     
    handlePassword = text => {
        this.setState({ password: text });
    };

    handlePhoneNumber = text => {
        this.setState({ pNumber: text });
    };

    register = (email, pass, pNumber) => {
        const post ={
            id: email,
            password: pass,
            phone_number : pNumber
        }

        console.log(post)

        fetch(`http://192.168.25.220:3000/login`,{
            method :'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body:JSON.stringify(post)
        })
        .then(function(data) {
          if(data === "success") {
            alert("회원가입 성공")
            
          }
          else
          {
            alert("회원가입 실패")
            
          }
       }).catch(function(error) {
         console.log(`There has been a problem with your fetch operation : ${error.message}`);
       });
        

      this.props.navigation.goBack();
    }

    render() {
      
        return (
          <View style={styles.container}>
            <Text style = {styles.submitButtonText}>회원정보를 입력하세요</Text>
            <TextInput
              style={styles.input}
              underlineColorAndroid="transparent"
              placeholder="Email"
              placeholderTextColor="#9a73ef"
              autoCapitalize="none"
              onChangeText={this.handleEmail}
            />
            <TextInput
              style={styles.input}
              underlineColorAndroid="transparent"
              placeholder="Password"
              placeholderTextColor="#9a73ef"
              autoCapitalize="none"
              onChangeText={this.handlePassword}
            />
            <TextInput
              style={styles.input}
              underlineColorAndroid="transparent"
              placeholder="PhoneNumber(No bar)"
              placeholderTextColor="#9a73ef"
              autoCapitalize="none"
              onChangeText={this.handlePhoneNumber}
            />
            <TouchableOpacity
              style={styles.submitButton}
              onPress={() => this.register(this.state.email, this.state.password, this.state.pNumber)}
            >
              <Text style={styles.submitButtonText}>회원가입</Text>
            </TouchableOpacity>
          </View>
        );
      }

}

export default Registerpage;

const styles = StyleSheet.create({
    container: {
      paddingTop: 23
    },
    input: {
      margin: 15,
      height: 40,
      borderColor: "#7a42f4",
      borderWidth: 1
    },
    submitButton: {
      backgroundColor: "#7a42f4",
      padding: 10,
      margin: 15,
      height: 40
    },
    submitButtonText: {
      color: "white"
    }
    
  });
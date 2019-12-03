import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet
} from "react-native";

export default class WaitTab extends React.Component{
    static navigationOptions = {
        title : '의뢰 수행중',
      };
    constructor(props) {
        super(props); 
    };

    state = {
        driver_id : "",
        delivery_id : 3
    }

    server = `http://192.168.25.220:3000`

    componentDidMount() {
        const { navigation } = this.props;
        this.state.driver_id = navigation.getParam('driver_id', null);
        this.state.delivery_id = navigation.getParam('delivery_id', null);

    }

    

    finish(){
        const post = {
            //driver_id : this.state.driver_id,
            delivery_id : this.state.delivery_id
        }
        console.log(this.state.delivery_id)
        fetch(this.server + `/finish`,{
            method :'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body:JSON.stringify(post)
        })
        this.props.navigation.goBack();
    }


    render() {
        //현재 운전자 정보를 서버로 보낸다음 적절한 의뢰를 order안에 집어넣음
        
        return (
            <View>
                <TouchableOpacity
                style={styles.submitButton}
                onPress={() => this.finish()}
                >
                    <Text style={styles.submitButtonText}>화물 운송 완료</Text>
                </TouchableOpacity>
                
            </View>
        );
    }

}

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
      height: 140
    },
    submitButtonText: {
      color: "white"
    }
    
  });
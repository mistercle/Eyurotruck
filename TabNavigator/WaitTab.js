import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet
} from "react-native";

export default class WaitTab extends React.Component {
  static navigationOptions = {
    title : '의뢰 대기 화면',
  };
    constructor(props) {
        super(props); 
      };
    state = {
        customerID : "",
        now_lat : 0,
        now_lng : 0,
        
        order : {
          company_id : "",
          content_type : 0,//화물 유형 (냉동, 냉장, 상온)
          content_lat : 0,//화물의 현재 위도
          content_lng : 0,//화물의 현재 경도
          delivery_id : 0,

          destination_lat : 0,//화물 목적지의 위도
          destination_lng : 0,//화물 목적지의 경도
          distance : 0,
          driver_id : "",
          paret_count : 0,
          paret_weight : 0,
          pay : 0
        },
        deliveryList : []
    }

    server = `http://uryotruck.ap-northeast-2.elasticbeanstalk.com`

    componentDidMount() {
        const { navigation } = this.props;
        console.log("WaitTab : " + navigation.getParam('customerID', null))
        this.state.customerID = navigation.getParam('customerID', null);
    }

    
    wait_empty(state) {
      const post = {
        driver_id : this.state.customerID,
        d1_lat : 37.392835,
        d1_lng : 127.111996
      }
      console.log("Going IdleTab...")
      fetch(this.server + `/request?driver_id=${driver_id}`)
      .then(result => result.json())
      .then(data => {
        console.log(data)
        this.setState({deliveryList : data})
        console.log(this.state.deliveryList)
        this.props.navigation.replace(
          'IdleTab',
          {
              customerID : state.customerID,
              d1_lat : 37.392835,
              d1_lng : 127.111996,
              deliveryList : this.state.deliveryList
          }
        
      )})

      
    }


    render() {
        return (
            <View /*style={style.container}*/>
              <TouchableOpacity
              style = {styles.submitButton}
              onPress = {() => this.wait_empty(this.state)}
              >
                <Text style={styles.submitButtonText}>의뢰 찾기</Text>
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
      height: 40
    },
    submitButtonText: {
      color: "white"
    }
    
  });
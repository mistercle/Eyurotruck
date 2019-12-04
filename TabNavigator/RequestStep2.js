import React, { Component } from "react";
import {View,Text,TouchableOpacity,TextInput,StyleSheet} from "react-native";
import MapView from 'react-native-maps';





export default class RequestTab extends React.Component {
  static navigationOptions = {
    title : '화물 의뢰 화면1',
  };
    constructor(props) {
        super(props); 

      };
    state = {
        company_id : "",//화물주 ID
        pay : 0,//수당
        paret_count : 0,//파레트 갯수
        paret_weight : 0,//화물 무게
        content_type : 0,//화물 유형 0 = 기본, 1 = 냉동, 2 = 냉장, 3 = 상온
        content_lat : 0,//현재 위치 위도
        content_lng : 0,//현재 위치 경도
        destination_lat : 0,
        destination_lng : 0,
        
    }
    server = `http://192.168.25.220:3000`

    componentDidMount() {
        const { navigation } = this.props;
        console.log("RequestTab : " + navigation.getParam('customerID', null))
        this.state.company_id = navigation.getParam('customerID', null);
    }

    handleclat = text => {
      this.setState({ content_lat : Number(text) });
    };

    handleclng = text => {
      this.setState({ content_lng : Number(text) });
    };

    handledlat = text => {
      this.setState({ destination_lat : Number(text) })
    }
    handledlng = text => {
      this.setState({ destination_lng : Number(text) })
    }

    handlepay = text => {
        this.setState({ pay : Number(text) });
    };

    handlepalletNum = text => {
        this.setState({ paret_count : Number(text) });
    };

    handleweight = text => {
        this.setState({ paret_weight : Number(text) });
    };

    handletype = text => {
        this.setState({ content_type : text });
    };

    request = post => {
        console.log(post);
        
        fetch(this.server + `/request`,{
        method :"POST",
        headers:{
            'content-type':'application/json'
        },
        body:JSON.stringify(post)
        })
        .then(res => res.json())
        .then(data => console.log(data))
        .then(result => {
            if(result === "success")
            {
                alert("의뢰가 확인되었습니다.");

            }
            else
            {
                alert("의뢰 업로드가 실패하였습니다. 다시 시도해주십시오");
            }
        })
        this.props.navigation.goBack();
        
    }

    mapclick(e, index){
      alert("click!!" + index)
    }
    render() {
      

        return (
          
          <MapView 
            style={{ flex: 1 }} 
            initialRegion={{
              latitude: 37.392835,
              longitude: 127.111996, 
              latitudeDelta: 0.0922, 
              longitudeDelta: 0.0421, }}
            onPress = {(event) => console.log(event.nativeEvent.coordinate)} />

        

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
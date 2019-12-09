import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  FlatList
} from "react-native";

export default class WaitTab extends React.Component{
    static navigationOptions = {
        title : '의뢰 대기중',
      };
    constructor(props) {
        super(props);
      };
    state = {
        customerID : "",
        d1_lat : 0,
        d1_lng : 0,
        deliveryList : []

    }

    server = `http://uryotruck.ap-northeast-2.elasticbeanstalk.com`

    componentDidMount() {
        const { navigation } = this.props;
        this.state.customerID = navigation.getParam('customerID', null);
        this.setState({deliveryList : navigation.getParam('deliveryList', null)})
    }


    selectOrder = (driver_id, order) =>{
        const post = {
            delivery_id : order.delivery_id,
            driver_id : driver_id,
        }
        fetch(this.server + `/request/catch`,{
            method :'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body:JSON.stringify(post)
        })
        .then(function(data) {
          if(data === "success") {
            //alert("의뢰를 수락하였습니다.")
            
          }
          else
          {
            //alert("의뢰 수락에 실패하였습니다. 다시 시도해 주십시오.")
            
          }
       }).catch(function(error) {
         console.log(`There has been a problem with your fetch operation : ${error.message}`);
       });
        this.props.navigation.replace(
          'OngoingTab',
          {
              driver_id : driver_id,
              delivery_id : order.delivery_id
          }
        );
    }





    showrequest(order){
        const direction = {
          content_dir : "",
          destination_dir : "",
        }
        fetch(`https://apis.openapi.sk.com/tmap/geo/reversegeocoding?version=1&lat=${order.content_lat}&lon=${order.content_lng}&appKey=c260c6c2-728d-4a06-a2ee-fc3670401343`)
        .then(res => res.json())
        .then(data => {
          direction.content_dir = data.addressInfo.fullAddress
        })
        fetch(`https://apis.openapi.sk.com/tmap/geo/reversegeocoding?version=1&lat=${order.destination_lat}&lon=${order.destination_lng}&appKey=c260c6c2-728d-4a06-a2ee-fc3670401343`)
        .then(res => res.json())
        .then(data => {
          direction.destination_dir = data.addressInfo.fullAddress
        })
        
        this.result({
          delivery_id : order.delivery_id,
          compnay_id : order.company_id,
          content_type : order.content_type,
          content_dir : direction.content_dir,
          destination_dir : direction.destination_dir,
          paret_count : order.paret_count,
          paret_weight : order.paret_weight,
          pay : order.pay 
          
        })
        
/*
        return (
            <TouchableOpacity style={styles.submitButton} onPress = {() => this.selectOrder(this.state.customerID, order)}>
                    <Text style={styles.submitButtonText}>주문 번호 : {order.delivery_id}</Text>
                    <Text style={styles.submitButtonText}>기업 번호 : {order.company_id}</Text>
                    <Text style={styles.submitButtonText}>화물 유형 : {order.content_type}</Text>
                    <Text style={styles.submitButtonText}>화물 위치 : {direction.content_dir}</Text>
                    <Text style={styles.submitButtonText}>목적지 : {direction.destination_dir}</Text>
                    <Text style={styles.submitButtonText}>파레트 갯수 : {order.paret_count}</Text>
                    <Text style={styles.submitButtonText}>파레트 무게 : {order.paret_weight}</Text>
                    <Text style={styles.submitButtonText}>수당 : {order.pay}</Text>      
            </TouchableOpacity>
        )*/
    }

    result(order)
    {
      return (
        <TouchableOpacity style={styles.submitButton} onPress = {() => this.selectOrder(this.state.customerID, order)}>
                <Text style={styles.submitButtonText}>주문 번호 : {order.delivery_id}</Text>
                <Text style={styles.submitButtonText}>기업 번호 : {order.company_id}</Text>
                <Text style={styles.submitButtonText}>화물 유형 : {order.content_type}</Text>
                <Text style={styles.submitButtonText}>화물 위치 : {direction.content_dir}</Text>
                <Text style={styles.submitButtonText}>목적지 : {direction.destination_dir}</Text>
                <Text style={styles.submitButtonText}>파레트 갯수 : {order.paret_count}</Text>
                <Text style={styles.submitButtonText}>파레트 무게 : {order.paret_weight}</Text>
                <Text style={styles.submitButtonText}>수당 : {order.pay}</Text>      
        </TouchableOpacity>
    )
    }

    render() {
        //현재 운전자 정보를 서버로 보낸다음 적절한 의뢰를 order안에 집어넣음
        
        return (
            <View>
                <FlatList style = {styles.container}
                      renderItem = {({ item }) => this.showrequest(item)}
                      keyExtractor = { item => item}
                      data = { this.state.deliveryList }
                />
                
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
      height: 180
    },
    submitButtonText: {
      color: "white"
    }
    
  });
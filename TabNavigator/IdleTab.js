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
        //console.log(props);
        //console.log(this.props.title); 
      };
    state = {
        customerID : "",
        d1_lat : 0,
        d1_lng : 0,
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
        /*deliveryList : [
            {
                orderid : "02495",
                company_id : "mistercle",
                content_type : 1,//화물 유형 (1 = 냉동, 2 = 냉장, 3 = 상온)
                content : "경기도 성남시 분당구 백현동 판교역로146번길 20",
                d2 : "경기도 수원시 팔달구 팔달로2가 정조로 780",
                paret_count : 3,
                paret_weight : 50,
                pay : 20000
            },
            {
                orderid : "23462",
                company_id : "qudcjf9000",
                content_type : 3,//화물 유형 (1 = 냉동, 2 = 냉장, 3 = 상온)
                content : "경기도 수원시 영통구 하동 법조로 105",
                d2 : "경기도 용인시 처인구 포곡읍 에버랜드로 199",
                paret_count : 2,
                paret_weight : 100,
                pay : 18000
            },
            {
                orderid : "04836",
                company_id : "rhqjatjr0093",
                content_type : 3,//화물 유형 (1 = 냉동, 2 = 냉장, 3 = 상온)
                content : "경기도 수원시 영통구 원천동 월드컵로 164", 
                d2 : "경기도 성남시 분당구 야탑3동 성남대로 808",
                paret_count : 1,
                paret_weight : 30,//화물 목적지의 경도
                pay : 20000
            },
            {
                orderid : "09345",
                company_id : "justin1016",
                content_type : 2,//화물 유형 (1 = 냉동, 2 = 냉장, 3 = 상온)
                content : "경기도 용인시 수지구 풍덕천1동 풍덕천로 119",
                d2 : "경기도 수원시 팔달구 우만1동 월드컵로 310",
                paret_count : 3,
                paret_weight : 140,//화물 목적지의 경도
                pay : 10000
            }
        ]*/
        deliveryList : []

    }

    server = `http://192.168.25.220:3000`

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
        console.log(this.state.order)
        return (
            <TouchableOpacity style={styles.submitButton} onPress = {() => this.selectOrder(this.state.customerID, order)}>
                    <Text style={styles.submitButtonText}>주문 번호 : {order.orderid}</Text>
                    <Text style={styles.submitButtonText}>기업 번호 : {order.company_id}</Text>
                    <Text style={styles.submitButtonText}>화물 유형 : {order.content_type}</Text>
                    <Text style={styles.submitButtonText}>화물 위치 : {order.content}</Text>
                    <Text style={styles.submitButtonText}>목적지 : {order.d2}</Text>
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
      height: 140
    },
    submitButtonText: {
      color: "white"
    }
    
  });
import React, { Component } from "react";
import { FlatList, View, Text, TouchableOpacity, TextInput, StyleSheet} from "react-native";
import { Constants } from 'expo'

export default class CheckTab extends React.Component {
    //화물주 전용
    static navigationOptions = {
        title : '내 화물 정보 확인 화면',
      };
    constructor(props) {
        super(props); 
        
    this.state = {
        company_id : "",
        orderList : []
        

    
    }
    this.getOrderlist = this.getOrderlist.bind(this)
    };

    server = `http://uryotruck.ap-northeast-2.elasticbeanstalk.com`

    componentDidMount() {
        const { navigation } = this.props;
        this.state.company_id = navigation.getParam('customerID', null);
        this.getOrderlist();
    }

    showInfo(order) {
        this.props.navigation.navigate(
            'CheckInfo',
            {
                content_lat : order.content_lat,
                content_lng : order.content_lng,
                orderType : order.delivery_type
            }
        )
    }
    getOrderlist()
    {
        fetch(this.server + `/check?company_id=${this.state.company_id}`)
        .then(res => res.json())
        .then(data => {
            this.setState({orderList : data})
            console.log("Data : \n" + orderlist)
        })
    }

    
    renderList(order) {
        if(order.delivery_type !== 2)
        {
            return (
                <TouchableOpacity style={styles.submitButton} onPress = {() => this.showInfo(order)}>
                        <Text style={styles.submitButtonText}>주문 번호 : {order.delivery_id}</Text>
                        <Text style={styles.submitButtonText}>배송 상태 : {order.delivery_type}</Text>
                </TouchableOpacity>
            );
        }
    }
    
    render() {
        return (
            <FlatList style = {styles.container}
                      renderItem = {({ item }) => this.renderList(item)}
                      keyExtractor = { item => item}
                      data = { this.state.orderList}
            />
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
      height: 90
    },
    submitButtonText: {
      color: "white"
    }
    
  });
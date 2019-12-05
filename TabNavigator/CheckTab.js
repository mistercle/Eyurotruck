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
        order :
        {
            orderID : "12345",
            driverID : "54321",
            orderType : "1",
            content_lat : "133",
            content_lng : "25"
        },
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
                orderType : order.orderType
            }
        )
    }
    getOrderlist()
    {
        fetch(this.server + `/check?company_id=${this.state.company_id}}`)
        .then(res => res.json())
        .then(data => console.log(data))
    }

    
    renderList(order) {
        return (
            <TouchableOpacity style={styles.item} onPress = {() => this.showInfo(order)}>
                <Text style={styles.text}>{order.orderID}</Text>
            </TouchableOpacity>
        );
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
    /*
    render() {
        return (
            <TouchableOpacity style={styles.submitButton} onPress = {() => this.showInfo(this.state.order)}>
                <Text style={styles.submitButtonText}>{this.state.order.orderID}</Text>
            </TouchableOpacity>
        )
    }*/
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
import React, { Component } from "react";
import { FlatList, View, Text, TouchableOpacity, TextInput, StyleSheet} from "react-native";
import { Constants } from 'expo'

export default class CheckTab extends React.Component {
    static navigationOptions = {
        title : '내 화물 정보 확인 화면',
      };
    constructor(props) {
        super(props); 
        //console.log(props);
        //console.log(this.props.title); 
      };
    state = {
        customerID : "",
        order :
        {
            orderID : "12345",
            driverID : "54321",
            orderType : "1",
            lat : "133",
            lng : "25"
        }
        

    
    }
    componentDidMount() {
        const { navigation } = this.props;
        console.log("CheckTab : " + navigation.getParam('customerID', null))
        this.state.customerID = navigation.getParam('customerID', null);
    }

    showInfo(order) {
        alert("orderID : " + order.orderID +
              "\ndriverID : " + order.driverID +
              "\norderType : " + order.orderType +
              "\nlat : " + order.lat +
              "\nlng : " + order.lng);
    }
    /*
    renderList(order) {
        return (
            <TouchableOpacity style={styles.item} onPress = {() => this.showInfo(order)}>
                <Text style={styles.text}>{order.orderID}</Text>
            </TouchableOpacity>
        );
    }*/
    /*
    render() {
        return (
            <FlatList style = {styles.container}
                      renderItem = {({ item }) => this.renderList(item)}
                      keyExtractor = { item => item}
                      data = { this.state.order}
            />
        );
    }*/

    render() {
        return (
            <TouchableOpacity style={styles.submitButton} onPress = {() => this.showInfo(this.state.order)}>
                <Text style={styles.submitButtonText}>{this.state.order.orderID}</Text>
            </TouchableOpacity>
        )
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
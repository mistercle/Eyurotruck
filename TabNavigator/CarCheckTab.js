import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  FlatList,
} from "react-native";
import soundfile from '../resource/sound/warning_errer.mp3'

export default class CarCheckTab extends React.Component {
    //운전자 전용
    static navigationOptions = {
        title : '의뢰 대기 화면',
      };
    constructor(props) {
        super(props); 
        this.checkCargo = this.checkCargo.bind(this)
        
    this.state = {
        driver_id : "",
        prev_speed : 0,
        prev_weight : 0,
        prev_paret : 0,
        current_speed : 0,
        current_weight : 0,
        current_paret : 0,
        alert_weight : 0,//-1이면 무게에서 문제가 생긴것
        alert_paret : 0,//-1이면 파레트에서 문제가 생긴것
        temp : 1
    }

    };
//    audio = new Audio(soundfile)

    componentDidMount() {
        const { navigation } = this.props;
        this.state.driver_id = navigation.getParam('customerID', null);
        setInterval(this.checkCargo, 5000); // 5초마다 화물 체크 반복
      }

    checkweight()//문제없으면 0 반환
    {
        if(this.state.current_speed > 10)
        {
            if(this.state.prev_weight - this.state.current_weight > 0)
            {
                console.log("화물 문제")
                return -1;
            }
        }

        return 0;
    }

    checkparet()//문제없으면 0 반환
    {
        if(this.state.current_speed > 10)
        {
            if(this.state.prev_paret - this.state.current_paret > 0)
            {
                console.log("파레트 문제")
                return -1;
            }
        }

        return 0;
    }

    dataget(){
        
        // update state
        this.state.prev_speed = this.state.current_speed;
        this.state.prev_weight = this.state.current_weight;
        this.state.prev_paret = this.state.current_paret;
        
        fetch(this.server + `/check/car?driver_id=${this.state.driver_id}`)
        .then(res => res.json())
        .then(data => {
            this.state.current_speed = data.current_speed;
            this.state.current_weight = data.current_weight;
            this.state.current_paret = data.current_paret;
        })
        


    }

    checkCargo(){
        const checklist = {
            weight_check : 0,
            paret_check : 0
        }
        this.dataget()
        console.log("Data : ")
        console.log(this.state)
        if(this.state.current_speed > 10)//차가 움직일때
        {
            if(!(this.checkweight() === 0))
                checklist.weight_check = -1
            else
                checklist.weight_check = 0
            if(!(this.checkparet() === 0))
                checklist.paret_check = -1
            else
                checklist.paret_check = 0
        }

        if(checklist.paret_check === -1 && checklist.weight_check === -1)
        {
            alert("파레트와 화물 둘다 문제가 생겼습니다!!")
            //this.audio.play()
        }
        else if(checklist.paret_check === -1 && checklist.weight_check === 0)
        {
            alert("파레트에 문제가 생겼습니다!!")
            //this.audio.play()
        }    
        else if(checklist.paret_check === 0 && checklist.weight_check === -1)
        {
            alert("화물칸에 문제가 생겼습니다!!")
            //this.audio.play()
        }

    }

    



      render() {
        return (
          <View>
            <TouchableOpacity style={styles.submitButton} onPress = {this.props.navigation.goBack()}>
                <Text style={styles.submitButtonText}>뒤로</Text>      
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
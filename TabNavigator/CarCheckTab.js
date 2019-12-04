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
    };
    state = {
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

//    audio = new Audio(soundfile)

    componentDidMount() {
        // Now we need to make it run at a specified interval
        setInterval(this.checkCargo, 5000); // runs every 3 seconds.
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
        /*
        fetch(URL)
        .then(res => res.json())
        .then(data => {
            this.state.current_speed = data.current_speed;
            this.state.current_weight = data.current_weight;
            this.state.current_paret = data.current_paret;
        })
        */

        if(this.state.temp%3 === 0)
        {
            this.state.current_speed = 30;
            this.state.current_weight = 100;
            this.state.current_paret = 4;
        }

        else if(this.state.temp%3 === 1)
        {
            this.state.current_speed = 30;
            this.state.current_weight = 80;
            this.state.current_paret = 4;
        
        }

        else
        {
            this.state.current_speed = 30;
            this.state.current_weight = 100;
            this.state.current_paret = 3;
        }
        this.state.temp = this.state.temp + 1


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
            <TouchableOpacity style={styles.submitButton}>
                <Text style={styles.submitButtonText}>화물칸 체크중</Text>      
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
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
        this.state = {
          driver_id : "",
          delivery_id : 3,
          prev_speed : 0,
          prev_weight : 0,
          prev_paret : 0,
          current_speed : 0,
          current_weight : 0,
          current_paret : 0,
        }
        this.checkCargo = this.checkCargo.bind(this)
        this.checkCargo();
        this.interval = setInterval(this.checkCargo, 5000); // 5초마다 화물 체크 반복
    };

    

    server = `http://192.168.25.220:3000`

    componentDidMount() {
        const { navigation } = this.props;
        this.state.driver_id = navigation.getParam('driver_id', null);
        this.state.delivery_id = navigation.getParam('delivery_id', null);
    }

    componentWillUnmount(){
      clearInterval(this.interval)
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
        
        fetch(this.server + `/check?driver_id=${this.state.driver_id}`)
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
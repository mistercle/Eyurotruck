import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  FlatList,
} from "react-native";
import MapView, { Marker } from 'react-native-maps';

export default class CarCheckTab extends React.Component {
    //운전자 전용
    static navigationOptions = {
        title : '내 차 상태 확인',
      };
    constructor(props) {
        super(props); 
        this.state = {
            driver_id : "",
            car_lat : 0,
            car_lng : 0,
            prev_speed : 0,
            prev_weight : 0,
            prev_paret : 0,
            current_speed : 1,
            current_weight : 1,
            current_paret : 1,
        }
        
        this.checkCargo = this.checkCargo.bind(this)
        //this.checkCargo();
        this.interval = setInterval(this.checkCargo, 5000);

    };
//    audio = new Audio(soundfile)

    server = `http://uryotruck.ap-northeast-2.elasticbeanstalk.com`

    componentDidMount() {
        const { navigation } = this.props;
        this.state.driver_id = navigation.getParam('customerID', null);
        //this.inter = setInterval(this.checkCargo, 5000); // 5초마다 화물 체크 반복
      }


    componentWillUnmount(){
        clearInterval(this.interval)
    }
    checkweight()//문제없으면 0 반환
    {
        console.log("화물 무게 체크")
        if(1)
        {
            if(this.state.prev_weight - this.state.current_weight < 0)
            {
                console.log("화물 문제")
                return -1;
            }
        }

        return 0;
    }

    checkparet()//문제없으면 0 반환
    {
        console.log("파레트 체크")
        if(1)
        {
            if(this.state.prev_paret - this.state.current_paret < 0)
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

        fetch(this.server + `/check/car?id=${this.state.driver_id}`)
        .then(res => res.json())
        .then(data => {
            this.setState({
                car_lat : data.Latitude,
                car_lng : data.Longitude,
                current_speed : data.Velocity,
                current_weight : data.Weight,
                current_paret : data.Paret
            })
            //this.state.current_speed = data.Velocity;
            //this.state.current_weight = data.Weight;
            //this.state.current_paret = data.Paret;
            console.log("Recieved : ")
            console.log(data)
        })
        


    }

    checkCargo(){
        const checklist = {
            weight_check : 0,
            paret_check : 0
        }
        this.dataget()
        console.log("CheckCargo : ")
        console.log(this.state)
        if(this.state.current_speed > 1)//차가 움직일때
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

    back(){
       // this.props.navigation.goBack();
    }



      render() {
        return (
          <View>
                    <MapView 
                    style={styles.map}
                    region={{
                        latitude: this.state.car_lat,
                        longitude: this.state.car_lng,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }}
                    >
                    <MapView.Marker
                        coordinate = {
                            {
                                latitude : this.state.car_lat,
                                longitude : this.state.car_lng
                            }
                        }
                    />
                </MapView>
            <TouchableOpacity style={styles.submitButton}>
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
        },
        map : {
            //marginTop : Constants.statusBarHeight,
            width : 390,
            height : 390
          }
        
      });
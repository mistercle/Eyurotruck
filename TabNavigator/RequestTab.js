import React, { Component } from "react";
import {View,Text,TouchableOpacity,TextInput,StyleSheet} from "react-native";
import Tmap from ''


export default class RequestTab extends React.Component {
  static navigationOptions = {
    title : '화물 의뢰 화면',
  };
    constructor(props) {
        super(props); 
        this.initTmap = this.initTmap.bind(this)
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

  initTmap(){
  		  var map = new Tmap.Map({div:'map_div',
							width:'100%', 
							height:'400px'
		}); 
	                    
		    
	      map.events.register("click", map, onClick);
    }     
    
	  onClick(e){
  	    var lonlat = map.getLonLatFromViewPortPx(e.xy).transform("EPSG:3857", "EPSG:4326");//클릭한 부분의 ViewPorPx를 LonLat로 변환합니다
	      var result ='클릭한 위치의 좌표는'+lonlat+'입니다.'; 
	      var resultDiv = document.getElementById("result");
	      resultDiv.innerHTML = result;
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
    render() {
      

        return (
        <View /*style={style.container}*/>
        <TextInput
          style={styles.input}
          underlineColorAndroid="transparent"
          placeholder="현재 위치 위도"
          placeholderTextColor="#9a73ef"
          autoCapitalize="none"
          onChangeText={this.handleclat}
        />
        <TextInput
          style={styles.input}
          underlineColorAndroid="transparent"
          placeholder="현재 위치 경도"
          placeholderTextColor="#9a73ef"
          autoCapitalize="none"
          onChangeText={this.handleclng}
        />
        <TextInput
          style={styles.input}
          underlineColorAndroid="transparent"
          placeholder="화물 목적지 위도"
          placeholderTextColor="#9a73ef"
          autoCapitalize="none"
          onChangeText={this.handledlat}
        />
        <TextInput
          style={styles.input}
          underlineColorAndroid="transparent"
          placeholder="화물 목적지 경도"
          placeholderTextColor="#9a73ef"
          autoCapitalize="none"
          onChangeText={this.handledlng}
        />
        <TextInput
          style={styles.input}
          underlineColorAndroid="transparent"
          placeholder="수당"
          placeholderTextColor="#9a73ef"
          autoCapitalize="none"
          onChangeText={this.handlepay}
        />
        <TextInput
          style={styles.input}
          underlineColorAndroid="transparent"
          placeholder="파레트 갯수"
          placeholderTextColor="#9a73ef"
          autoCapitalize="none"
          onChangeText={this.handlepalletNum}
        />
        <TextInput
          style={styles.input}
          underlineColorAndroid="transparent"
          placeholder="화물 무게"
          placeholderTextColor="#9a73ef"
          autoCapitalize="none"
          onChangeText={this.handleweight}
        />
        <TextInput
          style={styles.input}
          underlineColorAndroid="transparent"
          placeholder="화물 유형(1 = 냉동, 2 = 냉장, 3 = 상온)"
          placeholderTextColor="#9a73ef"
          autoCapitalize="none"
          onChangeText={this.handletype}
        />
        <TouchableOpacity
          style = {styles.submitButton}
          onPress = {() => this.request(this.state)}
        >
          <Text style={styles.submitButtonText}>화물 의뢰</Text>
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
      height: 40
    },
    submitButtonText: {
      color: "white"
    }
    
  });
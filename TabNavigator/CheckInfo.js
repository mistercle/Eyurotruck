import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from 'react-native';

import MapView, { Marker } from 'react-native-maps';

export default class CheckInfo extends Component {
  
  static navigationOptions = {
    title : '내 화물 정보',
  };
  constructor(props) {
    super(props);

    this.state = {
      content_lat : 0,
      content_lng : 0,
      orderType : 0,
      markers: [] 
    }
    
  }

  componentDidMount() {
    const { navigation } = this.props;
    this.setState({
        content_lat : navigation.getParam('content_lat', null),
        content_lng : navigation.getParam('content_lat', null),
        orderType : navigation.getParam('orderType', null),
        markers : [
            ...this.state.markers,
            {
                coordinate: {
                    latitude : navigation.getParam('content_lat', null),
                    longitude : navigation.getParam('content_lat', null)
                }
            }
        ]
    })
  }

  render() {
    return (
      <View>
      <MapView 
        style={styles.map}
        region={{
            latitude: this.state.content_lat,
            longitude: this.state.content_lng,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
      >
      {this.state.markers.map((marker) => {
        return (
          <Marker {...marker} >
            <View style={styles.marker}>
              <Text>뒤로</Text>
            </View>
          </Marker>
        )
      })}
      
      </MapView>
      
      <TouchableOpacity
      style = {styles.submitButton}
      onPress = {this.props.navigation.goBack()}
      >
        <Text style={styles.submitButtonText}>뒤로</Text>
      </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  marker: {
    backgroundColor: "#550bbc",
    padding: 5,
    borderRadius: 5,
  },
  text: {
    color: "#FFF",
    fontWeight: "bold"
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
  },
  map : {
    //marginTop : Constants.statusBarHeight,
    width : 390,
    height : 390
  }
});

AppRegistry.registerComponent('maps', () => maps);
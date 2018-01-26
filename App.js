/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  PermissionsAndroid
} from 'react-native';

/*const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

async function requestGeolocationPermission () {
  try {
    const state = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        'title': 'Rapi App Permisos',
        'message': 'Rapi App necesita acceder a tu geolocalización ' +
                    'para que pueda trazar tu ruta.'
      }
    )
    return state
  } catch (err) {
    console.warn(err)
    return err
  }
}*/

export default class App extends Component<{}> {
  constructor (props) {
    super(props)

    this.state = {
      latitude: null,
      longitude: null,
      error: null,
    }
  }

  componentDidMount () {
    /*navigator.geolocation.getCurrentPosition(
      position => {
        this.setState({...position.coords})
      },
      err => this.setState({ error: err.message }),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    )*/
    this.watchPosition = navigator.geolocation.watchPosition(
      position => {
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        })
      },
      err => this.setState({ error: err.message }),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    )
  }

  componentWillUnmount () {
    navigator.geolocation.clearWatch(this.watchPosition)
  }

  render () {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Geolocation with React Native (L)
        </Text>
        <Text style={styles.instructions}>
          Latitude: {this.state.latitude}
        </Text>
        <Text style={styles.instructions}>
          Longitude: {this.state.longitude}
        </Text>
        {this.state.error ? <Text>Error: {this.state.error}</Text> : null}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native'
import * as Facebook from 'expo-facebook'
import Expo from 'expo'
import { Settings } from 'react-native-fbsdk-next'

export default function App() {
  async function logIn() {
    try {
      await Facebook.initializeAsync({
        appId: '851387698833191',
      })
      const {
        type,
        token,
        expirationDate,
        permissions,
        declinedPermissions,
      } = await Facebook.logInWithReadPermissionsAsync({
        permissions: ['public_profile', 'email'],
      })
      if (type === 'success') {
        // Get the user's name using Facebook's Graph API
        const uri = `https://graph.facebook.com/me?access_token=${token}`
        console.log('uri ', uri)
        const response = await fetch(
          `https://graph.facebook.com/me?access_token=${token}`
        )
        const name = await response.json()       
        alert(`Logged in! Hi ${name.name}`)        
      } else {
        // type === 'cancel'
      }
    } catch ({ message }) {
      console.log('message ', message)
      alert(`Facebook Login Error: ${message}`)
    }
  }

  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <TouchableOpacity onPress={() => logIn()}>
        <View
          style={{
            width: '50%',
            borderRadius: 4,
            padding: 24,
            backgroundColor: '#3b5998',
            marginTop: 10,
          }}
        >
          <Text>Login Facebook</Text>
        </View>
      </TouchableOpacity>
      <StatusBar style="auto" />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})

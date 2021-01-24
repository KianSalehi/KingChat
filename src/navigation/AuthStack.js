import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SignupScreen from '../Screens/SignupScreen';
import LoginScreen from '../Screens/LoginScreen';

//instance of stack navigator
const Stack= createStackNavigator();

export default function AuthStack(){
    return(
        <Stack.Navigator initialRouteName='Login' headerMode='none'>
            <Stack.Screen name='Login' component={LoginScreen}/>
            <Stack.Screen name='Signup' component={SignupScreen}/>
        </Stack.Navigator>
    )
}
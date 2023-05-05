import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {DrawerItem, createDrawerNavigator} from '@react-navigation/drawer';

import CustomDrawed from './src/components/CustomDrawed';
import OnBoardScreen from './src/views/screens/OnBoardScreen';
import HomeScreen from './src/views/screens/HomeScreen';
import DetailsScreen from './src/views/screens/DetailsScreen';
import ManageProfile from './src/views/screens/ManageProfile';
import About from './src/views/screens/About';
import PostNew from './src/views/screens/PostNew';
import SavedNews from './src/views/screens/SavedNews';
import LoginScreen from './src/views/screens/LoginScreen';
import RegisterScreen from './src/views/screens/RegisterScreen';
const Drawer = createDrawerNavigator();

function App(): JSX.Element {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        backBehavior="history"
        drawerContent={props => <CustomDrawed {...props} />}
        screenOptions={{headerShown: false, swipeEdgeWidth: 200}}>
        <Drawer.Screen
          name="OnBoardScreen"
          component={OnBoardScreen}
          options={{drawerItemStyle: {display: 'none'}}}
        />
        <Drawer.Screen name="HomeScreen" component={HomeScreen} />
        <Drawer.Screen
          name="DetailsScreen"
          component={DetailsScreen}
          options={{drawerItemStyle: {display: 'none'}}}
        />
        <Drawer.Screen name="ManageProfile" component={ManageProfile} />
        <Drawer.Screen name="PostNew" component={PostNew} />
        <Drawer.Screen name="SavedNews" component={SavedNews} />
        <Drawer.Screen name="About" component={About} />
        <Drawer.Screen
          name="LoginScreen"
          component={LoginScreen}
          options={{drawerItemStyle: {display: 'none'}}}
        />
        <Drawer.Screen
          name="RegisterScreen"
          component={RegisterScreen}
          options={{drawerItemStyle: {display: 'none'}}}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

export default App;

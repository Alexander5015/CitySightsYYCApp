import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './src/screens/HomeScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import ExploreScreen from './src/screens/ExploreScreen';
import Header from './src/components/HeaderComponent';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='HomeScreen'>
        {/*Home Screen enables selection of origin + destination*/}
        <Stack.Screen
          name="HomeScreen"
          component={HomeScreen}
          // Hiding header for Splash Screen
          options={{
            header: () => <Header />
          }}
        />
        {/* Route Screen which will come after  */}
        <Stack.Screen
          name="ExploreScreen"
          component={ExploreScreen}
          // Hiding header for Splash Screen
          options={{
            header: () => <Header />
          }}
        />
        {/* Route Screen which will come after  */}
        <Stack.Screen
          name="ProfileScreen"
          component={ProfileScreen}
          // Hiding header for Splash Screen
          options={{headerShown: false}}
        />
        {/* Route Screen which will come after  */}
        <Stack.Screen
          name="Screen3"
          component={HomeScreen}
          // Hiding header for Splash Screen
          options={{headerShown: false}}
        />
        {/* Route Screen which will come after  */}
        <Stack.Screen
          name="Screen4"
          component={HomeScreen}
          // Hiding header for Splash Screen
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};


export default App;
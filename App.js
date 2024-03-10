
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MovieListScreen from './src/screens/MovieList';
import MovieDetailScreen from './src/screens/MovieDetailScreen';
import { Provider } from 'react-redux';
import { store } from './src/store/store';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const MoviesStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="Movies" component={MovieListScreen} />
    <Stack.Screen name="MovieDetail" component={MovieDetailScreen} />
  </Stack.Navigator>
);

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Popular" component={MoviesStack} />
        <Tab.Screen name="Latest" component={MoviesStack} />
      </Tab.Navigator>
    </NavigationContainer>
    </Provider>
  );
};

export default App;

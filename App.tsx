import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './components/HomeScreen';
import CameraScreen from './components/CameraScreen';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="CameraScreen" component={CameraScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
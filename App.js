import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { View, StyleSheet } from 'react-native';
import AppNavigator from './src/navigation/AppNavigator';
import { ReadingProvider } from './src/context/ReadingContext';
import { ReaderSettingsProvider } from './src/context/ReaderSettingsContext';
import { Colors } from './src/constants/theme';

export default function App() {
  return (
    <SafeAreaProvider>
      <ReadingProvider>
        <ReaderSettingsProvider>
          <View style={styles.container}>
            <NavigationContainer>
              <AppNavigator />
            </NavigationContainer>
            <StatusBar style="dark" />
          </View>
        </ReaderSettingsProvider>
      </ReadingProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
});

import React, { useState, useEffect, useRef, JSX } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import colors from '../theme/colors';
import { useStore } from '../store/useStore';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ROUTES, type RootStackParamList } from '../navigation/appNavigator';
import { PrimaryButton } from '../components/button';
import layout from '../theme/layout';

export const Login = (): JSX.Element => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');

  const user = useStore(state => state.user);
  const login = useStore(state => state.login);
  const myAppointment = useStore(state => state.myAppointment);

  const passwordRef = useRef<TextInput>(null);

  const { navigate } =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  useEffect(() => {
    if (user) {
      if (myAppointment !== null) {
        navigate(ROUTES.EXISTING_APPOINTMENT);
      } else {
        navigate(ROUTES.APPOINTMENT_BOOKING);
      }
    }
  }, [user]);

  const onPress = async () => {
    if (userName && password) {
      await login({ userName, password });
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputsContainer}>
        <TextInput
          style={styles.input}
          placeholder="הזן שם משתמש"
          value={userName}
          onChangeText={setUserName}
          returnKeyType="next"
          onSubmitEditing={() => passwordRef.current?.focus()}
        />
        <TextInput
          ref={passwordRef}
          style={styles.input}
          placeholder="הזן סיסמה"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
      </View>
      <PrimaryButton
        title="כניסה"
        onPress={onPress}
        disabled={!userName || !password}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  inputsContainer: {
    gap: 20,
    flex: 1,
    justifyContent: 'center',
  },
  input: {
    ...layout,
    backgroundColor: colors.background,
    borderColor: colors.secondary,
  },
});

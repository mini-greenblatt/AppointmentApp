import React from 'react';
import { TouchableOpacity } from 'react-native';
import {
  NativeStackNavigationProp,
  createNativeStackNavigator,
} from '@react-navigation/native-stack';
import { NavigationProp, Route } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';

import { ExistingAppointment } from '../screens/existingAppointment';
import { Login } from '../screens/login';
import { AppointmentBooking } from '../screens/appointmentBooking';
import { AppointmentSummary } from '../screens/appointmentSummary';
import { Calendar } from '../screens/calendar';
import { useStore } from '../store/useStore';
import { Text } from '../components/text';
import LogoutIcon from '../assets/icons/logout.svg';

export enum ROUTES {
  LOGIN = 'LOGIN',
  APPOINTMENT_BOOKING = 'APPOINTMENT_BOOKING',
  CALENDAR = 'CALENDAR',
  EXISTING_APPOINTMENT = 'EXISTING_APPOINTMENT',
  APPOINTMENT_SUMMARY = 'APPOINTMENT_SUMMARY',
}

export type RootStackParamList = {
  [ROUTES.LOGIN]: undefined;
  [ROUTES.APPOINTMENT_BOOKING]: undefined;
  [ROUTES.CALENDAR]: { profession: string };
  [ROUTES.EXISTING_APPOINTMENT]: undefined;
  [ROUTES.APPOINTMENT_SUMMARY]: undefined;
};

export type NavigationProps = NavigationProp<RootStackParamList>;
export type RouteProps<T extends keyof RootStackParamList> = Route<
  T,
  RootStackParamList[T]
>;

const Stack = createNativeStackNavigator<RootStackParamList>();

const LogoutButton = () => {
  const logout = useStore(state => state.logout);
  const { navigate } =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <TouchableOpacity
      style={{ justifyContent: 'center', alignItems: 'center' }}
      onPress={async () => {
        await logout();
        navigate(ROUTES.LOGIN);
      }}
    >
      <LogoutIcon width={22} height={22} />
      <Text variant="value">התנתק</Text>
    </TouchableOpacity>
  );
};

export const RootNavigation = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerRight: () => <LogoutButton />,
        headerShown: true,
      }}
    >
      <Stack.Screen
        name={ROUTES.LOGIN}
        component={Login}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={ROUTES.EXISTING_APPOINTMENT}
        component={ExistingAppointment}
        options={{
          headerTitle: () => <></>,
        }}
      />
      <Stack.Screen
        name={ROUTES.APPOINTMENT_BOOKING}
        component={AppointmentBooking}
        options={{
          headerTitle: () => <></>,
        }}
      />
      <Stack.Screen
        name={ROUTES.APPOINTMENT_SUMMARY}
        component={AppointmentSummary}
        options={{
          headerTitle: () => <></>,
        }}
      />
      <Stack.Screen
        name={ROUTES.CALENDAR}
        component={Calendar}
        options={{
          headerTitle: () => <></>,
        }}
      />
    </Stack.Navigator>
  );
};

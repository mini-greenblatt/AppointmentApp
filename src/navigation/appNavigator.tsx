import React from 'react';
import {
  NativeStackNavigationProp,
  createNativeStackNavigator,
} from '@react-navigation/native-stack';
import { ExistingAppointment } from '../screens/existingAppointment';
import { Login } from '../screens/login';
import { AppointmentBooking } from '../screens/appointmentBooking';
import { AppointmentSummery } from '../screens/appointmentSummery';
import { Calendar } from '../screens/calendar';
import { NavigationProp, Route } from '@react-navigation/native';
import { useStore } from '../store/useStore';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native';
import { Text } from '../components/text';
import LogoutIcon from '../assets/icons/logout.svg';

export enum ROUTES {
  LOGIN = 'LOGIN',
  APPOINTMENT_BOOKING = 'APPOINTMENT_BOOKING',
  CALENDAR = 'CALENDAR',
  EXISTING_APPOINTMENT = 'EXISTING_APPOINTMENT',
  APPOINTMENT_SUMMERY = 'APPOINTMENT_SUMMERY',
}

export type RootStackParamList = {
  [ROUTES.LOGIN]: undefined;
  [ROUTES.APPOINTMENT_BOOKING]: undefined;
  [ROUTES.CALENDAR]: { profession: string };
  [ROUTES.EXISTING_APPOINTMENT]: undefined;
  [ROUTES.APPOINTMENT_SUMMERY]: undefined;
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
    <Stack.Navigator>
      <Stack.Screen
        name={ROUTES.LOGIN}
        component={Login}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={ROUTES.EXISTING_APPOINTMENT}
        component={ExistingAppointment}
        options={{
          headerShown: true,
          title: 'פרטי תור',
          headerRight: () => <LogoutButton />,
        }}
      />
      <Stack.Screen
        name={ROUTES.APPOINTMENT_BOOKING}
        component={AppointmentBooking}
        options={{
          headerShown: true,
          title: 'זימון תורים',
          headerRight: () => <LogoutButton />,
        }}
      />
      <Stack.Screen
        name={ROUTES.APPOINTMENT_SUMMERY}
        component={AppointmentSummery}
        options={{
          headerShown: true,
          title: 'אישור תור',
          headerRight: () => <LogoutButton />,
        }}
      />
      <Stack.Screen
        name={ROUTES.CALENDAR}
        component={Calendar}
        options={{
          headerTitle: () => <></>,
          headerRight: () => <LogoutButton />,
        }}
      />
    </Stack.Navigator>
  );
};

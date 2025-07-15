import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ExistingAppointment } from '../screens/existingAppointment';
import { Login } from '../screens/login';
import { AppointmentBooking } from '../screens/appointmentBooking';
import { AppointmentSummery } from '../screens/appointmentSummery';
import { Calendar } from '../screens/calendar';
import { NavigationProp, Route } from '@react-navigation/native';

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
        options={{ headerShown: true, title: 'פרטי תור' }}
      />
      <Stack.Screen
        name={ROUTES.APPOINTMENT_BOOKING}
        component={AppointmentBooking}
        options={{ headerShown: true, title: 'זימון תורים' }}
      />
      <Stack.Screen
        name={ROUTES.APPOINTMENT_SUMMERY}
        component={AppointmentSummery}
        options={{ headerShown: true, title: 'אישור תור' }}
      />
      <Stack.Screen
        name={ROUTES.CALENDAR}
        component={Calendar}
        options={{ headerTitle: () => <></> }}
      />
    </Stack.Navigator>
  );
};

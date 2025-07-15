import React, { JSX } from 'react';
import { View, StyleSheet } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { useStore } from '../store/useStore';
import { PrimaryButton } from '../components/button';
import { ROUTES, RootStackParamList } from '../navigation/appNavigator';
import colors from '../theme/colors';
import spacing from '../theme/spacing';
import { Text } from '../components/text';

export const AppointmentSummary = (): JSX.Element => {
  const appointment = useStore(state => state.myAppointment);
  const user = useStore(state => state.user);
  const saveAppointment = useStore(state => state.saveAppointment);
  const { navigate } =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  //save the appointment in asyncStorage
  const onSave = () => {
    saveAppointment();
    navigate(ROUTES.EXISTING_APPOINTMENT);
  };

  if (!appointment || !user) {
    return (
      <View style={styles.container}>
        <Text variant="header">אין נתוני תור להצגה</Text>
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      <View style={styles.container}>
        <Text variant="header">פרטי התור שזומן:</Text>
        <Text variant="label">
          למקצוע: <Text variant="value">{appointment.type}</Text>
        </Text>
        <Text variant="label">
          תאריך: <Text variant="value">{appointment.date}</Text>
        </Text>
        <Text variant="label">
          שעה: <Text variant="value">{appointment.hour}</Text>
        </Text>
        <Text variant="label">
          שם המטופל: <Text variant="value">{user.userName}</Text>
        </Text>
      </View>
      <PrimaryButton title="אישור הזימון" onPress={onSave} />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: spacing.md,
    backgroundColor: colors.background,
  },
  container: {
    flex: 1,
    padding: spacing.lg,
    alignItems: 'flex-start',
  },
});

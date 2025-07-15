import React from 'react';
import { Button, View, Alert, StyleSheet } from 'react-native';
import { useStore } from '../store/useStore';
import { NavigationProps, ROUTES } from '../navigation/appNavigator';
import { useNavigation } from '@react-navigation/native';
import { Text } from '../components/text';
import { PrimaryButton, SecondaryButton } from '../components/button';
import colors from '../theme/colors';
import spacing from '../theme/spacing';

export const ExistingAppointment = () => {
  const appointment = useStore(state => state.myAppointment);
  const cancelAppointment = useStore(state => state.cancelAppointment);

  const { navigate } = useNavigation<NavigationProps>();

  const onCancel = () => {
    cancelAppointment();
    Alert.alert('התור בוטל בהצלחה!');
    navigate(ROUTES.APPOINTMENT_BOOKING);
  };

  const onUpdate = () => {
    navigate(ROUTES.CALENDAR, { profession: appointment?.type ?? '' });
  };

  return (
    <View style={styles.container}>
      {appointment !== null && (
        <View style={styles.detailsContainer}>
          <Text variant="header">פרטי תור קיים:</Text>
          <Text variant="body">{appointment.type}</Text>
          <Text variant="body">ביום {appointment.date}</Text>
          <Text variant="body">בשעה {appointment.hour}</Text>
        </View>
      )}
      <PrimaryButton title="לביטול התור" onPress={onCancel} />
      <SecondaryButton title="לעדכון התור" onPress={onUpdate} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    flex: 1,
    padding: spacing.lg,
    gap: spacing.sm,
  },
  detailsContainer: {
    flex: 1,
    padding: spacing.lg,
    gap: spacing.xs,
  },
});

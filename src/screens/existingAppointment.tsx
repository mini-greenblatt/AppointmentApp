import React, { JSX } from 'react';
import { View, Alert, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useStore } from '../store/useStore';
import { NavigationProps, ROUTES } from '../navigation/appNavigator';
import { Text } from '../components/text';
import { PrimaryButton, SecondaryButton } from '../components/button';
import colors from '../theme/colors';
import spacing from '../theme/spacing';

export const ExistingAppointment = (): JSX.Element => {
  const appointment = useStore(state => state.myAppointment);
  const cancelAppointment = useStore(state => state.cancelAppointment);

  const { reset, navigate } = useNavigation<NavigationProps>();

  //on press ok button on cancel appointment alert
  const onCancelAppointment = async () => {
    await cancelAppointment();
    Alert.alert('התור בוטל בהצלחה!');
  };

  //on press cancel button on screen
  const onCancel = () => {
    Alert.alert(
      'אישור ביטול',
      'האם אתה בטוח שברצונך לבטל את התור?',
      [
        {
          text: 'לא',
          style: 'cancel',
        },
        {
          text: 'כן',
          onPress: onCancelAppointment,
          style: 'destructive',
        },
      ],
      { cancelable: true },
    );
  };

  const onUpdate = () => {
    navigate(ROUTES.CALENDAR, {
      profession: appointment?.type ?? '',
    });
  };

  const onCreateNew = () => {
    reset({
      routes: [{ name: ROUTES.LOGIN }, { name: ROUTES.APPOINTMENT_BOOKING }],
    });
  };

  return (
    <View style={styles.screen}>
      {appointment !== null ? (
        <View style={styles.container}>
          <View style={styles.detailsContainer}>
            <Text variant="header">פרטי תור קיים:</Text>
            <Text variant="body">{appointment.type}</Text>
            <Text variant="body">ביום {appointment.date}</Text>
            <Text variant="body">בשעה {appointment.hour}</Text>
          </View>
          <PrimaryButton title="לביטול התור" onPress={onCancel} />
          <SecondaryButton title="לעדכון התור" onPress={onUpdate} />
        </View>
      ) : (
        <View style={styles.container}>
          <View style={{ flex: 1 }}>
            <Text variant="header">אין לך תורים במערכת</Text>
          </View>
          <PrimaryButton title=" לזימון תור חדש" onPress={onCreateNew} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
    padding: spacing.md,
  },
  container: {
    flex: 1,
    gap: spacing.md,
  },
  detailsContainer: {
    flex: 1,
    padding: spacing.lg,
    gap: spacing.xs,
    alignItems: 'flex-start',
  },
});

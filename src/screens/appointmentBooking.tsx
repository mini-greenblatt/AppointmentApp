import React, { JSX } from 'react';
import { View, StyleSheet } from 'react-native';
import { aviableAppointments } from '../data/appointment';
import { useStore } from '../store/useStore';
import { Picker } from '@react-native-picker/picker';
import colors from '../theme/colors';
import { SecondaryButton } from '../components/button';
import { ROUTES, RootStackParamList } from '../navigation/appNavigator';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import layout from '../theme/layout';
import spacing from '../theme/spacing';

const professions = Object.keys(aviableAppointments);

export const AppointmentBooking = (): JSX.Element => {
  const setProfession = useStore(state => state.setProfession);
  const profession = useStore(state => state.profession);

  const { navigate } =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <View style={styles.container}>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={profession}
          onValueChange={itemValue => {
            if (itemValue) setProfession(itemValue);
          }}
        >
          <Picker.Item label="בחר/י מקצוע הרופא" />
          {professions.map(prof => (
            <Picker.Item key={prof} label={prof} value={prof} />
          ))}
        </Picker>
      </View>
      {profession && (
        <SecondaryButton
          title="חיפוש יומנים"
          onPress={() => navigate(ROUTES.CALENDAR, { profession })}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: spacing.lg,
  },
  pickerContainer: {
    width: '100%',
    flex: 1,
    borderRadius: layout.borderRadius,
    borderColor: colors.primary,
  },
});

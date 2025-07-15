import dayjs from 'dayjs';
import React, { useState, useMemo, useEffect, JSX } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Calendar as RNCalendar } from 'react-native-calendars';
import { useStore } from '../store/useStore';
import { useNavigation, useRoute } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import {
  ROUTES,
  RootStackParamList,
  RouteProps,
} from '../navigation/appNavigator';
import colors from '../theme/colors';
import { aviableAppointments } from '../data/appointment';
import { SecondaryButton } from '../components/button';
import spacing from '../theme/spacing';

type DayProps = {
  onPress: () => void;
  isEnabled: boolean;
  day: number;
  backgroundColor: string;
  isSelected?: boolean;
};

const DayComponent = ({
  isEnabled,
  onPress,
  day,
  backgroundColor,
  isSelected = false,
}: DayProps): JSX.Element => {
  return (
    <TouchableOpacity
      disabled={!isEnabled}
      onPress={onPress}
      style={{
        backgroundColor: backgroundColor,
        borderRadius: 20,
        padding: spacing.xs,
        borderWidth: isSelected ? 1 : 0,
        borderColor: isSelected ? colors.text : colors.background,
        opacity: isEnabled ? 1 : 0.3,
      }}
    >
      <Text
        style={{
          color: colors.text,
          textAlign: 'center',
        }}
      >
        {day}
      </Text>
    </TouchableOpacity>
  );
};

export const Calendar = (): JSX.Element => {
  const { navigate } =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  //pass profession on create from selection and on update from zustand
  const {
    params: { profession },
  } = useRoute<RouteProps<ROUTES.CALENDAR>>();

  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [availableHours, setAvailableHours] = useState<string[]>([]);
  const [selectedHour, setSelectedHour] = useState<string | null>(null);
  const todayDate = dayjs().format('YYYY-MM-DD');

  const addAppointment = useStore(state => state.addAppointment);

  // collect all enabled dates in YYYY-MM-DD format by profession
  const enabledDates = Object.keys(aviableAppointments[profession])
    .map(date => dayjs(date, 'DD/MM/YYYY', true).format('YYYY-MM-DD'))
    .filter(date => date !== 'Invalid Date');

  // only enabled dates are selectable, all others are disabled
  const markedDates = useMemo(() => {
    const marks: { [date: string]: any } = {};
    enabledDates.forEach(dateFormatted => {
      marks[dateFormatted] = {
        marked: true,
        dotColor: colors.primary,
        selected: true,
        selectedColor:
          selectedDate === dateFormatted ? colors.primary : colors.secondary,
      };
    });

    // סימון היום הנוכחי (גם אם לא מאופשר)
    if (todayDate && !marks[todayDate]) {
      marks[todayDate] = {
        selected: false,
        marked: true,
        dotColor: colors.primary || 'red',
        today: true,
      };
    }

    return marks;
  }, [enabledDates, selectedDate]);

  useEffect(() => {
    if (profession && selectedDate) {
      // Load available hours for the selected date and profession
      setAvailableHours(aviableAppointments[profession]?.[selectedDate] || []);
    }
  }, [profession, selectedDate]);

  const onSelectHour = (item: string) => {
    if (!selectedDate || !profession) return;
    //save in zustand the appointment
    addAppointment({
      type: profession,
      date: selectedDate,
      hour: item,
    });
    setSelectedHour(item);
    navigate(ROUTES.APPOINTMENT_SUMMARY);
  };

  const onDayPress = (dateString: string) => {
    setSelectedDate(dayjs(dateString, 'YYYY-MM-DD').format('DD/MM/YYYY'));
    setSelectedHour(null);
  };

  const resetDateAndHour = () => {
    setSelectedDate(null);
    setSelectedHour(null);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>תורים זמינים ל{profession}</Text>
      <RNCalendar
        style={{
          width: '100%',
          height: 350,
          marginBottom: 16,
        }}
        markedDates={markedDates}
        onDayPress={day => {
          if (!enabledDates.includes(day.dateString)) return;
          onDayPress(day.dateString);
        }}
        onMonthChange={resetDateAndHour}
        dayComponent={({ date, marking }) => {
          if (!date) return null;
          const isEnabled = enabledDates.includes(date.dateString);
          const isSelected =
            selectedDate ===
            dayjs(date.dateString, 'YYYY-MM-DD').format('DD/MM/YYYY');

          return (
            <DayComponent
              isEnabled={isEnabled}
              day={date.day}
              onPress={() => onDayPress(date.dateString)}
              backgroundColor={
                marking?.selectedColor ||
                (marking?.today ? colors.primary : colors.background)
              }
              isSelected={isSelected}
            />
          );
        }}
      />
      {selectedDate && (
        <View style={styles.hoursList}>
          {availableHours.map((item: string) => (
            <View style={{ padding: 4 }} key={item}>
              <SecondaryButton
                title={item}
                onPress={() => onSelectHour(item)}
                selected={selectedHour === item}
              />
            </View>
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: colors.background,
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    textAlign: 'center',
  },
  hoursList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
});

import dayjs from 'dayjs';
import React, { useState, useMemo } from 'react';
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

///TODO:pass profession on new from selection on update from zustamd
export const Calendar = () => {
  const { navigate } =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const {
    params: { profession },
  } = useRoute<RouteProps<ROUTES.CALENDAR>>();

  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedHour, setSelectedHour] = useState<string | null>(null);

  const addAppointment = useStore(state => state.addAppointment);

  const availableAppointments = aviableAppointments[profession];
  // Collect all enabled dates in YYYY-MM-DD format
  const enabledDates = useMemo(() => {
    return Object.keys(availableAppointments)
      .map(date => dayjs(date, 'DD/MM/YYYY', true).format('YYYY-MM-DD'))
      .filter(date => date !== 'Invalid Date');
  }, [availableAppointments]);

  // Prepare markedDates: only enabled dates are selectable, all others are disabled
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
    // Optionally, mark the selected date if it's not in enabledDates
    if (selectedDate && !marks[selectedDate]) {
      marks[selectedDate] = {
        selected: true,
        selectedColor: colors.primary,
        disabled: true,
      };
    }
    return marks;
  }, [enabledDates, selectedDate]);

  const hours = selectedDate ? availableAppointments[selectedDate] : [];

  const onSelectHour = (item: string) => {
    if (!selectedDate || !profession) return;
    addAppointment({
      type: profession,
      date: selectedDate,
      hour: item,
    });
    setSelectedHour(item);
    navigate(ROUTES.APPOINTMENT_SUMMERY);
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
          setSelectedDate(
            dayjs(day.dateString, 'YYYY-MM-DD').format('DD/MM/YYYY'),
          );
          setSelectedHour(null);
        }}
        disabledByDefault={true}
        disableAllTouchEventsForDisabledDays={true}
        dayComponent={({ date, marking }) => {
          if (!date) return null;
          const isEnabled = enabledDates.includes(date.dateString);
          return (
            <TouchableOpacity
              disabled={!isEnabled}
              onPress={() => {
                if (isEnabled) {
                  setSelectedDate(
                    dayjs(date.dateString, 'YYYY-MM-DD').format('DD/MM/YYYY'),
                  );
                  setSelectedHour(null);
                }
              }}
              style={{
                backgroundColor: marking?.selectedColor || 'transparent',
                borderRadius: 20,
                padding: 4,
                opacity: isEnabled ? 1 : 0.3,
              }}
            >
              <Text
                style={{
                  color: isEnabled ? '#222' : '#aaa',
                  textAlign: 'center',
                }}
              >
                {date.day}
              </Text>
            </TouchableOpacity>
          );
        }}
      />

      {selectedDate && (
        <View
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'center',
          }}
        >
          {hours.map((item: string) => (
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
});

import { create } from 'zustand';
import { Appointment } from '../data/appointment';
import { produce } from 'immer';
import AsyncStorage from '@react-native-async-storage/async-storage';

type User = { userName: string; password: string };

type State = {
  profession: string | null;
  setProfession: (profession: string) => void;
  myAppointment: Appointment | null;
  setMyAppointment: (myAppointment: Appointment) => void;
  user: User | null;
  login: (user: User) => void;
  cancelAppointment: () => void;
  addAppointment: (newAppointment: Appointment) => void;
  saveAppointment: () => void;
};

export const useStore = create<State>((set, get) => ({
  user: null,
  profession: null,
  myAppointment: null,
  setProfession: profession =>
    set(
      produce<State>(state => {
        state.profession = profession;
      }),
    ),
  setMyAppointment: myAppointment =>
    set(
      produce<State>(state => {
        state.myAppointment = myAppointment;
      }),
    ),
  login: async user => {
    await AsyncStorage.setItem('user', JSON.stringify(user));
    try {
      const existingAppointment = await AsyncStorage.getItem('appointment');
      if (existingAppointment) {
        get().setMyAppointment(JSON.parse(existingAppointment));
      }
    } catch (err) {}
    set(
      produce<State>(state => {
        state.user = user;
      }),
    );
  },
  cancelAppointment: async () => {
    await AsyncStorage.removeItem('appointment');
    set(
      produce<State>(state => {
        state.myAppointment = null;
      }),
    );
  },
  addAppointment: async appointment => {
    set(
      produce<State>(state => {
        state.myAppointment = appointment;
      }),
    );
  },
  saveAppointment: async () => {
    await AsyncStorage.setItem(
      'appointment',
      JSON.stringify(get().myAppointment),
    );
  },
}));

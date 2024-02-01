import { type FeathersService, feathers } from '@feathersjs/feathers';
import authenticationClient from '@feathersjs/authentication-client';
import socketio from '@feathersjs/socketio-client';
import io from 'socket.io-client';
import { createPiniaClient } from 'feathers-pinia';
import { pinia } from '@/modules/pinia';

const host =
  (import.meta.env.VITE_MY_API_URL as string) || 'http://localhost:3030';
const socket = io(host, { transports: ['websocket'] });

export const feathersClient = feathers<Record<string, FeathersService>>()
  .configure(socketio(socket))
  .configure(authenticationClient({ storage: window.localStorage }));

export const api = createPiniaClient(feathersClient, {
  pinia,
  idField: '_id',
  // optional
  ssr: false,
  whitelist: [],
  paramsForServer: [],
  syncWithStorage: true,
  skipGetIfExists: true,
  customSiftOperators: {},
  setupInstance(data) {
    return data;
  },
  customizeStore() {
    return {};
  },
  services: {},
});

export function useFeathers() {
  return { api };
}

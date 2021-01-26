import React from 'react';
import {Provider as PaperProvider} from 'react-native-paper';
import {AuthProvider} from './AuthProvider';
import Routes from './Routes';

export default function Provider() {
  return (
    <PaperProvider>
      <AuthProvider>
        <Routes />
      </AuthProvider>
    </PaperProvider>
  );
}

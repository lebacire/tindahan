declare module 'expo-barcode-scanner' {
  import { ComponentType } from 'react';
    import { StyleProp, ViewProps, ViewStyle } from 'react-native';

  export type BarCodeEvent = { data: string };

  type BarCodeScannerProps = ViewProps & {
    onBarCodeScanned?: (event: BarCodeEvent) => void;
    style?: StyleProp<ViewStyle>;
  };

  export const BarCodeScanner: ComponentType<BarCodeScannerProps>;

  export function requestPermissionsAsync(): Promise<{ status: 'granted' | string }>;
}

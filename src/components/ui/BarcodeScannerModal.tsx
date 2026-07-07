import { CameraView, useCameraPermissions } from "expo-camera";
import { useEffect } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import Typography from "./Typography";

type Props = {
  visible: boolean;
  onClose: () => void;
  onScanned: (data: string) => void;
};

export default function BarcodeScannerModal({
  visible,
  onClose,
  onScanned,
}: Props) {
  const [permission, requestPermission] = useCameraPermissions();

  useEffect(() => {
    if (!permission) return;

    if (!permission.granted) {
      requestPermission();
    }
  }, [permission]);

  const handleBarCodeScanned = ({
    data,
  }: {
    data: string;
    type: string;
  }) => {
    onScanned(data);
    onClose();
  };

  if (!visible) return null;

  return (
    <View style={styles.overlay}>
      <View style={styles.card}>
        <View style={styles.header}>
          <Typography variant="title">Scan barcode</Typography>

          <Pressable onPress={onClose} style={styles.closeBtn}>
            <Text style={styles.closeText}>×</Text>
          </Pressable>
        </View>

        {!permission ? (
          <Typography>Checking camera permission...</Typography>
        ) : !permission.granted ? (
          <Typography>Camera permission denied.</Typography>
        ) : (
          <View style={styles.scannerContainer}>


<CameraView
  style={{ flex: 1 }}
  facing="back"
  barcodeScannerSettings={{
    barcodeTypes: ["ean13", "ean8", "upc_a", "upc_e", "qr"],
  }}
  onBarcodeScanned={(result) => {
    console.log('result');
    console.log(result);
  }}
/>



          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  card: {
    width: "100%",
    maxWidth: 600,
    backgroundColor: "#fff",
    borderRadius: 16,
    overflow: "hidden",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 14,
    borderBottomWidth: 1,
    borderColor: "#EEE",
  },
  closeBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#F4F1EE",
    justifyContent: "center",
    alignItems: "center",
  },
  closeText: {
    fontSize: 20,
    color: "#111827",
  },
  scannerContainer: {
    height: 420,
    backgroundColor: "#000",
  },
});
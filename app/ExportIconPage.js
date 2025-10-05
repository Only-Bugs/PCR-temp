import * as MediaLibrary from "expo-media-library";
import { useRef } from "react";
import { Alert, Button, View } from "react-native";
import ViewShot from "react-native-view-shot";

import AdaptiveIconExport from "../components/AdaptiveIconExport";
import AppIconExport from "../components/AppIconExport";

const ExportIconPage = () => {
  const appIconRef = useRef(null);
  const adaptiveIconRef = useRef(null);

  const saveToDownloads = async (uri, name) => {
    const { status } = await MediaLibrary.requestPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permission required", "Media library access is needed.");
      return;
    }

    const asset = await MediaLibrary.createAssetAsync(uri);
    await MediaLibrary.createAlbumAsync("Download", asset, false);

    Alert.alert("Saved", `${name} saved to Downloads!`);

  };

  const handleExportAppIcon = async () => {
    const uri = await appIconRef.current.capture();
    await saveToDownloads(uri, "App Icon");
  };

  const handleExportAdaptiveIcon = async () => {
    const uri = await adaptiveIconRef.current.capture();
    await saveToDownloads(uri, "Adaptive Icon");
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      {/* Hidden full-size exports */}
      <ViewShot
        ref={appIconRef}
        options={{ format: "png", quality: 1.0, width: 1024, height: 1024 }}
        style={{ position: "absolute", top: -2000 }}
      >
        <AppIconExport size={1024} />
      </ViewShot>

      <ViewShot
        ref={adaptiveIconRef}
        options={{ format: "png", quality: 1.0, width: 1024, height: 1024 }}
        style={{ position: "absolute", top: -2000 }}
      >
        <AdaptiveIconExport size={1024} />
      </ViewShot>

      {/* On-screen preview */}
      <AppIconExport size={128} />

      {/* Buttons */}
      <View style={{ marginTop: 20 }}>
        <Button title="Export App Icon" onPress={handleExportAppIcon} />
        <Button
          title="Export Adaptive Icon"
          onPress={handleExportAdaptiveIcon}
        />
      </View>
    </View>
  );
};

export default ExportIconPage;

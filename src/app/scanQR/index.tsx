import {colors} from 'utils/Theming';
import layout from 'constants/layout';
import {useEffect, useState} from 'react';
import {CameraOff, Scan, X} from 'lucide-react-native';
import {RgText, Text} from 'components/_ui/typography';
import {useNavigation} from '@react-navigation/native';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {
  Camera,
  useCodeScanner,
  useCameraDevice,
  useCameraPermission,
} from 'react-native-vision-camera';

const ScanQR = () => {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const device = useCameraDevice('back');
  const [isActive, setIsActive] = useState(true);
  const {hasPermission, requestPermission} = useCameraPermission();

  useEffect(() => {
    requestPermission();
  }, []);

  const codeScanner = useCodeScanner({
    codeTypes: ['qr'],
    onCodeScanned: codes => {
      // check if the value of any of the codes is a wallet connect uri
      const wcUri = codes.find(code => code.value?.includes('wc:'));

      if (wcUri) {
        setIsActive(false);
        console.log(JSON.stringify(wcUri?.value, null, 2));

        // navigation.navigate('connectWallet', {uri: wcUri?.value});
      }
    },
  });

  const renderCamera = () => {
    return (
      <View style={styles.cameraContainer}>
        <Camera
          device={device!}
          isActive={isActive}
          codeScanner={codeScanner}
          style={StyleSheet.absoluteFill}
        />

        <View style={styles.cameraLabels}>
          <Scan color="#fff" strokeWidth={0.3} size={layout.width * 0.7} />
          <RgText
            style={{
              fontSize: 16,
              color: '#fff',
              maxWidth: '90%',
              textAlign: 'center',
            }}>
            Scanning
          </RgText>
        </View>
      </View>
    );
  };

  return (
    <View style={[styles.container, {justifyContent: 'flex-end'}]}>
      <View
        style={[
          styles.container,
          {
            backgroundColor: colors.accent0A,
            maxHeight: layout.height - insets.top,
          },
        ]}>
        <View
          style={[
            styles.header,
            {
              overflow: 'hidden',
              borderTopLeftRadius: 12,
              borderTopRightRadius: 12,
              backgroundColor: colors.accent21,
            },
          ]}>
          <TouchableOpacity
            activeOpacity={1}
            style={[styles.cancelBtn]}
            onPress={() => navigation.goBack()}>
            <X size={22} color={colors.white} strokeWidth={2.1} />
          </TouchableOpacity>
          <Text style={[styles.headerText]}>Scan QR Code</Text>
        </View>

        {hasPermission === null ? (
          <></>
        ) : hasPermission === false ? (
          <View
            style={[
              styles.flexView,
              {
                paddingBottom: 70,
                backgroundColor: 'transparent',
              },
            ]}>
            <TouchableOpacity
              onPress={() => requestPermission()}
              style={[
                styles.flexView,
                {gap: 12, alignItems: 'center', justifyContent: 'center'},
              ]}>
              <CameraOff size={32} color="#888" strokeWidth={1.6} />
              <RgText style={{fontSize: 16}}>
                Camera permission not granted
              </RgText>
            </TouchableOpacity>
          </View>
        ) : (
          <>{renderCamera()}</>
        )}
      </View>
    </View>
  );
};

export default ScanQR;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    width: '100%',
    flexDirection: 'column',
    backgroundColor: 'transparent',
  },

  header: {
    height: 48,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
    justifyContent: 'center',
  },
  headerText: {
    fontSize: 16,
    letterSpacing: 0.3,
  },
  cancelBtn: {
    top: 0,
    right: 10,
    width: 48,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
  },

  flexView: {
    flex: 1,
    width: '100%',
    flexDirection: 'column',
  },

  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  paragraph: {
    fontSize: 16,
    marginBottom: 40,
  },
  cameraContainer: {
    flex: 1,
    overflow: 'hidden',
    position: 'relative',
  },
  camera: {
    flex: 1,
  },
  cameraLabels: {
    gap: 20,
    width: '100%',
    height: '100%',
    position: 'absolute',
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
  },
});

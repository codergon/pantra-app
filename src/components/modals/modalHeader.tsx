import {colors} from 'utils/Theming';
import {StyleSheet, View} from 'react-native';
import {RgText, Text} from 'components/_ui/typography';
import FastImage, {Source} from 'react-native-fast-image';

interface IModalHeaderProps {
  name: string;
  url: string;
  icon: Source;
}

const ModalHeader = ({name, url, icon}: IModalHeaderProps) => {
  return (
    <View style={styles.platformDetails}>
      <View
        style={[
          styles.imageContainer,
          {
            padding: 6,
          },
        ]}>
        <FastImage
          resizeMode="cover"
          source={icon}
          style={[styles.platformImage]}
        />
      </View>

      <View style={[styles.platformInfo]}>
        <Text style={{fontSize: 17}}>{name}</Text>
        <RgText style={{color: colors.subText}}>{url}</RgText>
      </View>
    </View>
  );
};

export default ModalHeader;

const styles = StyleSheet.create({
  imageContainer: {
    width: 56,
    height: 56,
    borderRadius: 14,
    overflow: 'hidden',
    backgroundColor: '#000',
  },
  platformDetails: {
    gap: 14,
    alignItems: 'center',
    flexDirection: 'column',
  },
  platformImage: {
    width: '100%',
    height: '100%',
  },
  platformInfo: {
    gap: 4,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
});

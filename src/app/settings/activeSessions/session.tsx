import React from 'react';
import {colors} from 'utils/Theming';
import {Trash} from 'phosphor-react-native';
import FastImage from 'react-native-fast-image';
import {useSession} from 'providers/SessionProvider';
import {RgText, Text} from 'components/_ui/typography';
import {StyleSheet, TouchableOpacity, View} from 'react-native';

interface SessionProps {
  session: {
    icon: any;
    desc: any;
    url: string;
    name: string;
    topic: string;
  };
}

const Session = ({session}: SessionProps) => {
  const {disconnectSession} = useSession();

  return (
    <>
      <View style={styles.platformDetails}>
        <View style={[styles.imageContainer]}>
          <FastImage
            resizeMode="cover"
            source={session?.icon}
            style={[styles.platformImage]}
          />
        </View>

        <View style={[styles.platformInfo]}>
          <Text style={{fontSize: 16}}>{session?.name}</Text>

          <View style={[styles.platformInfo_desc]}>
            {session?.desc && (
              <RgText style={{color: colors.subText2, fontSize: 14}}>
                {session?.desc}
              </RgText>
            )}
            <RgText style={{color: colors.subText, fontSize: 13}}>
              {session?.url}
            </RgText>
          </View>
        </View>

        <TouchableOpacity
          onPress={() => {
            disconnectSession(session?.topic);
          }}
          style={[styles.icon]}>
          <Trash size={20} weight="regular" color={colors.warning} />
        </TouchableOpacity>
      </View>
    </>
  );
};

export default Session;

const styles = StyleSheet.create({
  platformDetails: {
    gap: 16,
    flexDirection: 'row',
    paddingHorizontal: 18,
  },
  imageContainer: {
    width: 46,
    height: 46,
    borderRadius: 142,
    overflow: 'hidden',
    backgroundColor: colors?.accent,
  },
  platformImage: {
    width: '100%',
    height: '100%',
  },
  platformInfo: {
    flex: 1,
    flexDirection: 'column',
  },
  platformInfo_desc: {
    gap: 4,
    flexDirection: 'column',
  },

  icon: {
    width: 42,
    height: 42,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

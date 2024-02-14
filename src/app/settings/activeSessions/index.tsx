import {styles} from './styles';
import Session from './session';
import {colors} from 'utils/Theming';
import {isValidUrl} from 'utils/HelperUtils';
import {Container} from 'components/_ui/custom';
import BackBtn from 'components/_common/backBtn';
import {useSession} from 'providers/SessionProvider';
import {useNavigation} from '@react-navigation/native';
import {Header, RgText, Text} from 'components/_ui/typography';
import {ScrollView, TouchableOpacity, View} from 'react-native';
import FullBtn from 'components/shared/fullBtn';
import {AcceptRejectButton} from 'components/shared/AcceptRejectButton';

const ActiveSessions = () => {
  const navigation = useNavigation();
  const {activeSessions} = useSession();

  return (
    <Container paddingTop={10} style={[styles.container]}>
      <View style={[styles.header]}>
        <BackBtn />

        <View style={{gap: 6}}>
          <Header>Active Sessions</Header>
          <RgText style={[{fontSize: 14, color: colors.subText}]}>
            Manage active sessions and connected apps
          </RgText>
        </View>
      </View>

      <ScrollView contentContainerStyle={[styles.settings]}>
        {activeSessions?.length === 0 ? (
          <View style={[styles.no_sessions]}>
            <RgText style={[{fontSize: 20}]}>No active sessions</RgText>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => {
                navigation.navigate('scanQR');
              }}
              style={[styles.no_sessions_btn]}>
              <Text style={[{fontSize: 14, color: colors.black}]}>
                Scan QR Code
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          <>
            {activeSessions?.map((session, i) => {
              const {name, icons, url, description} = session?.peer?.metadata;
              return (
                <Session
                  key={i}
                  session={{
                    name,
                    desc: description,
                    topic: session.topic,
                    icon: {uri: icons[0]},
                    url: isValidUrl(url) ? new URL(url).hostname : url,
                  }}
                />
              );
            })}

            <View style={{width: '100%', paddingHorizontal: 18, marginTop: 20}}>
              <FullBtn
                onPress={() => {
                  navigation.navigate('scanQR');
                }}
                style={{
                  marginTop: 20,
                  paddingVertical: 12,
                  backgroundColor: colors.accent2,
                }}>
                <Text style={{color: colors.white}}>
                  Scan QR Code to connect new session
                </Text>
              </FullBtn>
            </View>
          </>
        )}
      </ScrollView>
    </Container>
  );
};

export default ActiveSessions;

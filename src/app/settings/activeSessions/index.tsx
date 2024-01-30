import {styles} from './styles';
import Session from './session';
import {colors} from 'utils/Theming';
import {Container} from 'components/_ui/custom';
import BackBtn from 'components/_common/backBtn';
import {useNavigation} from '@react-navigation/native';
import {Header, RgText, Text} from 'components/_ui/typography';
import {ScrollView, TouchableOpacity, View} from 'react-native';

const ActiveSessions = () => {
  const navigation = useNavigation();

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

      {true ? (
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
        <ScrollView contentContainerStyle={[styles.settings]}>
          {[1, 2, 3]?.map((session, i) => {
            return (
              <Session
                key={i}
                session={{
                  name: 'Abstract',
                  url: 'abstract.technology',
                  desc: 'Web3 super wallet ✨',
                  icon: require('assets/images/grads/1.png'),
                }}
              />
            );
          })}
        </ScrollView>
      )}
    </Container>
  );
};

export default ActiveSessions;

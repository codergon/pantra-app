import {StyleSheet, View} from 'react-native';
import {Text} from 'components/_ui/typography';
import {SettingsStackScreenProps} from 'typings/navigation';

const ActiveSessions = ({navigation}: SettingsStackScreenProps<'sessions'>) => {
  return (
    <View>
      <Text>ActiveSessions</Text>
    </View>
  );
};

export default ActiveSessions;

const styles = StyleSheet.create({});

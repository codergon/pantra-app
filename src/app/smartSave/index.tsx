import {styles} from './styles';
import {useState} from 'react';
import {padding} from 'helpers/styles';
import {FlatList, View} from 'react-native';
import {ArrowUp} from 'phosphor-react-native';
import {Container} from 'components/_ui/custom';
import Searchbar from 'components/_common/Searchbar';
import {RgText, Text} from 'components/_ui/typography';

const SmartSave = () => {
  const [search, setSearch] = useState('');

  return (
    <Container paddingTop={0} style={[styles.container]}>
      <View
        style={[
          {
            gap: 4,
            flexDirection: 'row',
            alignItems: 'center',
            ...padding(14, 16, 10),
            justifyContent: 'space-between',
          },
        ]}>
        <Searchbar value={search} onFocus={() => {}} onChangeText={setSearch} />
      </View>

      <View style={[styles.content]}>
        <View style={{marginBottom: 10}}>
          {/* <RgText style={{fontSize: 24, color: '#999'}}>Transactions</RgText> */}
        </View>
      </View>
    </Container>
  );
};

export default SmartSave;

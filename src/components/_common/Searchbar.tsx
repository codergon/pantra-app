import {colors} from 'utils/Theming';
import {padding} from 'helpers/styles';
import {Pressable} from '../_ui/themed';
import {X} from 'phosphor-react-native';
import {InputRg} from '../_ui/typography';
import {Search} from 'lucide-react-native';
import {View, StyleSheet} from 'react-native';

type SearchbarProps = {
  value: string;
  placeholder?: string;
  onFocus?: () => void;
  onChangeText: (text: string) => void;
};

const Searchbar = ({
  value,
  onFocus,
  placeholder,
  onChangeText,
}: SearchbarProps) => {
  return (
    <View
      style={[
        styles.searchbar,
        {
          borderWidth: 1,
          borderColor: colors.border3,
        },
      ]}>
      <View style={styles.searchbar__icon__cover}>
        <Search size={16} color={'#999'} style={styles.searchbar__icon} />
      </View>

      <InputRg
        value={value}
        onFocus={onFocus}
        color={'#fff'}
        returnKeyType="search"
        returnKeyLabel="Search"
        onChangeText={onChangeText}
        placeholderTextColor={'#999'}
        style={styles.searchbar__input}
        placeholder={placeholder ?? 'Search for something...'}
      />

      {value && (
        <Pressable
          onPress={_ => {
            onChangeText('');
          }}
          style={{
            ...styles.close__icon__cover,
            backgroundColor: '#333',
          }}>
          <X size={13} weight="bold" color={'#ddd'} />
        </Pressable>
      )}
    </View>
  );
};

export default Searchbar;

const styles = StyleSheet.create({
  searchbar: {
    flex: 1,
    borderRadius: 16,
    ...padding(4, 14),
    overflow: 'hidden',
    alignItems: 'center',
    flexDirection: 'row',
  },
  searchbar__icon__cover: {
    marginRight: 10,
    backgroundColor: 'transparent',
  },
  close__icon__cover: {
    width: 22,
    marginLeft: 10,
    marginRight: 0,
    aspectRatio: 1,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchbar__icon: {
    width: 19,
    height: 19,
  },
  searchbar__input: {
    flex: 1,
    height: 34,
    fontSize: 15,
  },
});

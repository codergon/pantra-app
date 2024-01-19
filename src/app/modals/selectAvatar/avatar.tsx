import {styles} from './styles';
import Image from 'react-native-fast-image';
import {colors} from 'utils/Theming';
import {TouchableOpacity} from 'react-native';

interface AvatarProps {
  item: string;
  index: number;
  isSelected: boolean;
  setSelectedAvatar: (avatar: number) => void;
}

const Avatar = ({item, index, isSelected, setSelectedAvatar}: AvatarProps) => {
  return (
    <>
      <TouchableOpacity
        onPress={() => setSelectedAvatar(index)}
        style={[
          styles.avatar,
          {
            padding: 2,
            borderColor: '#419B45',
            backgroundColor: colors.accent,
            borderWidth: isSelected ? 2 : 0,
          },
        ]}>
        <Image source={{uri: item}} style={styles.avatarImage} />
      </TouchableOpacity>
    </>
  );
};

export default Avatar;

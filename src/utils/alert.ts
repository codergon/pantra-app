import { Alert } from "react-native";

const alertComponent = (
  title: string,
  mess: string,
  btnTxt: string,
  btnFunc: () => void
) => {
  return Alert.alert(title, mess, [
    {
      text: btnTxt,
      onPress: btnFunc,
    },
  ]);
};

export default alertComponent;

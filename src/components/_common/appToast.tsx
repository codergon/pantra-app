import Toast, {
  BaseToast,
  ErrorToast,
  BaseToastProps,
} from "react-native-toast-message";
import Layout from "constants/layout";
import { colors } from "constants/appColors";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const AppToast = () => {
  const insets = useSafeAreaInsets();

  const fontSize = 15;
  const fontSizeSub = 13;

  return (
    <Toast
      visibilityTime={2000}
      topOffset={insets.top + 10}
      config={{
        success: (props: BaseToastProps) => (
          <BaseToast
            {...props}
            style={{
              height: "auto",
              borderWidth: 1,
              paddingLeft: 0,
              borderRadius: 10,
              paddingVertical: 0,
              borderColor: colors.toastBorder,
              borderLeftColor: "#419B45",
              width: Layout.width - 32,
              backgroundColor: colors.toastBackground,
            }}
            renderLeadingIcon={() => null}
            contentContainerStyle={{
              gap: 2,
              minHeight: 50,
              paddingVertical: 8,
              paddingHorizontal: 14,
            }}
            text1Style={{
              fontSize,
              color: colors.toastText,
              fontFamily: "DMSans-Medium",
            }}
            text2Props={{
              numberOfLines: 2,
            }}
            text2Style={{
              lineHeight: 18,
              fontSize: fontSizeSub,
              color: colors.toastText2,
              fontFamily: "DMSans-Regular",
            }}
          />
        ),

        warning: (props: BaseToastProps) => (
          <BaseToast
            {...props}
            style={{
              height: "auto",
              borderWidth: 1,
              paddingLeft: 0,
              borderRadius: 10,
              paddingVertical: 0,
              borderColor: colors.toastBorder,
              borderLeftColor: "#efc475",
              width: Layout.width - 32,
              backgroundColor: colors.toastBackground,
            }}
            renderLeadingIcon={() => null}
            contentContainerStyle={{
              gap: 2,
              minHeight: 50,
              paddingVertical: 8,
              paddingHorizontal: 14,
            }}
            text1Style={{
              fontSize,
              color: colors.toastText,
              fontFamily: "DMSans-Medium",
            }}
            text2Props={{
              numberOfLines: 2,
            }}
            text2Style={{
              lineHeight: 18,
              fontSize: fontSizeSub,
              color: colors.toastText2,
              fontFamily: "DMSans-Regular",
            }}
          />
        ),

        error: (props: BaseToastProps) => (
          <ErrorToast
            {...props}
            style={{
              height: "auto",
              borderWidth: 1,
              paddingLeft: 0,
              borderRadius: 10,
              paddingVertical: 0,
              borderColor: colors.toastBorder,
              borderLeftColor: "#ff2121",
              width: Layout.width - 32,
              backgroundColor: colors.toastBackground,
            }}
            renderLeadingIcon={() => null}
            contentContainerStyle={{
              gap: 2,
              minHeight: 50,
              paddingVertical: 8,
              paddingHorizontal: 14,
            }}
            text1Style={{
              fontSize,
              color: colors.toastText,
              fontFamily: "DMSans-Medium",
            }}
            text2Props={{
              numberOfLines: 2,
            }}
            text2Style={{
              lineHeight: 18,
              fontSize: fontSizeSub,
              color: colors.toastText2,
              fontFamily: "DMSans-Regular",
            }}
          />
        ),
      }}
    />
  );
};

export default AppToast;

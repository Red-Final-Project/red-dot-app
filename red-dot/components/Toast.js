import {
  Text,
  View,
  ImageBackground,
  TextInput,
  Image,
  Alert,
  ScrollView,
  ToastAndroid,
} from 'react-native';

export default ({ visible, message }) => {
  if (visible) {
    ToastAndroid.showWithGravityAndOffset(
      message,
      ToastAndroid.SHORT,
      ToastAndroid.BOTTOM,
      25,
      50
    );
    return null;
  }
  return null;
};

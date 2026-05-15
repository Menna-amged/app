import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/HomeScreen";
import AuthLoginForm from "../components/auth/AuthLoginForm";
import CameraScreen from "../screens/CameraScreen";
import DoctorScreen from "../screens/DoctorScreen";
import HistoryScreen from "../screens/HistoryScreen";
import ProfileScreen from "../screens/ProfileScreen";
import EditProfile from "../screens/EditProfile";
import ChangepasswordSettingScreen from "../screens/ChangepasswordSettingScreen";
import ChangeLocationScreen from "../screens/ChangeLocationScreen";
import TermsAndConditionsScreen from "../screens/TermsAndConditionsScreen";
import PrivacyPolicyScreen from "../screens/Privacypolicyscreen";
import HelpAndSupportScreen from "../screens/Helpandsupportscreen";
import MoreScreen from "../screens/MoreScreen";
import FeedbackScreen from "../screens/FeedbackScreen";
import AboutScreen from "../screens/AboutScreen";
import ChatbotScreen from "../screens/ChatbotScreen";
import PredictionScreen from "../screens/PredictionScreen";
import ConsultationSentScreen from "../screens/Consultationsentscreen";
import BuyTokensScreen from "../screens/BuyTokensScreen";

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Camera" component={CameraScreen} />
      <Stack.Screen name="Doctor" component={DoctorScreen} />
      <Stack.Screen name="History" component={HistoryScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="EditProfile" component={EditProfile} />
      <Stack.Screen name="ChangePassword" component={ChangepasswordSettingScreen} />
      <Stack.Screen name="Location" component={ChangeLocationScreen} />
      <Stack.Screen name="Terms" component={TermsAndConditionsScreen} />
      <Stack.Screen name="Privacy" component={PrivacyPolicyScreen} />
      <Stack.Screen name="HelpSupport" component={HelpAndSupportScreen} />
      <Stack.Screen name="More" component={MoreScreen} />
      <Stack.Screen name="Feedback" component={FeedbackScreen} />
      <Stack.Screen name="About" component={AboutScreen} />
      <Stack.Screen name="Chatbot" component={ChatbotScreen} />
      <Stack.Screen name="Prediction" component={PredictionScreen} />
      <Stack.Screen name="ConsultationSent" component={ConsultationSentScreen} />
<Stack.Screen name="BuyTokens" component={BuyTokensScreen} />
      <Stack.Screen name="Login" component={AuthLoginForm} />
    </Stack.Navigator>
  );
}
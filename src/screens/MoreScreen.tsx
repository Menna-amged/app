import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  Image,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import colors from "../config/colors";

const supportItems = [
  {
    label: "Helps & Support",
    route: "HelpSupport",
    icon: <Ionicons name="help-circle" size={22} color={colors.main} />,
  },
  {
    label: "Feedback",
    route: "Feedback",
    icon: <Ionicons name="chatbox" size={22} color={colors.main} />,
  },
  {
    label: "Privacy Policy",
    route: "Privacy",
    icon: <MaterialCommunityIcons name="shield-lock" size={22} color={colors.main} />,
  },
];

const settingsItems = [
  {
    label: "Notifications",
    route: null,
    icon: <Ionicons name="notifications" size={22} color={colors.main} />,
  },
  {
    label: "About",
    route: "About",
    icon: <Ionicons name="information-circle" size={22} color={colors.main} />,
  },
];

function MenuGroup({
  items,
  navigation,
}: {
  items: { label: string; route: string | null; icon: React.ReactElement }[];
  navigation: any;
}) {
  return (
    <View style={styles.group}>
      {items.map((item, index) => (
        <View key={item.label}>
          <TouchableOpacity
            style={styles.row}
            activeOpacity={0.7}
            onPress={() => item.route && navigation.navigate(item.route)}
          >
            <View style={styles.rowLeft}>
              {item.icon}
              <Text style={styles.rowLabel}>{item.label}</Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color="#9CA3AF" />
          </TouchableOpacity>
          {index < items.length - 1 && <View style={styles.divider} />}
        </View>
      ))}
    </View>
  );
}

export default function MoreScreen({ navigation }: any) {
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [photo, setPhoto] = useState<string | null>(null);

  useFocusEffect(
    useCallback(() => {
      AsyncStorage.getItem("user_profile").then((data) => {
        if (data) {
          const profile = JSON.parse(data);
          setName(profile.name ?? "");
          setLastName(profile.lastName ?? "");
          setEmail(profile.email ?? "");
          setPhoto(profile.photo ?? null);
        }
      });
    }, [])
  );

  const handleLogout = () => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      { text: "Cancel", style: "cancel" },
      { text: "Logout", style: "destructive", onPress: () => navigation.replace("Login") },
    ]);
  };

  const displayName = [name, lastName].filter(Boolean).join(" ") || "Your Name";

  return (
    <SafeAreaView style={styles.screen}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={24} color="#111" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>More</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Profile Card */}
        <TouchableOpacity
          style={styles.profileCard}
          activeOpacity={0.8}
          onPress={() => navigation.navigate("EditProfile")}
        >
          {photo ? (
            <Image source={{ uri: photo }} style={styles.avatar} />
          ) : (
            <View style={styles.avatarPlaceholder}>
              <Ionicons name="person" size={32} color="#D1D5DB" />
            </View>
          )}
          <View style={styles.profileText}>
            <Text style={styles.profileName}>{displayName}</Text>
            <Text style={styles.profileEmail} numberOfLines={1}>
              {email || "your@email.com"}
            </Text>
          </View>
          <Ionicons name="pencil" size={20} color="#9CA3AF" />
        </TouchableOpacity>

        {/* Support Section */}
        <Text style={styles.sectionLabel}>SUPPORT</Text>
        <MenuGroup items={supportItems} navigation={navigation} />

        {/* Settings Section */}
        <Text style={styles.sectionLabel}>SETTINGS</Text>
        <MenuGroup items={settingsItems} navigation={navigation} />

        {/* Logout */}
        <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout} activeOpacity={0.8}>
          <MaterialCommunityIcons name="logout" size={20} color={colors.red} />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#fff",
    
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#111",
  },
  content: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 40,
  },
  profileCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F9FAFB",
    borderRadius: 14,
    padding: 14,
    marginBottom: 24,
    gap: 12,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  avatar: {
    width: 54,
    height: 54,
    borderRadius: 27,
  },
  avatarPlaceholder: {
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: "#E5E7EB",
    justifyContent: "center",
    alignItems: "center",
  },
  profileText: {
    flex: 1,
  },
  profileName: {
    fontSize: 16,
    fontWeight: "700",
    color: "#111",
  },
  profileEmail: {
    fontSize: 13,
    color: "#9CA3AF",
    marginTop: 2,
  },
  sectionLabel: {
    fontSize: 11,
    fontWeight: "600",
    color: "#9CA3AF",
    letterSpacing: 0.8,
    marginBottom: 8,
    marginTop: 4,
  },
  group: {
    backgroundColor: "#F9FAFB",
    borderRadius: 14,
    paddingHorizontal: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 16,
  },
  rowLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
  },
  rowLabel: {
    fontSize: 15,
    fontWeight: "500",
    color: "#111",
  },
  divider: {
    height: 1,
    backgroundColor: "#E5E7EB",
  },
  logoutBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    backgroundColor: "#F9FAFB",
    borderRadius: 14,
    paddingVertical: 18,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    marginTop: 4,
  },
  logoutText: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.red,
  },
});

import { View, Text, StyleSheet, TouchableOpacity, ScrollView, StatusBar, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import NavBar from "../components/NavBar";
import { useState, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const accountSettings = [
  { id: 1, label: "Edit Profile", icon: <MaterialCommunityIcons name="account-edit-outline" size={22} color="#2563EB" /> },
  { id: 2, label: "Change Password", icon: <MaterialCommunityIcons name="sync" size={22} color="#2563EB" /> },
  { id: 3, label: "Location", icon: <Ionicons name="location-outline" size={22} color="#2563EB" /> },
];

const legalSupport = [
  { id: 1, label: "Terms & Conditions", icon: <MaterialCommunityIcons name="file-document-outline" size={22} color="#2563EB" /> },
  { id: 2, label: "Privacy Policy", icon: <MaterialCommunityIcons name="shield-lock-outline" size={22} color="#2563EB" /> },
  { id: 3, label: "Helps & Support", icon: <MaterialCommunityIcons name="help-circle-outline" size={22} color="#2563EB" /> },
];

function SettingsGroup({ items, navigation }: { items: typeof accountSettings; navigation?: any }) {
  const destinations: Record<string, string> = {
    "Edit Profile": "EditProfile",
    "Change Password": "ChangePassword",
    "Location": "Location",
    "Terms & Conditions": "Terms",
    "Privacy Policy": "Privacy",
    "Helps & Support": "HelpSupport",
  };

  return (
    <View style={styles.group}>
      {items.map((item, index) => (
        <View key={item.id}>
          <TouchableOpacity
            style={styles.row}
            onPress={() => destinations[item.label] && navigation?.navigate(destinations[item.label])}
          >
            <View style={styles.rowLeft}>
              {item.icon}
              <Text style={styles.rowLabel}>{item.label}</Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color="#9CA3AF" />
          </TouchableOpacity>
          {index < items.length - 1 && <View style={styles.rowDivider} />}
        </View>
      ))}
    </View>
  );
}

export default function ProfileScreen({ navigation }: any) {
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [photo, setPhoto] = useState<string | null>(null);

  useFocusEffect(
    useCallback(() => {
      AsyncStorage.getItem("user_profile").then((data) => {
        if (data) {
          const profile = JSON.parse(data);
          setName(profile.name ?? "");
          setLastName(profile.lastName ?? "");
          setPhoto(profile.photo ?? null);
        }
      });
    }, [])
  );

  return (
    <SafeAreaView style={styles.screen}>
      <StatusBar barStyle="dark-content" backgroundColor="#F3F4F6" />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={24} color="#111" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Profile</Text>
        <TouchableOpacity>
          <Ionicons name="ellipsis-vertical" size={22} color="#111" />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.avatarContainer}>
          {photo ? (
            <Image source={{ uri: photo }} style={styles.avatarImage} />
          ) : (
            <View style={styles.avatar}>
              <Ionicons name="person" size={60} color="#D1D5DB" />
            </View>
          )}
          {(name || lastName) ? (
            <Text style={styles.profileName}>{name} {lastName}</Text>
          ) : null}
        </View>
        <Text style={styles.sectionLabel}>ACCOUNT SETTING</Text>
        <SettingsGroup items={accountSettings} navigation={navigation} />
        <Text style={styles.sectionLabel}>LEGAL & SUPPORT</Text>
        <SettingsGroup items={legalSupport} navigation={navigation} />
        <View style={{ height: 20 }} />
      </ScrollView>

      <NavBar navigation={navigation} activeTab="Profile" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: "#F3F4F6", paddingTop: StatusBar.currentHeight ?? 0 },
  header: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 16, paddingVertical: 12 },
  headerTitle: { fontSize: 18, fontWeight: "700", color: "#111" },
  content: { paddingHorizontal: 16, paddingTop: 10 },
  avatarContainer: { alignItems: "center", marginBottom: 28 },
  avatar: { width: 100, height: 100, borderRadius: 50, backgroundColor: "#E5E7EB", justifyContent: "center", alignItems: "center" },
  avatarImage: { width: 100, height: 100, borderRadius: 50 },
  profileName: { marginTop: 10, fontSize: 16, fontWeight: "600", color: "#111" },
  sectionLabel: { fontSize: 12, fontWeight: "600", color: "#9CA3AF", letterSpacing: 0.8, marginBottom: 8, marginTop: 4 },
  group: { backgroundColor: "#fff", borderRadius: 16, paddingHorizontal: 16, marginBottom: 20, shadowColor: "#000", shadowOpacity: 0.04, shadowRadius: 6, elevation: 1 },
  row: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingVertical: 16 },
  rowLeft: { flexDirection: "row", alignItems: "center", gap: 14 },
  rowLabel: { fontSize: 15, fontWeight: "500", color: "#111" },
  rowDivider: { height: 1, backgroundColor: "#F3F4F6" },
});

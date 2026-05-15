import { View, Text, StyleSheet, TouchableOpacity, ScrollView, StatusBar, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import NavBar from "../components/NavBar";
import { useState, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import colors from "../config/colors";

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

// ── Wallet Card ───────────────────────────────────────────────
function WalletCard({ tokens, navigation }: { tokens: number; navigation?: any }) {
  return (
    <View style={styles.walletCard}>
      <View style={styles.walletLeft}>
        <View style={styles.walletIconCircle}>
          <MaterialCommunityIcons name="wallet-outline" size={20} color="#2563EB" />
        </View>
        <View>
          <Text style={styles.walletLabel}>My tokens</Text>
          <Text style={styles.walletValue}>{tokens} tokens</Text>
        </View>
      </View>
      <TouchableOpacity
        style={styles.buyBtn}
        activeOpacity={0.8}
        onPress={() => navigation?.navigate("BuyTokens")}
      >
        <Text style={styles.buyBtnText}>Buy tokens</Text>
      </TouchableOpacity>
    </View>
  );
}

export default function ProfileScreen({ navigation }: any) {
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [photo, setPhoto] = useState<string | null>(null);
  const [tokens, setTokens] = useState(0);

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
      AsyncStorage.getItem("user_tokens").then((val) => {
        setTokens(val ? parseInt(val) : 5);
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

        {/* ─── Avatar ─── */}
        <View style={styles.avatarContainer}>
          {photo && photo.length > 0 ? (
            <Image
              source={{ uri: photo }}
              style={styles.avatarImage}
              onError={() => setPhoto(null)}
            />
          ) : (
            <View style={styles.avatarDefault}>
              <MaterialCommunityIcons name="account" size={70} color="#fff" />
            </View>
          )}
          {(name || lastName) ? (
            <Text style={styles.profileName}>{name} {lastName}</Text>
          ) : null}
        </View>

        {/* ─── Account Setting ─── */}
        <Text style={styles.sectionLabel}>ACCOUNT SETTING</Text>
        <SettingsGroup items={accountSettings} navigation={navigation} />

        {/* ─── My Wallet ─── */}
        <Text style={styles.sectionLabel}>MY WALLET</Text>
        <WalletCard tokens={tokens} navigation={navigation} />

        {/* ─── Legal & Support ─── */}
        <Text style={styles.sectionLabel}>LEGAL & SUPPORT</Text>
        <SettingsGroup items={legalSupport} navigation={navigation} />

        <View style={{ height: 20 }} />
      </ScrollView>

      <NavBar navigation={navigation} activeTab="Profile" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: "#fff", paddingTop: StatusBar.currentHeight ?? 0 },
  header: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 16, paddingVertical: 12 },
  headerTitle: { fontSize: 18, fontWeight: "700", color: "#111" },
  content: { paddingHorizontal: 16, paddingTop: 10 },
  avatarContainer: { alignItems: "center", marginBottom: 28 },
  avatar: { width: 100, height: 100, borderRadius: 50, backgroundColor: colors.gray, justifyContent: "center", alignItems: "center" },
  avatarDefault: { width: 100, height: 100, borderRadius: 50, backgroundColor: colors.gray, justifyContent: "center", alignItems: "center", overflow: "hidden" },
  avatarImage: { width: 100, height: 100, borderRadius: 50 },
  profileName: { marginTop: 10, fontSize: 16, fontWeight: "600", color: "#111" },
  sectionLabel: { fontSize: 12, fontWeight: "600", color: "#9CA3AF", letterSpacing: 0.8, marginBottom: 8, marginTop: 4 },
  group: { backgroundColor: "#fff", borderRadius: 16, paddingHorizontal: 16, marginBottom: 20, shadowColor: "#000", shadowOpacity: 0.04, shadowRadius: 6, elevation: 1 },
  row: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingVertical: 16 },
  rowLeft: { flexDirection: "row", alignItems: "center", gap: 14 },
  rowLabel: { fontSize: 15, fontWeight: "500", color: "#111" },
  rowDivider: { height: 1, backgroundColor: "#F3F4F6" },

  // ── wallet ──
  walletCard: { backgroundColor: "#fff", borderRadius: 16, paddingHorizontal: 16, paddingVertical: 14, marginBottom: 20, flexDirection: "row", alignItems: "center", justifyContent: "space-between", shadowColor: "#000", shadowOpacity: 0.04, shadowRadius: 6, elevation: 1 },
  walletLeft: { flexDirection: "row", alignItems: "center", gap: 12 },
  walletIconCircle: { width: 40, height: 40, borderRadius: 20, backgroundColor: "#EFF6FF", alignItems: "center", justifyContent: "center" },
  walletLabel: { fontSize: 12, color: "#9CA3AF", marginBottom: 2 },
  walletValue: { fontSize: 16, fontWeight: "700", color: "#111" },
  buyBtn: { backgroundColor: "#2563EB", paddingHorizontal: 18, paddingVertical: 9, borderRadius: 20 },
  buyBtnText: { color: "#fff", fontSize: 13, fontWeight: "600" },
});
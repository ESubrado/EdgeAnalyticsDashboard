import { Link } from "expo-router";
import { Pressable, ScrollView, StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function AboutTheDeveloper() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.content}
        contentInsetAdjustmentBehavior="automatic"
        style={styles.page}
      >
        <Text style={styles.title}>About the Developer</Text>
        <Text style={styles.description}>
          The mobile developer profile will be implemented on this route.
        </Text>
        <Link href="/" asChild>
          <Pressable style={styles.button}>
            <Text style={styles.buttonLabel}>Home</Text>
          </Pressable>
        </Link>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f9fafb",
  },
  page: {
    flex: 1,
    backgroundColor: "#f9fafb",
  },
  content: {
    alignItems: "center",
    gap: 12,
    padding: 24,
  },
  title: {
    color: "#1c1917",
    fontSize: 28,
    fontWeight: "700",
  },
  description: {
    color: "#57534e",
    fontSize: 16,
    textAlign: "center",
  },
  button: {
    backgroundColor: "#f5f5f4",
    borderColor: "#d6d3d1",
    borderRadius: 4,
    borderWidth: 1,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  buttonLabel: {
    color: "#1c1917",
    fontSize: 14,
  },
});

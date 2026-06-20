import { Link } from "expo-router";
import { SymbolView } from "expo-symbols";
import {
  Pressable,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";

type TopBarProps = {
  activateCreate?: boolean;
  showCreateBtn?: boolean;
  showHomeBtn?: boolean;
  onCreatePress?: () => void;
};

type TopBarButtonProps = {
  icon: {
    ios: "house" | "plus.circle" | "person.crop.circle";
    android: "home" | "add_circle" | "account_circle";
    web: "home" | "add_circle" | "account_circle";
  };
  label: string;
  disabled?: boolean;
  onPress?: () => void;
};

const formattedDate = new Intl.DateTimeFormat("en-US", {
  month: "long",
  day: "2-digit",
  year: "numeric",
}).format(new Date());

function TopBarButton({
  icon,
  label,
  disabled = false,
  onPress,
}: TopBarButtonProps) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ disabled }}
      disabled={disabled}
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        pressed && styles.buttonPressed,
        disabled && styles.buttonDisabled,
      ]}
    >
      <SymbolView
        name={icon}
        size={18}
        tintColor="#1c1917"
        style={styles.buttonIcon}
      />
      <Text style={styles.buttonLabel}>{label}</Text>
    </Pressable>
  );
}

export default function TopBar({
  activateCreate = false,
  showCreateBtn = false,
  showHomeBtn = true,
  onCreatePress,
}: TopBarProps) {
  const { width } = useWindowDimensions();
  const isWide = width >= 768;

  return (
    <View style={styles.container}>
      <View style={[styles.content, isWide && styles.contentWide]}>
        <View style={[styles.heading, isWide && styles.headingWide]}>
          <View style={[styles.titleRow, isWide && styles.titleRowWide]}>
            <Text style={[styles.title, isWide && styles.titleWide]}>
              Real-Time Event Analytics Dashboard
            </Text>
            <Text style={styles.author}>by: Eugene Subrado Jr</Text>
          </View>
          <Text style={styles.date}>Today is {formattedDate}</Text>
        </View>

        <View style={[styles.actions, isWide && styles.actionsWide]}>
          {showHomeBtn && (
            <Link href="/" asChild>
              <TopBarButton
                icon={{ ios: "house", android: "home", web: "home" }}
                label="Home"
              />
            </Link>
          )}

          {showCreateBtn && (
            <TopBarButton
              icon={{
                ios: "plus.circle",
                android: "add_circle",
                web: "add_circle",
              }}
              label="Add New Event"
              disabled={activateCreate || !onCreatePress}
              onPress={onCreatePress}
            />
          )}

          <Link href="/about-the-developer" asChild>
            <TopBarButton
              icon={{
                ios: "person.crop.circle",
                android: "account_circle",
                web: "account_circle",
              }}
              label="About the Developer"
            />
          </Link>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 8,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#d6d3d1",
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  content: {
    alignItems: "center",
    padding: 8,
  },
  contentWide: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 2,
    paddingVertical: 2,
  },
  heading: {
    alignItems: "center",
  },
  headingWide: {
    alignItems: "flex-start",
    flexShrink: 1,
  },
  titleRow: {
    alignItems: "center",
  },
  titleRowWide: {
    alignItems: "flex-end",
    flexDirection: "row",
    flexWrap: "wrap",
  },
  title: {
    color: "#1c1917",
    fontSize: 24,
    fontWeight: "700",
    textAlign: "center",
  },
  titleWide: {
    fontSize: 36,
    textAlign: "left",
  },
  author: {
    color: "#78716c",
    fontSize: 14,
    paddingHorizontal: 8,
    paddingTop: 4,
  },
  date: {
    color: "#78716c",
    fontSize: 14,
    marginTop: 4,
  },
  actions: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    justifyContent: "center",
    paddingTop: 12,
  },
  actionsWide: {
    flexShrink: 0,
    justifyContent: "flex-end",
    paddingLeft: 12,
  },
  button: {
    alignItems: "center",
    backgroundColor: "#f5f5f4",
    borderColor: "#d6d3d1",
    borderRadius: 4,
    borderWidth: 1,
    flexDirection: "row",
    gap: 8,
    minHeight: 36,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  buttonPressed: {
    backgroundColor: "#3b82f6",
  },
  buttonDisabled: {
    opacity: 0.45,
  },
  buttonIcon: {
    height: 18,
    width: 18,
  },
  buttonLabel: {
    color: "#1c1917",
    fontSize: 14,
  },
});

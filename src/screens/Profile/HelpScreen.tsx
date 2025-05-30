import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Typography } from "../../theme/Colors";
import TopHeaderComponent from "../../components/header/TopHeaderComponent";
import { useNavigation } from "@react-navigation/native";
import { assets } from "../../../assets/images";

const HelpScreen = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <>
        <View style={styles.headerRow}>
          <Pressable onPress={() => navigation.goBack()}>
            <Image source={assets.ArrowLeft} style={styles.backIcon} />
          </Pressable>
          <Text numberOfLines={1} style={styles.headerTitle}>
            Help
          </Text>
        </View>
      </>
      <ScrollView>
        <Text style={styles.title}>🛠️ Help & Support — Snapshop</Text>
        <Text style={styles.paragraph}>
          Welcome to the Snapshop Help Center! 💬{"\n"}
          We’re here to make your shopping experience easy, secure, and
          enjoyable. Below you’ll find answers to frequently asked questions.
          Still stuck? Reach out — we’re happy to help! 🤝
        </Text>

        <Section title="🔐 1. Account Management" />
        <Question
          q="📝 How do I create an account?"
          a="👉 Tap on the Sign Up button on the login screen, enter your details, and you’re all set!"
        />
        <Question
          q="🔑 Forgot your password?"
          a="👉 Tap Forgot Password, enter your registered email, and follow the steps to reset it."
        />
        <Question
          q="👤 How do I update my profile?"
          a="👉 Go to Profile, where you can update your name, email, profile picture, and more."
        />

        <Section title="🛒 2. Shopping Features" />
        <Question
          q="➕ How to add items to the cart?"
          a="👉 Tap on a product, then hit the 'Add to Cart' button."
        />
        <Question
          q="❤️ What is the Wishlist?"
          a="👉 Tap the heart icon to save items for later. You can find them in the Wishlist tab."
        />
        <Question
          q="🛍️ How to view or edit the cart?"
          a="👉 Tap the cart icon at the top-right to review, update, or remove items."
        />

        <Section title="📦 3. Orders & Delivery" />
        <Question
          q="🧾 How do I place an order?"
          a="👉 Add items ➡️ tap Checkout ➡️ choose your address ➡️ confirm payment."
        />
        <Question
          q="🏠 How do I change my delivery address?"
          a="👉 Go to Profile > Address to add or update your delivery address."
        />
        <Question
          q="🔄 Can I cancel or return an order?"
          a="👉 Depends on the seller. Please contact support for specific help."
        />

        <Section title="💳 4. Payments" />
        <Question
          q="💸 What payment methods are available?"
          a="👉 We support Credit/Debit Cards, UPI, and many more."
        />
        <Question
          q="🔐 Is my payment information safe?"
          a="✅ Yes! All transactions are SSL-encrypted via trusted gateways."
        />

        <Section title="⚙️ 5. Technical Support" />
        <Question
          q="📱 The app isn’t working. What should I do?"
          a="🔄 Try restarting the app or checking your internet connection."
        />
        <Question
          q="❗ Trouble logging in or signing up?"
          a="✅ Make sure your credentials are correct. You can also reset your password."
        />

        <Section title="📞 6. Contact Us" />
        <Text style={styles.contact}>
          💌 Need extra help or want to report an issue? We're here for you!
        </Text>
        <Text style={styles.contact}>✉️ gsaurav641@gmail.com</Text>
        <Text style={styles.contact}>✉️ goyalsneha089@gmail.com</Text>
        <Text style={styles.contact}>☎️ +91-7376811531</Text>
        <Text style={styles.footer}>
          Thanks for using Snapshop — happy shopping! 🛍️🎉
        </Text>
      </ScrollView>
    </View>
  );
};

const Section = ({ title }) => <Text style={styles.section}>{title}</Text>;
const Question = ({ q, a }) => (
  <View style={styles.qaBlock}>
    <Text style={styles.question}>{q}</Text>
    <Text style={styles.answer}>{a}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flex: 1,
    // color: Typography.Colors.white,
    // backgroundColor: Typography.Colors.white,
  },
  HeaderStyle: {
    backgroundColor: Typography.Colors.white,
    marginBottom: 10,
    // paddingHorizontal: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 12,
    color: "#222",
  },
  paragraph: {
    fontSize: 15,
    lineHeight: 22,
    marginBottom: 20,
    color: "#444",
  },
  section: {
    fontSize: 18,
    fontWeight: "600",
    marginTop: 20,
    marginBottom: 10,
    color: "#333",
  },
  qaBlock: {
    marginBottom: 12,
  },
  question: {
    fontSize: 16,
    fontWeight: "500",
    color: "#000",
  },
  answer: {
    fontSize: 15,
    color: "#555",
    marginTop: 2,
    marginLeft: 10,
  },
  contact: {
    fontSize: 15,
    marginTop: 5,
    color: "#555",
  },
  footer: {
    fontSize: 15,
    marginTop: 15,
    fontWeight: "500",
    color: "#333",
  },
  backIcon: {
    color: Typography.Colors.primary,
    height: 28,
    width: 28,
  },
  headerRow: {
    paddingBottom: 15,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    gap: 13,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "700",
    fontFamily: Typography.font.bold,
    color: Typography.Colors.primary,
  },
});

export default HelpScreen;

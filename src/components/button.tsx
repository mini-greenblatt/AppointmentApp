import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import colors from '../theme/colors';
import spacing from '../theme/spacing';
import layout from '../theme/layout';

type ButtonProps = {
  title: string;
  onPress: () => void;
  disabled?: boolean;
  selected?: boolean;
};

export const PrimaryButton = ({
  title,
  onPress,
  disabled = false,
}: ButtonProps) => (
  <TouchableOpacity
    onPress={onPress}
    style={styles.primaryButton}
    disabled={disabled}
  >
    <Text style={styles.primaryText}>{title}</Text>
  </TouchableOpacity>
);

export const SecondaryButton = ({
  title,
  onPress,
  selected = false,
}: ButtonProps) => (
  <TouchableOpacity
    onPress={onPress}
    style={selected ? styles.selectedButton : styles.secondaryButton}
  >
    <Text
      style={selected ? styles.selectedSecondaryText : styles.secondaryText}
    >
      {title}
    </Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  primaryButton: {
    backgroundColor: colors.primary,
    borderRadius: layout.borderRadius,
    padding: spacing.sm,
  },
  primaryText: {
    color: colors.background,
    textAlign: 'center',
    fontWeight: 700,
    fontSize: 16,
  },
  secondaryButton: {
    ...layout,
    borderColor: colors.secondary,
    padding: spacing.sm,
    backgroundColor: colors.background,
  },
  selectedButton: {
    ...layout,
    padding: spacing.sm,
    backgroundColor: colors.secondary,
  },
  secondaryText: {
    color: colors.secondary,
    textAlign: 'center',
    fontSize: 16,
  },
  selectedSecondaryText: {
    color: colors.background,
  },
});

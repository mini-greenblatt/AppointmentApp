import React from 'react';
import { Text as RNText, TextProps, StyleSheet } from 'react-native';
import colors from '../theme/colors';
import typography from '../theme/typography';

export type TextVariant = 'header' | 'label' | 'value' | 'body';

interface Props extends TextProps {
  variant?: TextVariant;
  children: React.ReactNode;
}

const variantStyles = StyleSheet.create({
  header: {
    ...typography.header,
    color: colors.primary,
  },
  label: {
    ...typography.label,
    color: colors.text,
  },
  value: {
    ...typography.value,
    color: colors.secondary,
  },
  body: {
    ...typography.body,
    color: colors.text,
  },
});

export const Text = ({ variant = 'body', style, children, ...rest }: Props) => {
  return (
    <RNText style={[variantStyles[variant], style]} {...rest}>
      {children}
    </RNText>
  );
};

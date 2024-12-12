import {
  Text,
  TextProps,
  TouchableOpacity,
  TouchableOpacityProps,
  ActivityIndicator,
} from "react-native";

import { s } from "./styles";
import { colors } from "@/styles/theme";
import { IconProps as TablerIconProps } from "@tabler/icons-react-native";

type ButtonProps = TouchableOpacityProps & {
  isLoading?: boolean;
};

function Button({ children, style, isLoading = false, ...rest }: ButtonProps) {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={[s.container, style]}
      disabled={isLoading}
      {...rest}
    >
      {isLoading ? (
        <ActivityIndicator color={colors.gray[100]} size="small" />
      ) : (
        children
      )}
    </TouchableOpacity>
  );
}

function Title({ children, ...rest }: TextProps) {
  return (
    <Text style={s.title} {...rest}>
      {children}
    </Text>
  );
}

type IconProps = TablerIconProps & {
  icon: React.ComponentType<TablerIconProps>;
};

function Icon({ icon: Icon, ...rest }: IconProps) {
  return <Icon size={24} color={colors.gray[100]} {...rest} />;
}

Button.Title = Title;
Button.Icon = Icon;

export { Button };

import { useThemeColor } from '@/hooks/use-theme-color';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { SymbolWeight, SymbolViewProps } from 'expo-symbols';
import { ComponentProps } from 'react';
import { type StyleProp, type TextStyle } from 'react-native';

type IconMapping = Record<SymbolViewProps['name'], ComponentProps<typeof MaterialIcons>['name']>;
type IconSymbolName = keyof typeof MAPPING;

const MAPPING = {
  'house.fill': 'home',
  'dot.radiowaves.up.forward': 'radar',
  'character.book.closed.fill': 'menu-book',
  'gear': 'settings',
  'paperplane.fill': 'send',
  'chevron.left.forwardslash.chevron.right': 'code',
  'chevron.right': 'chevron-right',
  'line.horizontal.3': 'menu',
  'magnifyingglass': 'search',
  'text.book.closed': 'book',
  'map': 'map',
  'arrow.counterclockwise': 'refresh',
  'bell': 'notifications',
  'figure.walk.motion': 'directions-walk',
  'info.circle': 'info',
  'doc.text': 'description',
  'shield': 'security',
} as IconMapping;

export function IconSymbol({
  name,
  size = 24,
  color,
  style,
}: {
  name: IconSymbolName;
  size?: number;
  color?: string;
  style?: StyleProp<TextStyle>;
  weight?: SymbolWeight;
}) {
  const themeColor = useThemeColor({ light: color, dark: color }, 'icon');

  return <MaterialIcons color={themeColor} size={size} name={MAPPING[name]} style={style} />;
}

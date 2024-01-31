import layout from 'constants/layout';
import {InputProps, NormalText, TextInput, TextProps} from './themed';

export function LightText(props: TextProps) {
  return (
    <NormalText
      {...props}
      style={[props.style, {fontFamily: 'AcidGrotesk-Regular'}]}
    />
  );
}

export function RgText(props: TextProps) {
  return (
    <NormalText
      {...props}
      style={[props.style, {fontFamily: 'AcidGrotesk-Regular'}]}
    />
  );
}

export function Header(props: TextProps) {
  return (
    <NormalText
      {...props}
      style={[
        props.style,
        {
          fontFamily: 'AcidGrotesk-Regular',
          fontSize: Math.min(layout.width * 0.0654205607, 28),
        },
      ]}
    />
  );
}

export function Text(props: TextProps) {
  return (
    <NormalText
      {...props}
      style={[props.style, {fontFamily: 'AcidGrotesk-Medium'}]}
    />
  );
}

export function BdText(props: TextProps) {
  return (
    <NormalText
      {...props}
      style={[
        props.style,
        {fontFamily: 'AcidGrotesk-Medium', fontWeight: '900'},
      ]}
    />
  );
}

export function InputRg(props: InputProps) {
  return (
    <TextInput
      {...props}
      style={[props.style, {fontFamily: 'AcidGrotesk-Regular'}]}
    />
  );
}

export function Input(props: InputProps) {
  return (
    <TextInput
      {...props}
      style={[props.style, {fontFamily: 'AcidGrotesk-Medium'}]}
    />
  );
}

export function InputBd(props: InputProps) {
  return (
    <TextInput
      {...props}
      style={[
        props.style,
        {fontFamily: 'AcidGrotesk-Medium', fontWeight: '900'},
      ]}
    />
  );
}

import {Component, ReactNode} from 'react';
import {Svg, Circle} from 'react-native-svg';
import {Animated, Easing, ViewStyle} from 'react-native';

import Arc from './Arc';

type CircleSpinnerProps = {
  animating?: boolean;
  color?: string | string[];
  children?: ReactNode;
  direction?: 'clockwise' | 'counter-clockwise';
  duration?: number;
  hidesWhenStopped?: boolean;
  size?: number;
  spinDuration?: number;
  style?: ViewStyle;
  thickness?: number;
  strokeCap?: string;
  useNativeDriver?: boolean;
  unfilledColor?: string;
};

type CircleSpinnerState = {
  startAngle: Animated.Value;
  endAngle: Animated.Value;
  rotation: Animated.Value;
  colorIndex: number;
};

const AnimatedArc = Animated.createAnimatedComponent(Arc);

const MIN_ARC_ANGLE = 0.1;
const MAX_ARC_ANGLE = 1.5 * Math.PI;

export default class CircleSpinner extends Component<
  CircleSpinnerProps,
  CircleSpinnerState
> {
  constructor(props: CircleSpinnerProps) {
    super(props);

    this.state = {
      startAngle: new Animated.Value(-MIN_ARC_ANGLE),
      endAngle: new Animated.Value(0),
      rotation: new Animated.Value(0),
      colorIndex: 0,
    };
  }

  componentDidMount() {
    if (this.props.animating) {
      this.animate();
      this.spin();
    }
  }

  componentDidUpdate(prevProps: CircleSpinnerProps) {
    if (prevProps.animating !== this.props.animating) {
      if (this.props.animating) {
        this.animate();
        this.spin();
      } else {
        this.stopAnimations();
      }
    }
  }

  animate(iteration = 1) {
    Animated.sequence([
      Animated.timing(this.state.startAngle, {
        toValue: -MAX_ARC_ANGLE * iteration - MIN_ARC_ANGLE,
        duration: this.props.duration || 1000,
        isInteraction: false,
        easing: Easing.inOut(Easing.quad),
        useNativeDriver: !!this.props.useNativeDriver,
      }),
      Animated.timing(this.state.endAngle, {
        toValue: -MAX_ARC_ANGLE * iteration,
        duration: this.props.duration || 1000,
        isInteraction: false,
        easing: Easing.inOut(Easing.quad),
        useNativeDriver: !!this.props.useNativeDriver,
      }),
    ]).start(endState => {
      if (endState.finished) {
        if (Array.isArray(this.props.color)) {
          this.setState({
            colorIndex: iteration % this.props.color.length,
          });
        }
        this.animate(iteration + 1);
      }
    });
  }

  spin() {
    Animated.timing(this.state.rotation, {
      toValue: 1,
      duration: this.props.spinDuration || 5000,
      easing: Easing.linear,
      isInteraction: false,
      useNativeDriver: !!this.props.useNativeDriver,
    }).start(endState => {
      if (endState.finished) {
        this.state.rotation.setValue(0);
        this.spin();
      }
    });
  }

  stopAnimations() {
    this.state.startAngle.stopAnimation();
    this.state.endAngle.stopAnimation();
    this.state.rotation.stopAnimation();
  }

  render() {
    const {
      animating,
      children,
      color,
      direction,
      hidesWhenStopped,
      size,
      style,
      thickness,
      strokeCap,
      ...restProps
    } = this.props;

    if (!animating && hidesWhenStopped) {
      return null;
    }

    const radius = size! / 2 - thickness!;
    const offset = {
      top: thickness!,
      left: thickness!,
    };

    const directionFactor = direction === 'counter-clockwise' ? -1 : 1;

    return (
      <Animated.View
        {...restProps}
        style={[
          style,
          {
            backgroundColor: 'transparent',
            overflow: 'hidden',
            transform: [
              {
                rotate: this.state.rotation.interpolate({
                  inputRange: [0, 1],
                  outputRange: ['0deg', `${directionFactor * 360}deg`],
                }),
              },
            ],
          },
        ]}>
        <Svg width={size} height={size}>
          <Circle
            cx={size! / 2}
            cy={size! / 2}
            fill="transparent"
            strokeWidth={thickness}
            r={radius - thickness! / 2}
            stroke={this.props.unfilledColor || 'transparent'}
          />

          <AnimatedArc
            fill="transparent"
            direction={
              direction === 'counter-clockwise'
                ? 'clockwise'
                : 'counter-clockwise'
            }
            radius={radius}
            stroke={Array.isArray(color) ? color[this.state.colorIndex] : color}
            offset={offset}
            startAngle={this.state.startAngle}
            endAngle={this.state.endAngle}
            strokeCap={strokeCap}
            strokeWidth={thickness}
          />
        </Svg>
        {children}
      </Animated.View>
    );
  }
}

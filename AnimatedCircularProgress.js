import React, { Component } from "react";
import { PropTypes } from "prop-types";
import { Animated, AppState, Easing, View, ViewPropTypes } from "react-native";

import CircularProgress from "./CircularProgress";

const AnimatedProgress = Animated.createAnimatedComponent(CircularProgress);

export default class AnimatedCircularProgress extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fillAnimation: new Animated.Value(props.prefill || 0)
    };
  }

  componentDidMount() {
    this.animate();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.fill !== this.props.fill) {
      this.animate();
    }
  }

  reAnimate(prefill, toVal, dur, ease) {
    this.setState(
      {
        fillAnimation: new Animated.Value(prefill)
      },
      () => this.animate(toVal, dur, ease)
    );
  }

  animate(toVal, dur, ease) {
    const toValue = toVal >= 0 ? toVal : this.props.fill;
    const duration = dur || this.props.duration;
    const easing = ease || this.props.easing;

    const anim = Animated.timing(this.state.fillAnimation, {
      toValue,
      easing,
      duration
    });
    anim.start(this.props.onAnimationComplete);

    return anim;
  }

  render() {
    const { fill, prefill, ...other } = this.props;

    return <AnimatedProgress {...other} fill={this.state.fillAnimation} />;
  }
}

AnimatedCircularProgress.propTypes = {
  ...CircularProgress.propTypes,
  duration: PropTypes.number,
  easing: PropTypes.func,
  onAnimationComplete: PropTypes.func,
  style: ViewPropTypes.style,
  size: PropTypes.number.isRequired,
  fill: PropTypes.number,
  prefill: PropTypes.number,
  width: PropTypes.number.isRequired,
  beginColor: PropTypes.string,
  endColor: PropTypes.string,
  tension: PropTypes.number,
  friction: PropTypes.number
};

AnimatedCircularProgress.defaultProps = {
  duration: 500,
  easing: Easing.out(Easing.ease),
  prefill: 0
};

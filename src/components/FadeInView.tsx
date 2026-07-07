import React, { useEffect, useRef } from 'react';
import { Animated } from 'react-native';

// A reusable wrapper that automatically fades in whatever is placed inside it
const FadeInView = ({ children }: { children: React.ReactNode }) => {
  // 1. Initial value for opacity: 0
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // 2. The Animation Engine
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 300, // 300 milliseconds is the standard Android UI speed
      useNativeDriver: true, // CRITICAL: This sends the math to the phone's native hardware GPU
    }).start();
  }, [fadeAnim]);

  return (
    <Animated.View style={{ flex: 1, opacity: fadeAnim }}>
      {children}
    </Animated.View>
  );
};

export default FadeInView;
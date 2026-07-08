import React, { useEffect, useRef } from 'react';
import { Animated } from 'react-native';

const SlideUpView = ({ children }: { children: React.ReactNode }) => {
  const slideAnim = useRef(new Animated.Value(50)).current; // Start 50 pixels down
  const fadeAnim = useRef(new Animated.Value(0)).current;   // Start invisible

  useEffect(() => {
    Animated.parallel([
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 500, // Smooth half-second slide
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      })
    ]).start();
  }, [slideAnim, fadeAnim]);

  return (
    <Animated.View style={{ flex: 1, opacity: fadeAnim, transform: [{ translateY: slideAnim }] }}>
      {children}
    </Animated.View>
  );
};

export default SlideUpView;
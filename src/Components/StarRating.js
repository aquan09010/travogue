import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const StarRating = ({
  rating,
  maxStars = 5,
  onStarPress,
  starSize = 18,
  disabled = false,
}) => {
  const [currentRating, setCurrentRating] = useState(rating);

  const handleStarPress = (newRating) => {
    if (!disabled) {
      setCurrentRating(newRating);
      onStarPress && onStarPress(newRating);
    }
  };

  const createStars = () => {
    const stars = [];
    for (let i = 0; i < maxStars; i++) {
      const isFilled = currentRating >= i + 1;
      const starIconName = isFilled ? 'star' : 'star-outline';
      stars.push(
        <TouchableOpacity
          key={i}
          style={{
            width: starSize,
            height: starSize,
            opacity: disabled ? 0.5 : 1,
          }}
          disabled={disabled}
          onPress={() => handleStarPress(i + 1)}
        >
          <Icon name={starIconName} size={starSize} color="black" />
        </TouchableOpacity>
      );
    }
    return stars;
  };

  return <View style={styles.container}>{createStars()}</View>;
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export default StarRating;

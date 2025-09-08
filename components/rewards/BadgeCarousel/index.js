import { useState } from "react";
import { Dimensions, FlatList, View } from "react-native";
import BadgeCard from "../BadgeCard";
import styles from "./styles";

const { width } = Dimensions.get("window");

const chunkArray = (arr, size) => {
  const chunks = arr.reduce(
    (acc, _, i) => (i % size ? acc : [...acc, arr.slice(i, i + size)]),
    []
  );

  // pad last page with empty slots if needed
  const lastPage = chunks[chunks.length - 1];
  if (lastPage.length < size) {
    const placeholders = Array(size - lastPage.length)
      .fill(null)
      .map((_, i) => ({ id: `empty-${i}`, empty: true }));
    chunks[chunks.length - 1] = [...lastPage, ...placeholders];
  }

  return chunks;
};

const BadgeCarousel = ({ badges }) => {
  const [pageIndex, setPageIndex] = useState(0);
  const pages = chunkArray(badges, 4);

  return (
    <View>
      <FlatList
        snapToAlignment="center"
        data={pages}
        keyExtractor={(_, i) => `page-${i}`}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        snapToInterval={width}
        decelerationRate="fast"
        onMomentumScrollEnd={(e) => {
          const index = Math.round(
            e.nativeEvent.contentOffset.x /
              e.nativeEvent.layoutMeasurement.width
          );
          setPageIndex(index);
        }}
        renderItem={({ item }) => (
          <View style={[styles.page, { width }]}>
            {item.map((badge) =>
              badge.empty ? (
                <View key={badge.id} style={styles.badgeWrapper} />
              ) : (
                <View key={badge.id} style={styles.badgeWrapper}>
                  <BadgeCard {...badge} />
                </View>
              )
            )}
          </View>
        )}
      />
      {pages.length > 1 && (
        <View style={styles.dots}>
          {pages.map((_, idx) => (
            <View
              key={idx}
              style={[styles.dot, idx === pageIndex && styles.dotActive]}
            />
          ))}
        </View>
      )}
    </View>
  );
};

export default BadgeCarousel;

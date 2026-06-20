import { useMemo, useState } from "react";
import {
  ActivityIndicator,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import {
  LineChart,
  type DataSet,
  type lineDataItem,
} from "react-native-gifted-charts";

import type {
  AnalyticGraphProps,
  DateRange,
} from "@/app/index";

const tooltipDateFormatter = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "2-digit",
  year: "numeric",
  hour: "numeric",
  minute: "2-digit",
});

function formatAxisLabel(time: string, range: DateRange) {
  const date = new Date(time);

  if (range === "month") {
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
    }).format(date);
  }

  return new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "2-digit",
  }).format(date);
}

function renderWebDataPoint(item: lineDataItem) {
  return (
    <View
      style={[
        styles.webDataPoint,
        { backgroundColor: item.dataPointColor ?? "#57534e" },
      ]}
    />
  );
}

export default function AnalyticGraph({
  chartData,
  dateRange,
  dateRanges,
  error,
  eventSeries,
  loading,
  onDateRangeChange,
  onRetry,
  totalEvents,
}: AnalyticGraphProps) {
  const [chartWidth, setChartWidth] = useState(0);

  const dataSet = useMemo<DataSet[]>(() => {
    const visibleLabelEvery = Math.max(1, Math.ceil(chartData.length / 4));

    return eventSeries.map((series) => ({
      color: series.color,
      dataPointsColor: series.color,
      dataPointsHeight: 6,
      dataPointsRadius: 3,
      dataPointsWidth: 6,
      thickness: 2,
      data: chartData.map<lineDataItem>((point, index) => ({
        dataPointColor: series.color,
        value: point[series.key],
        label:
          index % visibleLabelEvery === 0 || index === chartData.length - 1
            ? formatAxisLabel(point.time, dateRange)
            : "",
      })),
    }));
  }, [chartData, dateRange, eventSeries]);

  return (
    <View style={styles.card}>
      <View style={styles.graphHeader}>
        <View style={styles.totalCard}>
          <Text style={styles.totalText}>
            Total Number of Events: {totalEvents}
          </Text>
        </View>

        <View accessibilityRole="tablist" style={styles.rangeSelector}>
          {dateRanges.map((range) => {
            const selected = dateRange === range.value;

            return (
              <Pressable
                accessibilityRole="tab"
                accessibilityState={{ selected }}
                key={range.value}
                onPress={() => onDateRangeChange(range.value)}
                style={({ pressed }) => [
                  styles.rangeButton,
                  selected && styles.rangeButtonSelected,
                  pressed && styles.rangeButtonPressed,
                ]}
              >
                <Text
                  style={[
                    styles.rangeButtonText,
                    selected && styles.rangeButtonTextSelected,
                  ]}
                >
                  {range.label}
                </Text>
              </Pressable>
            );
          })}
        </View>
      </View>

      {loading ? (
        <View style={styles.statusContainer}>
          <ActivityIndicator color="#15803d" size="large" />
          <Text style={styles.statusText}>Loading analytics...</Text>
        </View>
      ) : error ? (
        <View style={styles.statusContainer}>
          <Text accessibilityRole="alert" style={styles.errorText}>
            {error}
          </Text>
          <Pressable
            accessibilityRole="button"
            onPress={onRetry}
            style={({ pressed }) => [
              styles.retryButton,
              pressed && styles.retryButtonPressed,
            ]}
          >
            <Text style={styles.retryButtonText}>Retry</Text>
          </Pressable>
        </View>
      ) : chartData.length === 0 ? (
        <View style={styles.statusContainer}>
          <Text style={styles.statusText}>
            No events were recorded during this period.
          </Text>
        </View>
      ) : (
        <>
          <View style={styles.legend}>
            {eventSeries.map((series) => (
              <View key={series.key} style={styles.legendItem}>
                <View
                  style={[styles.legendMarker, { backgroundColor: series.color }]}
                />
                <Text style={styles.legendText}>{series.label}</Text>
              </View>
            ))}
          </View>

          <View
            accessibilityLabel={`Analytics line chart with ${chartData.length} time points`}
            accessible
            onLayout={(event) => setChartWidth(event.nativeEvent.layout.width)}
            style={styles.chartContainer}
          >
            {chartWidth > 0 && (
              <LineChart
                adjustToWidth={chartData.length <= 8}
                animateOnDataChange
                animationDuration={500}
                customDataPoint={
                  Platform.OS === "web" ? renderWebDataPoint : undefined
                }
                dataSet={dataSet}
                endSpacing={12}
                height={260}
                initialSpacing={12}
                isAnimated
                noOfSections={4}
                parentWidth={chartWidth}
                pointerConfig={{
                  activatePointersOnLongPress: true,
                  autoAdjustPointerLabelPosition: true,
                  pointerColorsForDataSet: eventSeries.map(
                    (series) => series.color,
                  ),
                  pointerLabelHeight: 168,
                  pointerLabelWidth: 190,
                  pointerStripColor: "#a8a29e",
                  pointerStripWidth: 1,
                  radius: 4,
                  pointerLabelComponent: (
                    points: lineDataItem[],
                    _secondaryPoints: lineDataItem[],
                    index: number,
                  ) => {
                    const selectedPoint = chartData[index];

                    if (!selectedPoint || !points.length) {
                      return null;
                    }

                    return (
                      <View style={styles.tooltip}>
                        <Text style={styles.tooltipDate}>
                          {tooltipDateFormatter.format(
                            new Date(selectedPoint.time),
                          )}
                        </Text>
                        {eventSeries.map((series, seriesIndex) => (
                          <View key={series.key} style={styles.tooltipRow}>
                            <View
                              style={[
                                styles.legendMarker,
                                { backgroundColor: series.color },
                              ]}
                            />
                            <Text style={styles.tooltipLabel}>
                              {series.label}
                            </Text>
                            <Text style={styles.tooltipValue}>
                              {points[seriesIndex]?.value ?? 0}
                            </Text>
                          </View>
                        ))}
                      </View>
                    );
                  },
                }}
                rulesColor="#d6d3d1"
                rulesType="dashed"
                scrollAnimation
                showScrollIndicator={false}
                spacing={42}
                width={Math.max(chartWidth - 44, 240)}
                xAxisColor="#a8a29e"
                xAxisLabelTextStyle={styles.axisText}
                yAxisColor="#a8a29e"
                yAxisLabelWidth={36}
                yAxisTextStyle={styles.axisText}
              />
            )}
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#f5f5f4",
    borderColor: "#d6d3d1",
    borderRadius: 6,
    borderWidth: 1,
    marginHorizontal: 16,
    minHeight: 390,
    padding: 16,
    paddingBottom: 24,
  },
  graphHeader: {
    alignItems: "center",
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
    justifyContent: "space-between",
    marginBottom: 16,
  },
  totalCard: {
    backgroundColor: "#ffffff",
    borderRadius: 6,
    paddingHorizontal: 14,
    paddingVertical: 10,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.12,
    shadowRadius: 2,
    elevation: 2,
  },
  totalText: {
    color: "#1c1917",
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
  },
  rangeSelector: {
    borderColor: "#15803d",
    borderRadius: 4,
    borderWidth: 1,
    flexDirection: "row",
    overflow: "hidden",
  },
  rangeButton: {
    alignItems: "center",
    backgroundColor: "#ffffff",
    borderRightColor: "#15803d",
    borderRightWidth: StyleSheet.hairlineWidth,
    justifyContent: "center",
    minHeight: 38,
    paddingHorizontal: 10,
    paddingVertical: 7,
  },
  rangeButtonSelected: {
    backgroundColor: "#15803d",
  },
  rangeButtonPressed: {
    opacity: 0.75,
  },
  rangeButtonText: {
    color: "#15803d",
    fontSize: 12,
    fontWeight: "600",
  },
  rangeButtonTextSelected: {
    color: "#ffffff",
  },
  statusContainer: {
    alignItems: "center",
    flex: 1,
    gap: 12,
    justifyContent: "center",
    minHeight: 280,
    padding: 24,
  },
  statusText: {
    color: "#57534e",
    fontSize: 15,
    textAlign: "center",
  },
  errorText: {
    color: "#b91c1c",
    fontSize: 15,
    textAlign: "center",
  },
  retryButton: {
    backgroundColor: "#15803d",
    borderRadius: 4,
    paddingHorizontal: 18,
    paddingVertical: 9,
  },
  retryButtonPressed: {
    opacity: 0.75,
  },
  retryButtonText: {
    color: "#ffffff",
    fontSize: 14,
    fontWeight: "600",
  },
  legend: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    justifyContent: "center",
    marginBottom: 10,
  },
  legendItem: {
    alignItems: "center",
    flexDirection: "row",
    gap: 5,
  },
  legendMarker: {
    borderRadius: 4,
    height: 8,
    width: 8,
  },
  legendText: {
    color: "#57534e",
    fontSize: 11,
  },
  chartContainer: {
    minHeight: 310,
    overflow: "hidden",
  },
  axisText: {
    color: "#78716c",
    fontSize: 10,
  },
  webDataPoint: {
    borderRadius: 3,
    height: 6,
    width: 6,
  },
  tooltip: {
    backgroundColor: "#ffffff",
    borderColor: "#d6d3d1",
    borderRadius: 6,
    borderWidth: 1,
    gap: 4,
    padding: 10,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 4,
  },
  tooltipDate: {
    color: "#1c1917",
    fontSize: 11,
    fontWeight: "600",
    marginBottom: 3,
  },
  tooltipRow: {
    alignItems: "center",
    flexDirection: "row",
    gap: 5,
  },
  tooltipLabel: {
    color: "#57534e",
    flex: 1,
    fontSize: 10,
  },
  tooltipValue: {
    color: "#1c1917",
    fontSize: 10,
    fontWeight: "700",
  },
});

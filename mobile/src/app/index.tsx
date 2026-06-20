import { useEffect, useState } from "react";
import { ScrollView, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import AnalyticGraph from "@/components/AnalyticGraph";
import TopBar from "@/components/TopBar";
import API_BASE_URL from "@/config/api";

export type DateRange = "hour" | "day" | "month";

export type EventKey =
  | "page_view"
  | "page_download"
  | "page_update"
  | "page_reload"
  | "page_saved"
  | "page_other";

export type AnalyticsEvent = {
  _id: string;
  eventType: string;
  userId: string;
  timestamp: string;
  metadata: Record<string, unknown>;
  createdAt?: string;
};

export type ChartDataPoint = Record<EventKey, number> & {
  time: string;
};

export type EventSeries = {
  key: EventKey;
  label: string;
  color: string;
};

export type DateRangeOption = {
  label: string;
  value: DateRange;
};

export type AnalyticGraphProps = {
  chartData: ChartDataPoint[];
  dateRange: DateRange;
  dateRanges: ReadonlyArray<DateRangeOption>;
  error: string | null;
  eventSeries: ReadonlyArray<EventSeries>;
  loading: boolean;
  onDateRangeChange: (range: DateRange) => void;
  onRetry: () => void;
  totalEvents: number;
};

const EVENT_SERIES: ReadonlyArray<EventSeries> = [
  { key: "page_view", label: "Page View", color: "#8884d8" },
  { key: "page_download", label: "Page Download", color: "#22a06b" },
  { key: "page_update", label: "Page Update", color: "#d97706" },
  { key: "page_reload", label: "Page Reload", color: "#c91e08" },
  { key: "page_saved", label: "Page Saved", color: "#71730a" },
  { key: "page_other", label: "Other Events", color: "#0088fe" },
];

const DATE_RANGES: ReadonlyArray<DateRangeOption> = [
  { label: "Last Hour", value: "hour" },
  { label: "Last Day", value: "day" },
  { label: "Last Month", value: "month" },
];

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function parseAnalyticsEvents(payload: unknown): AnalyticsEvent[] {
  if (!Array.isArray(payload)) {
    throw new Error("The analytics response was not an array.");
  }

  return payload.map((item) => {
    if (
      !isRecord(item) ||
      typeof item._id !== "string" ||
      typeof item.eventType !== "string" ||
      typeof item.userId !== "string" ||
      typeof item.timestamp !== "string"
    ) {
      throw new Error("The analytics response contained an invalid event.");
    }

    return {
      _id: item._id,
      eventType: item.eventType,
      userId: item.userId,
      timestamp: item.timestamp,
      metadata: isRecord(item.metadata) ? item.metadata : {},
      createdAt:
        typeof item.createdAt === "string" ? item.createdAt : undefined,
    };
  });
}

function getEventCount(record: Record<string, unknown>, key: EventKey) {
  const value = record[key];
  return typeof value === "number" && Number.isFinite(value) ? value : 0;
}

function parseChartData(payload: unknown): ChartDataPoint[] {
  if (!Array.isArray(payload)) {
    throw new Error("The chart response was not an array.");
  }

  return payload.flatMap((item) => {
    if (!isRecord(item)) {
      return [];
    }

    if (
      typeof item.time !== "string" ||
      Number.isNaN(new Date(item.time).getTime())
    ) {
      return [];
    }

    return [
      {
        time: item.time,
        page_view: getEventCount(item, "page_view"),
        page_download: getEventCount(item, "page_download"),
        page_update: getEventCount(item, "page_update"),
        page_reload: getEventCount(item, "page_reload"),
        page_saved: getEventCount(item, "page_saved"),
        page_other: getEventCount(item, "page_other"),
      },
    ];
  });
}

async function fetchJson(url: string, signal: AbortSignal): Promise<unknown> {
  const response = await fetch(url, { signal });

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}.`);
  }

  return response.json();
}

export default function Index() {
  const [analyticItemsData, setAnalyticItemsData] = useState<AnalyticsEvent[]>(
    [],
  );
  const [chartData, setChartData] = useState<ChartDataPoint[]>([]);
  const [dateRange, setDateRange] = useState<DateRange>("month");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    const controller = new AbortController();

    async function fetchAnalyticsData() {
      setLoading(true);
      setError(null);

      try {
        const query = new URLSearchParams({ type: dateRange }).toString();
        const [eventsPayload, chartPayload] = await Promise.all([
          fetchJson(`${API_BASE_URL}/api/analytics`, controller.signal),
          fetchJson(
            `${API_BASE_URL}/api/analytics/analyticchart?${query}`,
            controller.signal,
          ),
        ]);

        setAnalyticItemsData(parseAnalyticsEvents(eventsPayload));
        setChartData(parseChartData(chartPayload));
      } catch (caughtError) {
        if (
          caughtError instanceof Error &&
          caughtError.name === "AbortError"
        ) {
          return;
        }

        setError("Unable to load analytics data. Please try again.");
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    fetchAnalyticsData();

    return () => controller.abort();
  }, [dateRange, reloadKey]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={styles.page}
      >
        <TopBar activateCreate showCreateBtn showHomeBtn={false} />
        <AnalyticGraph
          chartData={chartData}
          dateRange={dateRange}
          dateRanges={DATE_RANGES}
          error={error}
          eventSeries={EVENT_SERIES}
          loading={loading}
          onDateRangeChange={setDateRange}
          onRetry={() => setReloadKey((current) => current + 1)}
          totalEvents={analyticItemsData.length}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f9fafb",
  },
  page: {
    flex: 1,
    backgroundColor: "#f9fafb",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
});

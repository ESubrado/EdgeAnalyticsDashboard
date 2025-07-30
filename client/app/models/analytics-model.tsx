export interface IAnalytics {
    _id: string;
    eventType: string;
    userId: string;
    timestamp: Date;
    metadata: Object;
};

export interface topTableProps {
  totalNumEvents : number;
}

export interface eventTableProps {
  loading: boolean;
  eventItems: IAnalytics[];
}

export interface EventCounterProps {
  event: string,
  count: number
}

export interface AnalyticsItemListProp {
  items: IAnalytics[]
}

export interface TopEventsItemListProp {
  topEventsItems: EventCounterProps[], 
  loading: boolean
}

export interface PieChartItemListProp {
  eventsListCount: EventCounterProps[]
}

export enum EventTypes {
    View = "page_view",
    Download = "page_download",
    Update = "page_update",   
}

// Pie Chart Enumerations

export type TooltipPayload = ReadonlyArray<any>;

export type Coordinate = {
  x: number;
  y: number;
};

export type PieSectorData = {
  percent?: number;
  name?: string | number;
  midAngle?: number;
  middleRadius?: number;
  tooltipPosition?: Coordinate;
  value?: number;
  paddingAngle?: number;
  dataKey?: string;
  payload?: any;
  tooltipPayload?: ReadonlyArray<TooltipPayload>;
};

export type GeometrySector = {
  cx: number;
  cy: number;
  innerRadius: number;
  outerRadius: number;
  startAngle: number;
  endAngle: number;
  name: string;
};

export type PieLabelProps = PieSectorData &
  GeometrySector & {
    tooltipPayload?: any;
  };

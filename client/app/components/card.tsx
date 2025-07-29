import type { IAnalytics } from "~/models/analytics-model";

export default function Card({ eventType, userId }: IAnalytics) {
  return (
    <div className="bg-white p-4 rounded-2xl shadow hover:shadow-lg transition">
      <h3 className="font-bold text-lg mb-2">{eventType}</h3>
      <p className="text-gray-700 text-sm">{userId}</p>
    </div>
  );
}


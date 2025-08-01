import { type RouteConfig, index } from "@react-router/dev/routes";

// Main route setting. Only uses the index page.
export default [index("routes/Index.tsx")] satisfies RouteConfig;

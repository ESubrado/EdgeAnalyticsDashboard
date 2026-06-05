import { type RouteConfig, index, route } from "@react-router/dev/routes";

// Main route setting.
export default [
    index("routes/Index.tsx"),
    route("about-the-developer", "routes/AboutTheDeveloper.tsx"),
] satisfies RouteConfig;

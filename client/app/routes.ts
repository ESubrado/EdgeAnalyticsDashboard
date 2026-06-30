import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
    index("routes/Portfolio.tsx"),
    route("dashboard", "routes/Index.tsx"),
    route("about-the-developer", "routes/AboutTheDeveloper.tsx"),
] satisfies RouteConfig;

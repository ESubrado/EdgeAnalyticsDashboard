import { type RouteConfig, index, route } from "@react-router/dev/routes";

// Main route setting. Only uses the index page.
export default [
    index("routes/Index.tsx"),
    route("About", "./routes/About.tsx"),
    route("Register", "./routes/Registration.tsx")

] satisfies RouteConfig;

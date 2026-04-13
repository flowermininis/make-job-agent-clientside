import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [index("routes/home.tsx"), route("jobs", "./routes/jobsrs.tsx"), route("job/:job_id", "./routes/jobl.tsx")] satisfies RouteConfig;

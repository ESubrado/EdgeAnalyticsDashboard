import type { Route } from "./+types/home";
import { Welcome } from "../welcome/welcome";
import AnalyticItemList from "./analytic-list";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Real Time Analytics Dashboard" },
    { name: "description", content: "Welcome!" },
  ];
}

export default function Home() {
  return (
    <>
      <div className="min-h-screen bg-gray-100">
      <nav className="bg-blue-600 p-4 text-white">
        <div className="container mx-auto flex justify-between">
          <h1 className="text-xl font-bold">Real Time Dashboard</h1>
          {/* <div className="space-x-4">
            <Link to="/" className="hover:underline">Home</Link>
            <Link to="/posts" className="hover:underline">Posts</Link>
          </div>           */}
        </div>
      </nav>
      <main className="p-6 container mx-auto">
        <div>
          <h2 className="text-2xl font-bold mb-4">Welcome to Home</h2>
          <p>This is a simple Tailwind + React Router v7 layout.</p>
        </div>
        <div>
             <AnalyticItemList/>
        </div>       
      </main>
    </div>
    </>
  );
}

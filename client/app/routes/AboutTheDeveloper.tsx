import { useNavigate } from "react-router";

import TopBar from "./TopBar";

const AboutTheDeveloper = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 rounded-lg shadow">
      <TopBar
        activateCreate={true}
        useNav={navigate}
        showCreateBtn={false}
        showReturnBtn={true}
      />
      <main className="px-4 py-8">
        <section className="mx-auto max-w-4xl border border-stone-300 bg-stone-100 px-6 py-8 text-center rounded">
          <h1 className="text-2xl font-bold text-stone-800">Under Construction</h1>
          <p className="mt-2 text-sm text-stone-600">
            The About the Developer page is currently under construction.
          </p>
        </section>
      </main>
    </div>
  );
};

export default AboutTheDeveloper;

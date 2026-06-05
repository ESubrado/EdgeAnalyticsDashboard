import { Link } from "react-router";
import { IoHomeOutline, IoRocketOutline } from "react-icons/io5";

type AboutDeveloperHeaderProps = {
  profile: {
    name: string;
    role: string;
    pitch: string;
    availability: string;
  };
};

const AboutDeveloperHeader = ({ profile }: AboutDeveloperHeaderProps) => (
  <header className="bg-gray-50 px-4 pt-4">
    <div className="mx-auto max-w-7xl">
      <div className="mb-1 flex justify-end">
        <Link
          to="/"
          className="flex items-center gap-2 whitespace-nowrap rounded border border-stone-300 bg-stone-100 px-3 py-1.5 text-sm transition-colors hover:bg-blue-500"
        >
          <IoHomeOutline />
          <span>Home</span>
        </Link>
      </div>
      <section className="border-b border-stone-300 pb-5">
        <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(280px,360px)] lg:items-end">
          <div>
            <span className="text-sm font-semibold uppercase tracking-normal text-emerald-700">
              About the Developer
            </span>
            <h1 className="mt-2 text-3xl font-bold text-stone-900 lg:text-4xl">
              {profile.name}
            </h1>
            <p className="mt-3 max-w-3xl text-base leading-7 text-stone-600">
              {profile.pitch}
            </p>
          </div>
          <div className="flex items-center gap-3 border border-stone-300 bg-white p-4 shadow-sm">
            <IoRocketOutline className="h-6 w-6 shrink-0 text-emerald-700" />
            <div>
              <p className="text-sm font-semibold text-stone-900">
                {profile.role}
              </p>
              <p className="text-sm text-stone-600">{profile.availability}</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  </header>
);

export default AboutDeveloperHeader;

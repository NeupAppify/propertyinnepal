import Link from "next/link";

export default function PropertyNotFound() {
  return (
    <section className="mx-auto max-w-[1440px] px-6 py-20 lg:px-8">
      <h1 className="text-3xl font-semibold text-slate-950">Property not found</h1>
      <p className="mt-4 text-slate-600">
        This listing is unavailable. Browse our properties to find another home.
      </p>
      <Link href="/properties" className="mt-6 inline-block font-semibold text-brand-deep underline">
        Browse properties
      </Link>
    </section>
  );
}

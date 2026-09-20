import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import { headers } from "next/headers";
import { SiteShell } from "@/components/site-shell";
import { getAnalyticsContext, logPageActivity } from "@/analytics";
import { navigation } from "@/lib/site";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Property in Nepal",
    template: "%s | Property in Nepal",
  },
  description:
    "Modern real estate advisory for buyers, sellers, and investors across Nepal.",
};

const footerTools = [
  { label: "EMI Calculator", href: "/tools/emi-calculator" },
  { label: "Calendar", href: "/tools/calendar" },
  { label: "Unit Converter", href: "/tools/unit-converter" },
] as const;

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { contextId, signedContextId } = await getAnalyticsContext();
  const requestHeaders = await headers();
  const pagePath = requestHeaders.get("x-invoke-path") ?? requestHeaders.get("next-url") ?? "/";
  await logPageActivity(contextId, pagePath);

  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${outfit.variable} h-full scroll-smooth antialiased`}
    >
      <body className="min-h-full bg-background font-sans text-foreground">
        <SiteShell navigation={navigation} footerTools={footerTools}>
          {children}
        </SiteShell>
        <script
          src="https://neupgroup.com/analytics/bridge/sdk.v1/tracker?collect=pageview,clicks,keyboard,forms,linkclicks,selection,geolocation"
          data-context-id={signedContextId}
          data-project-id="cmu988ag500pvuap9811hrnbk"
          data-collect="pageview,clicks,keyboard,forms,linkclicks,selection,geolocation"
          data-cookie-keys={"[]"}
          data-server-fields={JSON.stringify({})}
          defer
        />
      </body>
    </html>
  );
}

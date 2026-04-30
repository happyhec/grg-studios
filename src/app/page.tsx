import AgencyHero from "@/components/AgencyHero";
import HomeClientSections from "@/components/HomeClientSections";
import PageClientOverlays from "@/components/PageClientOverlays";

export default function Home() {
  return (
    <main className="bg-black font-inter relative">
      <PageClientOverlays />
      <AgencyHero />
      <HomeClientSections />
    </main>
  );
}




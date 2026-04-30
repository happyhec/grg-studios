import AgencyHero from "@/components/AgencyHero";
import HomeClientSections from "@/components/HomeClientSections";
import PageClientOverlays from "@/components/PageClientOverlays";
import PageMiddleSections from "@/components/PageMiddleSections";

export default function Home() {
  return (
    <main className="bg-black font-inter relative">
      <PageClientOverlays />
      <AgencyHero />
      <PageMiddleSections />
      <HomeClientSections />
    </main>
  );
}





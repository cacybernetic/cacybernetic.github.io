/**
 * @project CAC - https://github.com/cacybernetic/cacybernetic.github.io
 * @fileoverview Displays main information for the first time.
 * @author Obrymec - https://obrymec.vercel.app
 * @supported DESKTOP, MOBILE
 * @created 2025-07-23
 * @updated 2025-07-31
 * @version 0.0.6
 * @file home.tsx
 */

// Chakra dependencies.
import {Box} from "@chakra-ui/react";

// Custom dependencies.
import ExperienceQuality from "@/features/home/experience_quality.tsx";
import ProjectsBuildingSteps from "@/features/home/build_steps.tsx";
import ServicesQuality from "@/features/home/services_quality.tsx";
import ProjectQuery from "@/features/home/project_query.tsx";
import Footer from "@/common/components/footer.tsx";
import Banner from "@/features/home/banner.tsx";

// Shows importante information for the first time.
export default function Home () {
  // Builds tsx code.
  return <Box width = "full">
    {/** Banner */}
    <Banner/>
    {/** Services quality */}
    <ServicesQuality/>
    {/** Projects building steps */}
    <ProjectsBuildingSteps/>
    {/** Experience quality */}
    <ExperienceQuality/>
    {/** Project guest invitation */}
    <ProjectQuery/>
    {/** Footer */}
    <Footer/>
  </Box>;
}

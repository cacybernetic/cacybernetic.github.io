/**
 * @project CAC - https://github.com/cacybernetic/cacybernetic.github.io
 * @fileoverview Displays main information for the first time.
 * @author Obrymec - https://obrymec.vercel.app
 * @supported DESKTOP, MOBILE
 * @created 2025-07-23
 * @updated 2025-07-25
 * @version 0.0.3
 * @file home.tsx
 */

// Chakra dependencies.
import {Box} from "@chakra-ui/react";

// Custom dependencies.
import ProjectsBuildingSteps from "@/common/components/build_steps.tsx";
import ServicesQuality from "@/common/components/services_quality.tsx";
import Banner from "@/common/components/banner.tsx";

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
  </Box>;
}

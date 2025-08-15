/**
 * @project CAC - https://github.com/cacybernetic/cacybernetic.github.io
 * @fileoverview Displays company accomplishments in interactive media.
 * @author Obrymec - https://obrymec.vercel.app
 * @supported DESKTOP, MOBILE
 * @file im_products.tsx
 * @created 2025-08-12
 * @updated 2025-08-15
 * @version 0.0.2
 */

// Plugin dependencies.
import {useTranslation} from "react-i18next";

// Chakra dependencies.
import {Flex, Box} from "@chakra-ui/react";

// Custom dependencies.
import {GLOBAL_LANG} from "@/common/i18n/localization.ts";
import Section from "@/common/components/section.tsx";
import Footer from "@/common/components/footer.tsx";
import ProjectCard, {
  ProjectCardProps
} from "@/common/components/project_card.tsx";

// Displays all accomplishments made in interactive media.
export default function InteractiveMediaProducts () {
  // Attributes.
  const {t} = useTranslation<string, undefined>(GLOBAL_LANG);
  const commonProjectCardStyle: ProjectCardProps = {
    skeletonStyle: {borderTopRadius: 0},
    imageStyle: {borderTopRadius: 0},
    imageErrorTextStyle: {
      height: {base: "196px", sm: "208px", md: "216px"}
    },
    containerStyle: {
      _hover: {backgroundColor: "neutral.1"},
      backgroundColor: "transparent",
      borderRadius: 0,
      border: "none",
      width: {
        lg: "308px", xl: "296px", "2xl": "336px",
        base: "full", sm: "416px", md: "242px"
      }
    }
  };

  // Builds tsx code.
  return <Box
    paddingTop = {{base: 12, sm: 12, md: 13}}
    transition = "all .2s"
    width = "full"
  >
    {/** Developed immersive applications */}
    <Section
      containerStyle = {{backgroundImage: "var(--box-worth-hover-bg-color)"}}
      description = {t("gameDevDescription")}
      title = {t("gameDevTitle")}
      descriptionStyle = {{
        width: {base: "auto", sm: "auto", md: "auto", xl: "1024px"}
      }}
      children = {<Flex
        marginTop = {{base: 0, sm: 0, md: 1, lg: 2, xl: 3, "2xl": 4}}
        gap = {{base: 4, sm: 5, md: 6}}
        justifyContent = "center"
        transition = "all .2s"
        width = "full"
        wrap = "wrap"
      >
        {/** Military african female soldier */}
        <ProjectCard
          {...commonProjectCardStyle}
          description = {t("africanSoldierDescription")}
          title = {t("africanSoldierTitle")}
          type = {t("resource")}
          artStationLink = {
            "https://cacybernetic.artstation.com/projects/5WbAyw"
          }
          imageUrl = {
            "https://public-files.gumroad.com/1rey01gef0ouytd7ty" +
            "kf47xzjm8p"
          }
          cubeBrushLink = {
            "https://cubebrush.co/cacybernetic/products/xx5ww/" +
            "realistic-military-african-female-soldier"
          }
          gumroadLink = {
            "https://cacybernetic.gumroad.com/l/realistic" +
            "-military-african-female-soldier"
          }
          link = {
            "https://flippednormals.com/product/realistic" +
            "-military-african-female-soldier-52001"
          }
          sketchfabLink = {
            "https://sketchfab.com/3d-models/realistic-military" +
            "-african-female-soldier-73634b2be3214dc08bdac7a787" +
            "482e1a"
          }
        />
        {/** Destroyed cars 3D sssets pack for blender vol 1 */}
        <ProjectCard
          {...commonProjectCardStyle}
          description = {t("destroyedCarsBlenderVol1Description")}
          title = {t("destroyedCarsBlenderVol1Title")}
          type = {t("resource")}
          artStationLink = {
            "https://cacybernetic.artstation.com/projects/y4qQ8O"
          }
          gumroadLink = {
            "https://cacybernetic.gumroad.com/l/realistic-destroyed" +
            "-cars-3d-assets-pack-for-blender-vol1"
          }
          link = {
            "https://flippednormals.com/product/realistic-destroyed" +
            "-cars-3d-assets-pack-for-blender-vol-1-52953"
          }
          sketchfabLink = {
            "https://sketchfab.com/3d-models/realistic-destroyed" +
            "-cars-3d-assets-pack-4b4534d62a784ad6966e06bf5e0f3d24"
          }
          imageUrl = {
            "https://public-files.gumroad.com/43b19rpphunz483wam" +
            "qoytzzm2y8"
          }
          cubeBrushLink = {
            "https://cubebrush.co/cacybernetic/products/faxxga/" +
            "realistic-destroyed-cars-3d-assets-pack-for-blender" +
            "-vol-1"
          }
        />
        {/** Destroyed cars 3D sssets pack for godot vol 1 */}
        <ProjectCard
          {...commonProjectCardStyle}
          description = {t("destroyedCarsBlenderVol1Description")}
          title = {t("destroyedCarsGodotVol1Title")}
          type = {t("resource")}
          artStationLink = {
            "https://cacybernetic.artstation.com/projects/a0rE2J"
          }
          gumroadLink = {
            "https://cacybernetic.gumroad.com/l/realistic-destroyed" +
            "-cars-3d-assets-pack-for-godot-vol1"
          }
          link = {
            "https://flippednormals.com/product/realistic-destroyed" +
            "-cars-3d-assets-pack-for-godot-vol-1-53347"
          }
          cubeBrushLink = {
            "https://cubebrush.co/cacybernetic/products/gfup2g/" +
            "realistic-destroyed-cars-3d-assets-pack-for-godot-vol-1"
          }
          imageUrl = {
            "https://public-files.gumroad.com/xiesgtqyzb0uyr4w5a" +
            "36lijdttau"
          }
          sketchfabLink = {
            "https://sketchfab.com/3d-models/realistic-destroyed" +
            "-cars-3d-assets-pack-4b4534d62a784ad6966e06bf5e0f3d24"
          }
        />
        {/** Buildings 3D assets pack for blender vol 1 */}
        <ProjectCard
          {...commonProjectCardStyle}
          description = {t("buildingsBlenderVol1Description")}
          title = {t("buildingsBlenderVol1Title")}
          type = {t("resource")}
          artStationLink = {
            "https://cacybernetic.artstation.com/projects/mAwRPd"
          }
          gumroadLink = {
            "https://cacybernetic.gumroad.com/l/realistic-buildings" +
            "-3d-assets-pack-for-blender-vol1"
          }
          link = {
            "https://flippednormals.com/product/realistic-buildings" +
            "-3d-assets-pack-for-blender-vol-1-58006"
          }
          sketchfabLink = {
            "https://sketchfab.com/3d-models/realistic-buildings-3d" +
            "-assets-pack-6ff83602de5640d58bb5a5848c7e8361"
          }
          imageUrl = {
            "https://public-files.gumroad.com/4y7d6bry8ei4tmd6oyyk9" +
            "u7rqyt3"
          }
          cubeBrushLink = {
            "https://cubebrush.co/cacybernetic/products/vt3cza/" +
            "realistic-buildings-3d-assets-pack-for-blender-vol-1"
          }
        />
        {/** Buildings 3D assets pack for godot vol 1 */}
        <ProjectCard
          {...commonProjectCardStyle}
          description = {t("buildingsBlenderVol1Description")}
          title = {t("buildingsGodotVol1Title")}
          type = {t("resource")}
          artStationLink = {
            "https://cacybernetic.artstation.com/projects/NqzPAJ"
          }
          gumroadLink = {
            "https://cacybernetic.gumroad.com/l/realistic-buildings" +
            "-3d-assets-pack-for-godot-vol1"
          }
          link = {
            "https://flippednormals.com/product/realistic-buildings" +
            "-3d-assets-pack-for-godot-vol-1-57646"
          }
          sketchfabLink = {
            "https://sketchfab.com/3d-models/realistic-buildings-3d" +
            "-assets-pack-6ff83602de5640d58bb5a5848c7e8361"
          }
          imageUrl = {
            "https://public-files.gumroad.com/oezc41kcn7xw8h1k01egi" +
            "c2e9u9a"
          }
          cubeBrushLink = {
            "https://cubebrush.co/cacybernetic/products/ghoqcw/" +
            "realistic-buildings-3d-assets-pack-for-godot-vol-1"
          }
        />
      </Flex>}
    />
    {/** Footer */}
    <Footer/>
  </Box>;
}

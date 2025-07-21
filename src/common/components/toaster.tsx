/**
 * @project CAC - https://github.com/cacybernetic/cacybernetic.github.io
 * @author Obrymec - https://obrymec.vercel.app
 * @fileoverview Toaster ui component.
 * @supported DESKTOP, MOBILE
 * @created 2025-07-21
 * @updated 2025-07-21
 * @file toaster.tsx
 * @version 0.0.1
 */

// React dependencies.
import {ReactElement} from "react";

// Chakra dependencies.
import {
  Toaster as ChakraToaster,
  Spinner,
  Portal,
  Stack,
  Toast
} from "@chakra-ui/react";

// Custom dependencies.
import {SF_REGULAR} from "@/common/constants/variables.ts";
import {toaster} from "@/common/libraries/toast.ts";

// Builds a toast UI component.
export default function Toaster () {
  // Builds tsx.
  return <Portal>
    {/** Main container */}
    <ChakraToaster insetInline = {{mdDown: '4'}} toaster = {toaster}>
      {/** Builds structure */}
      {(toast): ReactElement => <Toast.Root
		    transition = "all .2s linear"
        fontFamily = {SF_REGULAR}
        userSelect = "none"
        color = "neutral.1"
        width = "256px"
        transform = {{
          sm: "translate(-32px, -32px)", base: "translate(0, -24px)"
        }}
      >
        {/** Whether toast under loading */}
        {
          toast.type === "loading" ?
          <Spinner color = "primary.800" size = "sm"/> :
          <Toast.Indicator/>
        }
        {/** Content */}
        <Stack maxWidth = "100%" flex = '1' gap = '1'>
          {/** Title */}
          {toast.title && <Toast.Title
            fontSize = {{base: 12, sm: 13, md: 14}}
            transition = "all .2s linear"
          >{toast.title}</Toast.Title>}
          {/** Description */}
          {toast.description && <Toast.Description
            fontSize = {{base: 12, sm: 13, md: 14}}
            transition = "all .2s linear"
          >{toast.description}</Toast.Description>}
        </Stack>
        {/** Options  */}
        {
          toast.action &&
          <Toast.ActionTrigger>{toast.action.label}</Toast.ActionTrigger>
        }
        {/** Close button */}
        {toast.closable && <Toast.CloseTrigger/>}
      </Toast.Root>}
    </ChakraToaster>
  </Portal>;
}

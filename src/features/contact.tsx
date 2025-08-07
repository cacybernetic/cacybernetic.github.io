/**
 * @project CAC - https://github.com/cacybernetic/cacybernetic.github.io
 * @fileoverview Formular to contact client support service.
 * @author Obrymec - https://obrymec.vercel.app
 * @supported DESKTOP, MOBILE
 * @created 2025-08-07
 * @updated 2025-08-07
 * @file contact.tsx
 * @version 0.0.1
 */

// React dependencies.
import {ReactElement, useCallback, useEffect, useState} from "react";
import {MdOutlinePhone} from "react-icons/md";
import {CiMail} from "react-icons/ci";

// Plugin dependencies.
import {useDispatch, useSelector} from "react-redux";
import {useTranslation} from "react-i18next";
import {Dispatch} from "@reduxjs/toolkit";

// Chakra dependencies.
import {
  FlexProps,
  Spinner,
  Button,
  Text,
  Flex,
  Link,
  Icon,
  Box
} from "@chakra-ui/react";

// Custom dependencies.
import FetchManager, {FetchMethod} from "@/common/libraries/fetch.ts";
import {CONTACT_SAVE_KEY} from "@/common/constants/storage_keys.ts";
import {ToastType, showToast} from "@/common/libraries/toast.ts";
import {GLOBAL_LANG} from "@/common/i18n/localization.ts";
import {API_TEST} from "@/common/constants/api_links.ts";
import {loadFormData} from "@/common/libraries/std.ts";
import TextField from "@/common/components/input.tsx";
import Section from "@/common/components/section.tsx";
import Footer from "@/common/components/footer.tsx";
import {RootState} from "@/common/states/store.ts";
import {onGoing} from "@/common/states/app.ts";
import {
  COMPANY_GMAIL,
  COMPANY_PHONE,
  SF_SEMI_BOLD,
  SF_MEDIUM
} from "@/common/constants/variables.ts";

// Component types.
type BuildContactInfoProps = {
  icon?: (ReactElement | null),
  link: string,
  text: string
};
export type ContactData = {
  fullName?: (string | null),
  message?: (string | null),
  email?: (string | null)
};

// Global attributes.
const fetcher: FetchManager = new FetchManager();

// Console Art guest support contact formular.
export default function ContactUs () {
  // Attributes.
  const {t} = useTranslation<string, undefined>(GLOBAL_LANG);
  const [isLoaded, setLoaded] = useState<boolean>(false);
  const [fullName, setFullName] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const dispatch: Dispatch = useDispatch();
  const isOnGoing: boolean = useSelector(
		(state: RootState): boolean => state.app.isOnGoing
	);
  const infoSectionCommonStyle: FlexProps = {
    transition: "all .2s",
    direction: "column",
    rowGap: {
      base: ".4rem", sm: ".5rem", md: ".6rem", lg: ".7rem", xl: ".8rem"
    }
  };

  // Checks whether all required fields are filled.
	const isRequiredFieldsAreFilled = useCallback((): boolean => (
		fullName.trim().length > 0 &&
    message.trim().length > 0 &&
		email.trim().length > 0
  // Dependencies.
	), [fullName, message, email]);

  // Saves contact data form to browser local storage.
	const saveData = useCallback((): void => window.localStorage.setItem(
    CONTACT_SAVE_KEY, JSON.stringify({
      fullName: fullName.trim(),
      message: message.trim(),
      email: email.trim()
    })
  // Depenencies.
  ), [fullName, message, email]);

  // Checks whether the provided company mail is valid.
	const isMailValid = useCallback((): boolean => {
		// The mail regex for verification.
		const regex: RegExp = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    // Checks email.
    const isValid: boolean = regex.test(email.trim());
    // Whether we have an error.
    if (!isValid) showToast({
      message: t("emailError"),
      title: t("inputError"),
      type: ToastType.ERROR
    });
		// Sends the match result.
    return isValid;
  // Dependencies.
	}, [email, t]);

  // Loads contact data from browser local storage.
	const loadData = useCallback((): void => {
		// Gets saved string from browser local storage.
		const data: (ContactData | null) = loadFormData<ContactData | null>(
      CONTACT_SAVE_KEY
    );
		// Whether we have something.
		if (data != null) {
			// Gets full name.
			setFullName(data?.fullName ?? fullName);
      // Gets message.
			setMessage(data?.message ?? message);
      // Gets email address.
			setEmail(data?.email ?? email);
		}
		// Updates load state.
		setLoaded(true);
  // Dependencies.
	}, [fullName, message, email]);

  // Called when we want to send a mail to organization.
  const onMailSent = useCallback(async (): Promise<void> => {
    // Whether no request is already performing.
    if (isMailValid() && !isOnGoing) {
      // Disables view.
			dispatch(onGoing(true));
      // Sends form data to the remote server.
      const response: (Response | null) = await fetcher.apiFetch({
        method: FetchMethod.GET, url: API_TEST
      });
      // Enables view.
			dispatch(onGoing(false));
      // Whether we have something.
      if (response != null && fetcher.isRequestSucceedded(response)) {
        // Clears the current entered message.
        setMessage('');
        // Shows a toast about successful operation.
        showToast({
          message: t("sendMailSuccess"), type: ToastType.SUCCESS
        });
      // Otherwise.
      } else showToast({
        message: t("sendMailError"), type: ToastType.ERROR
      });
    }
  // Dependencies.
  }, [isMailValid, isOnGoing, dispatch, t]);

  // Called when keydown is detected on any input field.
  const handleKeydown = useCallback((event?: KeyboardEvent): void => {
    // Whether `Enter` key is pressed.
    if (isRequiredFieldsAreFilled() && event?.key === "Enter") {
      // Sends the written mail to the DEI customer service.
      onMailSent();
    }
  // Dependencies.
  }, [isRequiredFieldsAreFilled, onMailSent]);

  // Builds contact more information UI.
  const buildContactInfo = useCallback((
    {link, icon, text}: BuildContactInfoProps
  ): ReactElement => <Link
    fontSize = {{base: 14, sm: 15, md: 16, lg: 18}}
    fontFamily = {SF_MEDIUM}
    textDecoration = "none"
    display = "inline-flex"
    transition = "all .3s"
    alignItems = "center"
    color = "primary.500"
    outline = "none"
    columnGap = {1}
    href = {link}
    _hover = {{
      textDecoration: "underline",
      textUnderlineOffset: "4px",
      color: "primary.600"
    }}
  >{icon != null && icon}{text}</Link>, []);

  // When the view is rendered.
  useEffect((): void => {
    // Whether no load is carry out.
    if (!isLoaded) loadData(); else saveData();
  // Dependencies.
  }, [isLoaded, loadData, saveData]);

  // Builds tsx code.
  return <Box
    paddingTop = {{base: 12, sm: 12, md: 13}}
    transition = "all .2s"
    width = "full"
  >
    {/** Contact us */}
    <Section
      containerStyle = {{backgroundImage: "var(--banner-background-color)"}}
      title = {t("contactUsTitle")}
      children = {<Flex
        marginTop = {{xl: 4, "2xl": 6}}
        gap = {{base: 7, sm: 7, md: 8}}
        transition = "all .2s"
        direction = {{
          base: "column", sm: "column", md: "column",
          lg: "column", xl: "row"
        }}
      >
        {/** Information */}
        <Flex {...infoSectionCommonStyle} width = "100%">
          {/** Title */}
          <Text
            fontSize = {{base: 16, sm: 18, md: 20, lg: 22, xl: 24}}
            fontFamily = {SF_SEMI_BOLD}
            transition = "all .2s"
            as = "h3"
          >{t("contactLeftTitle")}</Text>
          {/** Description */}
          <Text
            fontSize = {{base: 14, sm: 15, md: 16, lg: 18}}
            transition = "all .2s"
            color = "neutral.8"
          >{t("contactLeftDescription")}</Text>
          {/** Links */}
          <Flex>
            {/** Left */}
            <Flex {...infoSectionCommonStyle}>
              {/** Gmail */}
              {buildContactInfo({
                icon: <Icon transform = "translateY(1.5px)" as = {CiMail}/>,
                link: `mailto:${COMPANY_GMAIL}`,
                text: COMPANY_GMAIL
              })}
              {/** Phone */}
              {buildContactInfo({
                link: `tel:${COMPANY_PHONE}`,
                text: COMPANY_PHONE,
                icon: <Icon
                  transform = "translateY(1.5px)"
                  as = {MdOutlinePhone}
                />
              })}
            </Flex>
            {/** Spacer */}
            <Box width = "full"/>
          </Flex>
        </Flex>
        {/** Formular */}
        <Flex
          rowGap = {{base: 7, sm: 7, md: 8, lg: 8, xl: 9}}
          alignItems = "flex-end"
          transition = "all .2s"
          direction = "column"
          width = "100%"
        >
          {/** Full name */}
          <TextField
            onChange = {(value: string): void => setFullName(value)}
            label = {t("fullNameInputLabel")}
            onKeyDown = {handleKeydown}
            disabled = {isOnGoing}
            value = {fullName}
            type = "text"
            mandatory
          />
          {/** Email */}
          <TextField
            onChange = {(value: string): void => setEmail(value)}
            label = {t("emailInputLabel")}
            onKeyDown = {handleKeydown}
            disabled = {isOnGoing}
            value = {email}
            type = "email"
            mandatory
          />
          {/** Message */}
          <TextField
            onChange = {(value: string): void => setMessage(value)}
            label = {t("messageInputLabel")}
            onKeyDown = {handleKeydown}
            disabled = {isOnGoing}
            value = {message}
            mode = "textarea"
            height = "148px"
            type = "text"
            mandatory
          />
          {/** Send button */}
          <Button
            width = {{base: "100%", sm: "196px", md: "216px", lg: "256px"}}
            borderRadius = {{base: 4, sm: 6, md: 8, lg: 10}}
            paddingBlock = {{base: 3, sm: 4, md: 5, lg: 6}}
            fontSize = {{base: 12, sm: 13, md: 14, lg: 15}}
            cursor = {!isOnGoing ? "pointer" : "progress"}
            paddingInline = {{base: 6, sm: 8, md: 10}}
            disabled = {!isRequiredFieldsAreFilled()}
            justifyContent = "center"
            fontFamily = {SF_MEDIUM}
            display = "inline-flex"
            transition = "all .2s"
            onClick = {onMailSent}
            alignItems = "center"
            color = "neutral.1"
            outline = "none"
            backgroundImage = {`linear-gradient(
              var(--chakra-colors-primary-400),
              var(--chakra-colors-primary-500)
            )`}
            _disabled = {{
              backgroundColor: "neutral.5",
              cursor: "not-allowed",
              color: "neutral.7"
            }}
            _hover = {{
              textShadow: "0 0 4px var(--chakra-colors-neutral-1)",
              backgroundColor: "primary.500",
              transform: "scale(1.04)",
              backgroundImage: "none"
            }}
          >
            {/** Inner text */}
            {!isOnGoing ? t("sendMessage").toUpperCase() : ''}
            {/** Loader */}
            {isOnGoing && <Spinner
              height = {{base: 4, sm: 5, md: 6, lg: 7}}
              width = {{base: 4, sm: 5, md: 6, lg: 7}}
              transition = "all .2s"
              color = "neutral.1"
            />}
          </Button>
        </Flex>
      </Flex>}
    />
    {/** Footer */}
    <Footer/>
  </Box>;
}

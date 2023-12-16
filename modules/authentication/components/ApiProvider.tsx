"use client";
import { useRouter, useSearchParams } from "next/navigation";
import Script from "next/script";
import * as React from "react";

import { ApiContext } from "../contexts/ApiContext";
import { CLIENT_ENV } from "@/modules/env/client";
import { httpPost$AuthenticateByGoogle } from "@/modules/commands/AuthenticateWithGoogle/fetcher";
import { shamelesslyRevalidateEverything } from "@/modules/common-utils";

type Props = {
  children?: React.ReactNode;
};

function isSafeUrl(url: string) {
  return url.startsWith("/") && !url.startsWith("//");
}

export default function ApiProvider({ children }: Props) {
  const router = useRouter();
  const [triggerGoogleAuthentication, setTriggerGoogleAuthentication] =
    React.useState<(() => void) | undefined>(undefined);

  const searchParams = useSearchParams();
  const redirectUrl$OnAuthenticationSuccess = searchParams.get("redirectUrl");

  const handleToken = async ({
    credential,
  }: google.accounts.id.CredentialResponse) => {
    try {
      const { userId } = await httpPost$AuthenticateByGoogle(
        `/api/v1/auth/google`,
        {
          credential,
        }
      );
      console.log(`logged in as ${userId}`);
      console.log(
        redirectUrl$OnAuthenticationSuccess,
        typeof redirectUrl$OnAuthenticationSuccess === "string" &&
          isSafeUrl(redirectUrl$OnAuthenticationSuccess)
      );
      await shamelesslyRevalidateEverything();
      router.push(
        typeof redirectUrl$OnAuthenticationSuccess === "string" &&
          isSafeUrl(redirectUrl$OnAuthenticationSuccess)
          ? redirectUrl$OnAuthenticationSuccess
          : "/"
      );
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Script
        id="17f35de9-a4c1-4f53-8cd2-3215697e6026"
        src="https://accounts.google.com/gsi/client"
        strategy="afterInteractive"
        onLoad={() => {
          const promptContainer = document.createElement("div");
          promptContainer.id = "cd421620-0915-409c-a129-7c52f4db9346";
          Object.assign(promptContainer.style, {
            display: "block",
            position: "fixed",
            right: "48px",
            top: "98px",
            // TODO: ideally, we should eliminate the following magic number
            // by using a .scss file. Let's keep this for now for simplicity.
            zIndex: 100,
          });
          document.body.appendChild(promptContainer);

          window.google.accounts.id.initialize({
            client_id: CLIENT_ENV.CLIENT_ID,
            prompt_parent_id: promptContainer.id,
            ux_mode: "popup",
            callback: (event) => {
              handleToken?.(event);
            },
          });

          const hiddenDiv = document.createElement("div");
          hiddenDiv.style.display = "none";
          document.body.appendChild(hiddenDiv);

          window.google.accounts.id.renderButton(
            hiddenDiv,
            // https://stackoverflow.com/q/76770357/2742305
            // https://developers.google.com/identity/gsi/web/reference/js-reference#width
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            { type: "icon", width: 200 as any }
          );

          const buttonElement = hiddenDiv.querySelector("div[role=button]");

          if (buttonElement instanceof HTMLElement) {
            const triggerGoogle = () => {
              buttonElement.click();
            };
            setTriggerGoogleAuthentication(() => () => triggerGoogle());
          }
        }}
      ></Script>
      <ApiContext.Provider
        value={{
          triggerGoogleAuthentication,
        }}
      >
        {children}
      </ApiContext.Provider>
    </>
  );
}

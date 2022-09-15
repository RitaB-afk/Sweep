import { useMsal } from "@azure/msal-react";
import { DefaultButton } from "@fluentui/react";

/**
 * Renders a sign-out button
 */
export const SignOutButton = () => {
    const { instance } = useMsal();

    const handleLogout = (logoutType) => {
        if (logoutType === "popup") {
            instance.logoutPopup({
                postLogoutRedirectUri: "/",
                mainWindowRedirectUri: "/"
            });
        } else if (logoutType === "redirect") {
            instance.logoutRedirect({
                postLogoutRedirectUri: "/",
            });
        }
    }
    return (
        <DefaultButton onClick={() => handleLogout("redirect")}>Sign out using Redirect</DefaultButton>
    )
}
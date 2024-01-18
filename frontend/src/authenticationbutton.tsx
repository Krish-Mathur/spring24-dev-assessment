import { useAuth0 } from "@auth0/auth0-react";
import LogoutButton from "./logout";
import LoginButton from "./login";

export const AuthenticationButton = () => {
    const { isAuthenticated } = useAuth0();
  
    return isAuthenticated ? <LogoutButton /> : <LoginButton />;
  };
  
export const token_endpoint = "auth/login";
export const token_key = "access-token";

export const FindAccessToken = (response) => {
  // console.log(response, "FindAccessToken")
  const AccessToken = response?.access_token?.[0]?.token;
  if (AccessToken) {
    // console.log(response, "FindAccessToken");
    return AccessToken;
  }
};

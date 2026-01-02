const platforms = {
  instagram: {
    name: "Instagram",
    authUrl: "https://api.instagram.com/oauth/authorize",
    tokenUrl: "https://graph.instagram.com/v24.0/access_token",
    clientIdEnvVar: "INSTAGRAM_CLIENT_ID",
    clientSecretEnvVar: "INSTAGRAM_CLIENT_SECRET",
    redirectUriEnvVar: "INSTAGRAM_REDIRECT_URI",
    scope: "user_profile,user_media",
  },
  x: {
    name: "X",
    authUrl: "https://twitter.com/i/oauth2/authorize",
    tokenUrl: "https://api.twitter.com/2/oauth2/token",
    clientIdEnvVar: "X_CLIENT_ID",
    clientSecretEnvVar: "X_CLIENT_SECRET",
    redirectUriEnvVar: "X_REDIRECT_URI",
    scope: "tweet.read tweet.write users.read offline.access",
  },
  linkedin: {
    name: "LinkedIn",
    authUrl: "https://www.linkedin.com/oauth/v2/authorization",
    tokenUrl: "https://www.linkedin.com/oauth/v2/accessToken",
    clientIdEnvVar: "LINKEDIN_CLIENT_ID",
    clientSecretEnvVar: "LINKEDIN_CLIENT_SECRET",
    redirectUriEnvVar: "LINKEDIN_REDIRECT_URI",
    scope: "r_liteprofile r_emailaddress w_member_social",
  },
  facebook: {
    authUrl: "https://www.facebook.com/v19.0/dialog/oauth",
    tokenUrl: "https://graph.facebook.com/v19.0/oauth/access_token",
    clientIdEnvVar: "META_API_ID",
    clientSecretEnvVar: "META_API_SECRET",
    redirectUriEnvVar: "META_REDIRECT_URI",
    scope: [
      "pages_manage_metadata",
      "pages_read_engagement",
      "pages_manage_posts",
      "public_profile",
    ].join(","),
  },
};

module.exports = platforms;

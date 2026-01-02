const platforms = require("../config/platforms");
const Account = require("../model/account");
const { getPlatformService } = require("../services/platformFactory");

exports.redirectToOAuth = async (req, res) => {
  const { platform } = req.params;
  const config = platforms[platform];

  const clientId = process.env[config.clientIdEnvVar];
  const redirectUri = process.env[config.redirectUriEnvVar];

  const state = Buffer.from(
    `${req.user._id}:${platform}:${Date.now()}`
  ).toString("base64");

  const authUrl =
    `${config.authUrl}?client_id=${clientId}` +
    `&redirect_uri=${encodeURIComponent(redirectUri)}` +
    `&scope=${config.scope}` +
    `&response_type=code` +
    `&state=${state}`;

  res.json({ authUrl });
};

exports.handleOAuthCallback = async (req, res) => {
  const { platform } = req.params;
  const { code, state } = req.query;

  const decoded = Buffer.from(state, "base64").toString();
  const [userIdFromState] = decoded.split(":");

  if (userIdFromState !== req.user._id.toString()) {
    return res.status(403).json({ message: "Invalid OAuth state" });
  }

  const service = getPlatformService(platform);
  const redirectUri = process.env.META_REDIRECT_URI;

  // 1. Code → short-lived token
  const shortToken = await service.exchangeCodeForToken({
    code,
    redirectUri,
  });

  // 2. Short → long-lived token
  const longToken = await service.getLongLivedToken(shortToken.accessToken);

  // 3. Fetch pages
  const pages = await service.fetchUserPages(longToken.accessToken);

  // Save EACH page
  for (const page of pages) {
    await Account.findOneAndUpdate(
      {
        userId: req.user._id,
        platform: "facebook",
        accountId: page.id,
      },
      {
        accountName: page.name,
        accountId: page.id,
        accessToken: page.access_token, // page token!
        expiresAt: new Date(Date.now() + longToken.expiresIn * 1000),
        isConnected: true,
      },
      { upsert: true }
    );
  }

  res.redirect(
    `${process.env.FRONTEND_URL}/accounts?success=true&platform=facebook`
  );
};

exports.getConnectedAccounts = async (req, res) => {
  try {
    const accounts = await Account.find({
      userId: req.user._id,
      isConnected: true,
    }).select("platform accountName accountId");

    res.json({ accounts });
  } catch (error) {
    console.error("Error fetching connected accounts:", error);
    res.status(500).json({ message: "Error fetching connected accounts" });
  }
};

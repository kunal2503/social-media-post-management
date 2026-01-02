const mongoose = require("mongoose");

const accountSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    platform: {
      type: String,
      enum: ["facebook", "instagram", "x", "linkedin", "youtube"],
      required: true,
      index: true,
    },

    // Platform user/page/account ID
    accountId: {
      type: String,
      required: true,
      index: true,
    },

    // Optional metadata (fetched AFTER connect)
    accountName: {
      type: String,
    },

    accountUrl: {
      type: String,
    },

    profileImage: {
      type: String,
    },

    // 🔐 Tokens (ENCRYPTED)
    accessToken: {
      type: String,
      required: true,
    },

    refreshToken: {
      type: String,
    },

    tokenType: {
      type: String, // Bearer
      default: "Bearer",
    },

    scopes: {
      type: [String],
      default: [],
    },

    expiresAt: {
      type: Date,
    },

    lastRefreshedAt: {
      type: Date,
    },

    isActive: {
      type: Boolean,
      default: true,
    },

    isConnected: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

// 🔒 Prevent duplicate connections
accountSchema.index(
  { userId: 1, platform: 1, accountId: 1 },
  { unique: true }
);

module.exports = mongoose.model("Account", accountSchema);

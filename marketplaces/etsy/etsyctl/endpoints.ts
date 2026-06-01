// Etsy Open API v3 endpoint paths.
//
// Pure path builders (no I/O) for the endpoints this repo's digital-download
// workflow needs, plus REFERENCE — a linked catalog of the broader API for
// future work. All paths are relative to ETSY_API_BASE ("https://openapi.etsy.com/v3").
// Full reference: https://developers.etsy.com/documentation/reference
//
// Every path here except `openapi-ping`, `users/me`, and the public taxonomy
// reads requires an OAuth Bearer token (see oauth.ts) in addition to x-api-key.

/** Identity — the user the access token belongs to. GET. Scope: email_r. */
export const getMe = () => `/application/users/me`;

// --- Shop ---------------------------------------------------------------
/** GET a shop by id. Scope: shops_r. */
export const getShop = (shopId: number | string) =>
  `/application/shops/${shopId}`;
/** GET shops owned by a user. Scope: shops_r. */
export const getShopsByOwnerUserId = (userId: number | string) =>
  `/application/users/${userId}/shops`;

// --- Seller taxonomy (public; needed to pick taxonomy_id for a listing) ---
/** GET the full seller taxonomy tree. */
export const getSellerTaxonomyNodes = () =>
  `/application/seller-taxonomy/nodes`;
/** GET the properties (attributes) valid for a taxonomy node. */
export const getPropertiesByTaxonomyId = (taxonomyId: number | string) =>
  `/application/seller-taxonomy/nodes/${taxonomyId}/properties`;

// --- Listings -----------------------------------------------------------
/** POST createDraftListing / GET getListingsByShop. Scope: listings_w / listings_r. */
export const shopListings = (shopId: number | string) =>
  `/application/shops/${shopId}/listings`;
/** GET a single listing. Scope: listings_r. */
export const getListing = (listingId: number | string) =>
  `/application/listings/${listingId}`;
/** PATCH updateListing. Scope: listings_w. */
export const updateListing = (
  shopId: number | string,
  listingId: number | string,
) => `/application/shops/${shopId}/listings/${listingId}`;
/** DELETE a listing. Scope: listings_d. */
export const deleteListing = (listingId: number | string) =>
  `/application/listings/${listingId}`;

// --- Listing images & digital files ------------------------------------
/** POST uploadListingImage / GET images. Scope: listings_w / listings_r. */
export const listingImages = (
  shopId: number | string,
  listingId: number | string,
) => `/application/shops/${shopId}/listings/${listingId}/images`;
/** POST uploadListingFile / GET files — digital downloads. Scope: listings_w / listings_r. */
export const listingFiles = (
  shopId: number | string,
  listingId: number | string,
) => `/application/shops/${shopId}/listings/${listingId}/files`;

// --- Inventory (price/quantity/SKU live here, not on the listing) -------
/** GET/PUT listing inventory. Scope: listings_r / listings_w. */
export const listingInventory = (listingId: number | string) =>
  `/application/listings/${listingId}/inventory`;

// --- Orders / receipts (fulfillment) ------------------------------------
/** GET shop receipts (orders). Scope: transactions_r. */
export const shopReceipts = (shopId: number | string) =>
  `/application/shops/${shopId}/receipts`;
/** GET/PATCH a single receipt. Scope: transactions_r / transactions_w. */
export const shopReceipt = (
  shopId: number | string,
  receiptId: number | string,
) => `/application/shops/${shopId}/receipts/${receiptId}`;

/**
 * Catalog of endpoint groups with doc links — for capabilities we don't build
 * helpers for yet. Anchors resolve under the reference SPA.
 */
export const REFERENCE = {
  base: "https://developers.etsy.com/documentation/reference",
  shop: "https://developers.etsy.com/documentation/reference#tag/Shop",
  shopListing:
    "https://developers.etsy.com/documentation/reference#tag/ShopListing",
  listingImage:
    "https://developers.etsy.com/documentation/reference#tag/ShopListing-Image",
  listingFile:
    "https://developers.etsy.com/documentation/reference#tag/ShopListing-File",
  listingInventory:
    "https://developers.etsy.com/documentation/reference#tag/ShopListing-Inventory",
  listingTranslation:
    "https://developers.etsy.com/documentation/reference#tag/ShopListing-Translation",
  listingVariationImages:
    "https://developers.etsy.com/documentation/reference#tag/ShopListing-VariationImage",
  sellerTaxonomy:
    "https://developers.etsy.com/documentation/reference#tag/SellerTaxonomy",
  shopReceipt:
    "https://developers.etsy.com/documentation/reference#tag/Shop-Receipt",
  shopReceiptTransaction:
    "https://developers.etsy.com/documentation/reference#tag/Shop-Receipt-Transactions",
  shippingProfile:
    "https://developers.etsy.com/documentation/reference#tag/Shop-ShippingProfile",
  paymentLedger:
    "https://developers.etsy.com/documentation/reference#tag/Ledger-Entry",
  shopProductionPartner:
    "https://developers.etsy.com/documentation/reference#tag/Shop-ProductionPartner",
  user: "https://developers.etsy.com/documentation/reference#tag/User",
  reviews: "https://developers.etsy.com/documentation/reference#tag/Review",
} as const;

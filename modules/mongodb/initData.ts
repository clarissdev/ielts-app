import { Db } from "mongodb";

export async function initializeIndices(db: Db) {
  console.log("Create db `user` indices");
  await db.collection("user").createIndex(
    { handle: 1 },
    {
      name: "unique_handle_index",
      unique: true,
      sparse: true,
      background: true,
    }
  );
  await db.collection("user").createIndex(
    { walletAddresses: 1 },
    {
      name: "unique_wallet_addresses_index",
      unique: true,
      sparse: true,
      background: true,
    }
  );

  console.log("Create db `collection` indices");
  await db.collection("collection").createIndex(
    { handle: 1 },
    {
      name: "unique_collection_handle_index",
      unique: true,
      sparse: true,
      background: true,
    }
  );
  await db.collection("collection").createIndex(
    { policyId: 1 },
    {
      name: "unique_collection_policyId_index",
      unique: true,
      sparse: true,
      background: true,
    }
  );

  console.log("Create db `mph` indices");
  await db.collection("mph").createIndex(
    { mphHex: 1 },
    {
      name: "mph__mphHex_index",
      background: true,
    }
  );

  console.log("Create db `file` indices");
  await db.collection("file").createIndex(
    { ipfsHash: 1 },
    {
      name: "file__ipfsHash_index",
      background: true,
    }
  );

  console.log("Create db `artwork` indices");
  await db.collection("artwork").createIndex(
    { createdBy: 1 },
    {
      name: "artwork_createdBy_index",
      background: true,
    }
  );
  await db.collection("artwork").createIndex(
    { collectionId: 1 },
    {
      name: "artwork_collectionId_index",
      background: true,
    }
  );
  await db.collection("artwork").createIndex(
    { tags: 1 },
    {
      name: "artwork_tags_index",
      background: true,
    }
  );
  await db.collection("artwork").createIndex(
    { assetId: 1 },
    {
      name: "artwork_assetId_index",
      background: true,
      sparse: true,
    }
  );
  // caching index
  await db.collection("artwork").createIndex(
    { __assetId: 1 },
    {
      name: "artwork___assetId_index",
      background: true,
    }
  );
  await db.collection("artwork").createIndex(
    { "__cached:recentlyCommentedAt": -1 },
    {
      name: "artwork_recently_commented_at_index",
      background: true,
    }
  );
  await db.collection("artwork").createIndex(
    { "__cached:recentlyLovedAt": -1 },
    {
      name: "artwork_recently_loved_at_index",
      background: true,
    }
  );
  await db.collection("artwork").createIndex(
    { "__exploreCache.totalSupply": -1 },
    {
      name: "artwork_total_supply_index",
      background: true,
      sparse: true,
    }
  );
  await db.collection("artwork").createIndex(
    { "__exploreCache.numEditionsLeft": -1 },
    {
      name: "artwork_num_editions_left_index",
      background: true,
      sparse: true,
    }
  );
  await db.collection("artwork").createIndex(
    { "__exploreCache.priceAda": -1 },
    {
      name: "artwork_price_ada_index",
      background: true,
      sparse: true,
    }
  );
  await db.collection("artwork").createIndex(
    { englishAuction: -1 },
    {
      name: "artwork_english_auction_index",
      background: true,
      sparse: true,
    }
  );

  console.log("Create db `artwork_deleted` indices");
  await db.collection("artwork_deleted").createIndex(
    { "doc.assetId": 1 },
    {
      name: "artwork_deleted_assetId_index",
      background: true,
      sparse: true,
    }
  );

  console.log("Create db `restore_policy_job` indices");
  await db.collection("restore_policy_job").createIndex(
    { type: 1, policyId: 1, status: 1 },
    {
      name: "restore_job_type_policyId_status_index",
      background: true,
    }
  );
  await db.collection("restore_policy_job").createIndex(
    { refJobId: 1, status: 1 },
    {
      name: "restore_job_refJobId_status_index",
      background: true,
    }
  );
  await db.collection("restore_policy_job").createIndex(
    { type: 1, status: 1 },
    {
      name: "restore_job_type_status_index",
      background: true,
    }
  );
  await db.collection("restore_policy_job").createIndex(
    { assetId: 1, status: 1 },
    {
      name: "restore_job_assetId_status_index",
      background: true,
    }
  );

  console.log("Create db `asset_onchaindata` indices");
  await db.collection("asset_onchaindata").createIndex(
    { assetId: 1 },
    {
      name: "unique_asset_onchaindata_assetId_index",
      unique: true,
      sparse: true,
      background: true,
    }
  );

  console.log("Create db `utxo` indices");
  await db.collection("utxo").createIndex(
    { "datum.value.tokenName": 1 },
    {
      name: "utxo_datum_value_tokenName_index",
      background: true,
      sparse: true,
    }
  );
  await db.collection("utxo").createIndex(
    { "datum.value.assetId": 1 },
    {
      name: "utxo_datum_value_assetId_index",
      background: true,
      sparse: true,
    }
  );
  // for secondary
  await db.collection("utxo").createIndex(
    { sellerStakeAddress: 1, "datum.value.assetId": 1 },
    {
      name: "utxo_datum_value_assetId_sellerStakeAddress_index",
      background: true,
      sparse: true,
    }
  );
  await db.collection("utxo").createIndex(
    { offererStakeAddress: 1, "datum.value.assetId": 1 },
    {
      name: "utxo_datum_value_assetId_offererStakeAddress_index",
      background: true,
      sparse: true,
    }
  );
  await db.collection("utxo").createIndex(
    { "otherAssets.mintingPolicyHash": 1 },
    {
      name: "utxo__mintingPolicyHash_index",
      background: true,
      sparse: true,
    }
  );
  await db.collection("utxo").createIndex(
    { "datum.type": 1 },
    {
      name: "utxo__datum_type_index",
      background: true,
      sparse: true,
    }
  );
  await db.collection("utxo").createIndex(
    { __indexNumber: -1 },
    {
      name: "utxo____indexNumber_index",
      background: true,
      sparse: true,
    }
  );

  console.log("Create db `comment` indices");
  await db.collection("comment").createIndex(
    { targetId: 1, createdAt: -1 },
    {
      name: "utxo_targetId_createdAt_index",
      background: true,
    }
  );

  console.log("Create db `asset_collector` indices");
  await db.collection("asset_collector").createIndex(
    { assetId: 1 },
    {
      name: "utxo_assetId_index",
      background: true,
    }
  );
  await db.collection("asset_collector").createIndex(
    { address: 1, quantity: 1, assetId: 1 },
    {
      name: "asset_collector__address_quantity_assetId_index",
      background: true,
    }
  );

  console.log("Create db `collector` indices");
  await db.collection("collector").createIndex(
    { address: 1 },
    {
      name: "collector__address_index",
      background: true,
    }
  );
  await db.collection("collector").createIndex(
    { stakeAddress: 1 },
    {
      name: "collector__stakeAddress_index",
      background: true,
    }
  );

  console.log("Create db `nonce_token` indices");
  await db.collection("nonce_token").createIndex(
    { nonce: 1 },
    {
      name: "nonce_token__nonce_index",
      background: true,
    }
  );

  console.log("Create db `transactions` indices");
  await db.collection("transactions").createIndex(
    { tx_hash: 1 },
    {
      name: "transactions__tx_hash_index",
      background: true,
    }
  );

  console.log("Create db `event_changes` indices");
  await db.collection("event_changes").createIndex(
    { scheduled: 1 },
    {
      name: "event_changes__scheduled_index",
      background: true,
    }
  );
  await db.collection("event_changes").createIndex(
    { "data.txId": 1 },
    {
      name: "event_changes__dataTxId_index",
      background: true,
    }
  );
  console.log("Create db `event_changes` indices");
  await db.collection("event_changes").createIndex(
    { createdAt: 1 },
    {
      name: "event_changes__createdAt_index",
      background: true,
    }
  );
  await db.collection("event_changes").createIndex(
    { "eventTracking.email.waitForSending": 1 },
    {
      name: "event_changes__eventTracking_email_index",
      background: true,
      sparse: true,
    }
  );
  await db.collection("event_changes").createIndex(
    { "eventTracking.discord.waitForSending": 1 },
    {
      name: "event_changes__eventTracking_discord_index",
      background: true,
      sparse: true,
    }
  );
  await db.collection("event_changes").createIndex(
    { "eventTracking.emailSubscribers.waitForSending": 1 },
    {
      name: "event_changes__eventTracking_emailSubscribers_index",
      background: true,
      sparse: true,
    }
  );

  console.log("Create db `curated_collection` indices");
  await db.collection("curated_collection").createIndex(
    { handle: 1 },
    {
      name: "unique_curated_collection__handle_index",
      background: true,
      unique: true,
      sparse: true,
    }
  );

  console.log("Create db `curated_collection_artwork_entry` indices");
  await db.collection("curated_collection_entry").createIndex(
    { collectionId: 1, artworkId: 1 },
    {
      name: "unique_curated_collection_artwork_entry__collectionId_artworkId_index",
      background: true,
      unique: true,
      sparse: true,
    }
  );

  console.log("Create db `gallery_artwork` indices");
  await db.collection("gallery_artwork").createIndex(
    { assetId: 1 },
    {
      name: "unique_gallery_artwork__assetId_index",
      background: true,
      unique: true,
    }
  );
  await db.collection("gallery_artwork").createIndex(
    { assetFingerprint: 1 },
    {
      name: "gallery_artwork__assetFingerprint_index",
      background: true,
    }
  );
  await db.collection("gallery_artwork").createIndex(
    { policyId: 1 },
    {
      name: "gallery_artwork__policyId_index",
      background: true,
    }
  );
  // cache index
  await db.collection("gallery_artwork").createIndex(
    { __cronNumber: 1, __saleCache: 1 },
    {
      name: "gallery_artwork__cronNumber_saleCache_index",
      background: true,
    }
  );
  // query and sort by listed at
  await db.collection("gallery_artwork").createIndex(
    { "__saleCache.listedIndex": -1, _id: 1 },
    {
      name: "gallery_artwork__saleCache_listedIndex_id_index",
      background: true,
    }
  );
  await db.collection("gallery_artwork").createIndex(
    { totalSupply: 1, "__saleCache.listedIndex": -1, _id: 1 },
    {
      name: "gallery_artwork__totalSupply_saleCache_listedIndex_id_index",
      background: true,
      partialFilterExpression: {
        totalSupply: 1,
      },
    }
  );

  // query and sort by forsale
  await db.collection("gallery_artwork").createIndex(
    { "__saleCache.saleFlag": -1, "__saleCache.bestPrice": -1, _id: 1 },
    {
      name: "gallery_artwork__saleCache_saleFlag_bestPrice__id_index",
      background: true,
    }
  );
  await db.collection("gallery_artwork").createIndex(
    { "__saleCache.saleFlag": -1, "__saleCache.bestPrice": 1, _id: 1 },
    {
      name: "gallery_artwork__saleCache_saleFlag_bestPrice_1__id_index",
      background: true,
    }
  );
  await db.collection("gallery_artwork").createIndex(
    {
      totalSupply: 1,
      "__saleCache.saleFlag": -1,
      "__saleCache.bestPrice": -1,
      _id: 1,
    },
    {
      name: "gallery_artwork__totalSupply_saleCache_saleFlag_bestPrice__id_index",
      background: true,
      partialFilterExpression: {
        totalSupply: 1,
      },
    }
  );
  await db.collection("gallery_artwork").createIndex(
    {
      totalSupply: 1,
      "__saleCache.saleFlag": -1,
      "__saleCache.bestPrice": 1,
      _id: 1,
    },
    {
      name: "gallery_artwork__totalSupply_saleCache_saleFlag_bestPrice_1__id_index",
      background: true,
      partialFilterExpression: {
        totalSupply: 1,
      },
    }
  );

  console.log("Create db `gallery_artwork_user_entry` indices");
  await db.collection("gallery_artwork_user_entry").createIndex(
    { userId: 1, assetId: 1 },
    {
      name: "unique_artwork_user_entry__userId_assetId_index",
      background: true,
      sparse: true,
      unique: true,
    }
  );
  await db.collection("gallery_artwork_user_entry").createIndex(
    { assetId: 1, userId: 1, hidden: 1 },
    {
      name: "artwork_user_entry__assetId_index",
      background: true,
      sparse: true,
    }
  );

  console.log("Create db `gallery_album` indices");
  await db.collection("gallery_album").createIndex(
    { createdBy: 1, handle: 1 },
    {
      name: "unique_gallery_album__handle_index",
      partialFilterExpression: { handle: { $exists: true } },
      unique: true,
      background: true,
    }
  );

  console.log("Create db `gallery_artwork_album_entry` indices");
  await db.collection("gallery_artwork_album_entry").createIndex(
    { galleryAlbumId: 1, assetId: 1 },
    {
      name: "unique_artwork_album_entry__galleryAlbumId_assetId_index",
      background: true,
      sparse: true,
      unique: true,
    }
  );
  await db.collection("gallery_artwork_album_entry").createIndex(
    { assetId: 1 },
    {
      name: "unique_artwork_album_entry__assetId_index",
      background: true,
      sparse: true,
    }
  );

  console.log("Create db `gallery_album` indices");
  await db.collection("gallery_album").createIndex(
    { createdBy: 1 },
    {
      name: "gallery_album__createdBy_index",
      background: true,
      sparse: true,
    }
  );

  console.log("Create db `asset_collector_account` indices");
  await db.collection("asset_collector_account").createIndex(
    { assetId: 1 },
    {
      name: "asset_collector_account__assetId_index",
      background: true,
    }
  );
  await db.collection("asset_collector_account").createIndex(
    { address: 1, quantity: 1, assetId: 1 },
    {
      name: "asset_collector_account__address_quantity_assetId_index",
      background: true,
    }
  );

  console.log("Create db `asset_listing_entry` indices");
  await db.collection("asset_listing_entry").createIndex(
    { sellerAddress: 1, assetId: 1 },
    {
      name: "unique_asset_listing_entry__sellerAddress_assetId_index",
      unique: true,
      sparse: true,
      background: true,
    }
  );
  await db.collection("asset_listing_entry").createIndex(
    { assetId: 1 },
    {
      name: "asset_listing_entry__assetId_index",
      background: true,
    }
  );

  console.log("Create db `policy_royalty` indices");
  await db.collection("policy_royalty").createIndex(
    { policyId: 1 },
    {
      name: "unique_policy_royalty__policyId_index",
      unique: true,
      sparse: true,
      background: true,
    }
  );

  console.log("Create db `cardano_transactions` indices");
  await db.collection("cardano_transactions").createIndex(
    { hash: 1 },
    {
      name: "cardano_transactions__hash_index",
      background: true,
    }
  );

  console.log("Create db `transaction_tracking` indices");
  await db.collection("transaction_tracking").createIndex(
    { hash: 1 },
    {
      name: "transaction_tracking__hash_index",
      background: true,
    }
  );
  await db.collection("transaction_tracking").createIndex(
    { blockHeight: -1 },
    {
      name: "transaction_tracking__blockHeight_index",
      background: true,
    }
  );

  console.log("Create db `total_volume` indices");
  await db.collection("total_volume").createIndex(
    { "data.policyId": 1 },
    {
      name: "unique_total_volume__type_policyId_index",
      background: true,
      unique: true,
    }
  );

  console.log("Create db `blockfrost_usage` indices");
  await db.collection("blockfrost_usage").createIndex(
    { day: 1 },
    {
      name: "blockfrost_usage__day_index",
      background: true,
    }
  );

  console.log("Create db `policy_detail_info` indices");
  await db.collection("policy_detail_info").createIndex(
    { policyId: 1 },
    {
      name: "unique_policy_detail_info__policyId_index",
      background: true,
      unique: true,
    }
  );
  await db.collection("policy_detail_info").createIndex(
    { primaryCollectionId: 1 },
    {
      name: "policy_detail_info__primaryCollectionId_index",
      background: true,
    }
  );
}

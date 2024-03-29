import { warn } from '@johnkcr/temple-lib/dist/utils/logger';

const getEnvironmentVariable = (name: string, required = true) => {
  const variable = process.env[name];
  if (required && !variable) {
    // Throw new Error(`Missing environment variable ${name}`);
  }
  return variable;
};

export const TEST_ROOT = getEnvironmentVariable('firestoreTestRoot', false) ?? 'testRoot';
export const COVALENT_API_KEY = getEnvironmentVariable('covalentKey');
export const UNMARSHALL_API_KEY = getEnvironmentVariable('unmarshalKey');
export const ALCHEMY_JSON_RPC_ETH_MAINNET = getEnvironmentVariable('alchemyJsonRpcEthMainnet');
export const ALCHEMY_NFT_BASE_URL_ETH_MAINNET = getEnvironmentVariable('alchemyNftAPiBaseUrlEth');
export const ALCHEMY_NFT_BASE_URL_POLYGON_MAINNET = getEnvironmentVariable('alchemyNftAPiBaseUrlPolygon');
export const OPENSEA_API_KEY = getEnvironmentVariable('openseaKey');
export const TWITTER_BEARER_TOKEN = getEnvironmentVariable('twitterBearerToken');
export const ETHERSCAN_API_KEY = getEnvironmentVariable('etherscanApiKey');
export const ICY_TOOLS_API_KEY = getEnvironmentVariable('icyToolsApiKey');

export const TRACE_LOG = getEnvironmentVariable('TRACE_LOG', false) === 'true';
export const INFO_LOG = getEnvironmentVariable('INFO_LOG', false) === 'true';
export const ERROR_LOG = getEnvironmentVariable('ERROR_LOG', false) === 'true';
export const WARN_LOG = getEnvironmentVariable('WARN_LOG', false) === 'true';

/**
 * USE LIB firestoreConstants instead of this
 */
const fstr = {
  ROOT_COLL: TEST_ROOT,
  INFO_DOC: 'info',
  COLLECTIONS_COLL: 'collections',
  USERS_COLL: 'users',
  LISTINGS_COLL: 'listings',
  ASSETS_COLL: 'assets',
  TXNS_COLL: 'txns',
  FEATURED_COLL: 'featuredCollections',
  TWITTER_COLL: 'twitter',
  TWEETS_COLL: 'tweets',
  MENTIONS_COLL: 'mentions',
  HISTORICAL_COLL: 'historical',
  VOTES_COLL: 'votes',
  COLLECTION_STATS_COLL: 'stats',
  COLLECTION_LINKS_DOC: 'links',
  COLLECTION_DATA_COLL: 'data',
  // COLLECTION_SOCIALS_COLL: 'socials',
  COLLECTION_TWITTER_DOC: 'twitter',
  COLLECTION_DISCORD_DOC: 'discord',
  AUTH_COLL: 'auth',
  EDITORS_DOC: 'editors',
  CREATOR_DOC: 'creator',
  COLLECTION_FOLLOWS_COLL: 'collectionFollows',
  USER_FOLLOWS_COLL: 'userFollows'
};

/**
 * Deprecate access to an object (i.e. logs the warning message anytime the object is accessed)
 *
 */
export function deprecateObject<T extends object>(obj: T, message: string): T {
  const handler = {
    get(target: T, prop: string) {
      warn(message);
      return Reflect.get(target, prop);
    }
  };

  return new Proxy(obj, handler);
}

export const fstrCnstnts = deprecateObject(
  fstr,
  'fstrCnstnts is deprecated, prefer to use firestoreConstants from @johnkcr/temple-lib'
);

export const auth = {
  signature: 'x-auth-signature',
  message: 'x-auth-message'
};

export const API_BASE = 'http://localhost:9090';
export const SITE_BASE = 'http://localhost:3000';

export const POLYGON_WYVERN_EXCHANGE_ADDRESS = '0xbfbf0bd8963fe4f5168745ad59da20bf78d6385e';
export const WYVERN_EXCHANGE_ADDRESS = '0x7be8076f4ea4a4ad08075c2508e481d6c946d12b';

export const WYVERN_ATOMIC_MATCH_FUNCTION = 'atomicMatch_';
export const NULL_HASH = '0x0000000000000000000000000000000000000000000000000000000000000000';
export const NULL_ADDRESS = '0x0000000000000000000000000000000000000000';

export const OPENSEA_API = 'https://api.opensea.io/api/v1/';

export const DEFAULT_ITEMS_PER_PAGE = 50;
export const DEFAULT_MIN_ETH = 0.0000001;
export const DEFAULT_MAX_ETH = 1000000; // For listings

export const TEMPLE_EMAIL = 'john@universe.xyz';
export const FB_STORAGE_BUCKET = 'temple-350517.appspot.com';
//export const FB_STORAGE_BUCKET = getEnvironmentVariable('FB_STORAGE_BUCKET');

export const FIREBASE_SERVICE_ACCOUNT = 'firebase-dev.json';
export const ORIGIN = /http:\/\/localhost:\d+/;
export const TEMPLE_URL = 'https://temple.universe.xyz/';

export const ONE_HOUR = 3_600_000; // In ms
export const ONE_DAY = ONE_HOUR * 24;
export const MIN_TWITTER_UPDATE_INTERVAL = ONE_HOUR; // In ms
export const MIN_DISCORD_UPDATE_INTERVAL = ONE_HOUR;
export const MIN_LINK_UPDATE_INTERVAL = ONE_HOUR;
export const MIN_COLLECTION_STATS_UPDATE_INTERVAL = ONE_HOUR / 4; // 15 min

export const WETH_ADDRESS = '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2';
export const POLYGON_WETH_ADDRESS = '0x7ceb23fd6bc0add59e62ac25578270cff1b9f619';

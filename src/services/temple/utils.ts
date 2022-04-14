import { ListingMetadata } from '@johnkcr/temple-lib/dist/types/core';
import { error, log } from '@johnkcr/temple-lib/dist/utils';

export function getAssetAsListing(docId: string, data: any) {
  log('Converting asset to listing');
  try {
    const listings: Array<ListingMetadata & { id: string }> = [];
    const listing = data;
    listing.id = docId;
    listings.push(listing);
    const resp = {
      count: listings.length,
      listings
    };
    return resp;
  } catch (err: any) {
    error('Failed to convert asset to listing');
    error(err);
  }
}

export function getEmptyUserProfileInfo() {
  return {
    email: {
      address: '',
      verified: false,
      subscribed: false
    }
  };
}

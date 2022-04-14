import { FeedEventType } from '@johnkcr/temple-lib/dist/types/core/feed';

export enum ActivityType {
  Sale = 'sale'
  // Listing = 'listing'
  // Offer = 'offer'
}

export const activityTypeToEventType = {
  [ActivityType.Sale]: FeedEventType.NftSale
};

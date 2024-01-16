export type RecentSearches = RecentSearch[];

export type RecentSearch = {
  id: string;
  keyword?: string;
  type: "keyword" | "contact";
  creator?: RecentSearchContact;
};

export interface RecentSearchContact {
  id?: string;
  address?: string;
  image_url?: string;
}

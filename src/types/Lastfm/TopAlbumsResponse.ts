export type getTopAlbumsResponse = TopAlbumsResponse;

export interface TopAlbumsResponse {
  topalbums: Topalbums;
}

export interface Topalbums {
  album: Album[];
  "@attr": RequestAttr;
}

export interface Album {
  artist: Artist;
  image: Image[];
  mbid: string;
  url: string;
  playcount: string;
  "@attr": AlbumAttr;
  name: string;
}

export interface Artist {
  url: string;
  name: string;
  mbid: string;
}

export interface Image {
  size: string;
  "#text": string;
}

export interface AlbumAttr {
  rank: string;
}

export interface RequestAttr {
  user: string;
  totalPages: string;
  page: string;
  total: string;
  perPage: string;
}

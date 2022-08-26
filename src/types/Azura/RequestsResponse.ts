export type getRequestsResponse = AzuraRequest[];

export interface AzuraRequest {
  request_id: string;
  request_url: string;
  song: Song;
}

export interface Song {
  id: string;
  text: string;
  artist: string;
  title: string;
  album: string;
  genre: string;
  isrc: string;
  lyrics: string;
  art: string;
  custom_fields: any[];
}

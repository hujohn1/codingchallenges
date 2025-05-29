export interface ProfileData {
  country: string;
  display_name: string;
  email: string;
  id: string;
}

export interface PlaylistData{
  href: string,
  limit: number,
  next: string,
  offset: number,
  previous: string,
  total: number,
  items: [
    {
      collaborative: boolean,
      description: string,
      external_urls: {
        spotify: string
      },
      href: string,
      id: string,
      images: [
        {
          url: string,
          height: number,
          width: number
        }
      ],
      name: "string",
      owner: {
        external_urls: {
          spotify: string
        },
        href: string,
        id: string,
        type: string,
        uri: string,
        display_name: string
      },
      public: boolean,
      snapshot_id: string,
      tracks: {
        href: string,
        total: 0
      },
      type: string,
      uri: string
    }
  ]
}
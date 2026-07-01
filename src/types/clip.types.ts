export interface Clip {
  clipId: string;
  profileId: string;

  title: string;
  clipUrl: string;
  uploadedAt: string;

  username: string;
  avatar: string;
  role: string;

}

export interface GetAllClipsResponse {
  success: boolean;
  message: string;
  total: number;
  data: Clip[];
}
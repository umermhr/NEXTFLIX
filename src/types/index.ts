import { AxiosRequestConfig, AxiosResponse } from "axios";
import { IconType } from "react-icons";

export interface SliderButtonProps {
  isRight: boolean;
}

export interface ButtonProps {
  filled?: boolean;
  label?: string;
  Icon: IconType;
  rounded?: boolean;
  onClick?: () => void;
  hidden?: boolean;
}
export interface CardsProps {
  defaultCard?: boolean;
  removeMovie?: (id: number) => void;
  item: Media;
  mediaType?: string;
  enableGenres?: boolean;
}

export enum MediaType {
  MOVIE = "movie",
  TV = "tv",
}

export interface Genre {
  id: number;
  name: string;
}

export interface Media {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
  key?: string;
  type?: string;
  genres?: Genre[];
}

export interface Video {
  id: string;
  key: string;
  type: string;
  name: string;
  site: string;
}

export interface MediaItem {
  id: number;
  type: "movie" | "tv";
  title: string;
}

export interface MoviesResponse {
  page: number;
  total_results: number;
  total_pages: number;
  genres?: Genre[];
  results: Media[];
}

export interface MovieSectionProps {
  heading: string;
  endpoint: string;
  loading?: boolean;
  setLoading?: (loading: boolean) => void;
}

export interface RenderGenreProps {
  genreIds: number[];
}

export interface AxiosErrorType {
  code?: string;
  config: AxiosRequestConfig;
  message: string;
  name: string;
  request?: XMLHttpRequest;
  response?: AxiosResponse;
  status?: number;
  stack?: string;
}

export interface RequestError extends Error {
  status?: number;
  details?: unknown;
}

export interface ApiResponse<T> {
  data?: T;
  error?: RequestError | undefined;
}

export interface SpinnerContextProps {
  loading: boolean;
  setLoading: (loading: boolean) => void;
  error: string | null;
  setError: (error: string | null) => void;
}

export interface ChildrenProvider {
  children: React.ReactNode;
}

export interface ModalProps {
  modalData: Media;
  modalOpen: boolean;
  enableGenres: boolean;
  handleClose: () => void;
}

export interface Video {
  id: string;
  key: string;
  type: string;
  name: string;
  site: string;
}

export interface SimilarMediaProps {
  id: number;
}

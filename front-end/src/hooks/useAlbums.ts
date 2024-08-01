import { useState, useEffect, useCallback } from "react";
import apiService from "../api/apiService";

export interface Artist {
  id: number;
  name: string;
  genre: string;
  created_at: string;
  updated_at: string;
}

export interface Album {
  id: number;
  title: string;
  artist_id?: number;
  release_year?: number;
  label?: string | null;
  created_at: string;
  updated_at: string;
  artist?: Artist;
}

export const useAlbums = () => {
  const [albums, setAlbums] = useState<Album[]>([]);
  const [artists, setArtists] = useState<Artist[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAlbums = useCallback(async () => {
    setLoading(true);
    try {
      const response = await apiService.get("/api/albums");
      setAlbums(response.data.data);
    } catch (error: any) {
      setError(error.response?.data?.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchArtistsFromApi = useCallback(async () => {
    setLoading(true);
    try {
      const response = await apiService.get("/api/artists");
      setArtists(response.data.data);
    } catch (error: any) {
      setError(error.response?.data?.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  }, []);

  const createAlbum = async (albumData: Omit<Album, 'id' | 'created_at' | 'updated_at'>) => {
    setLoading(true);
    try {
      const response = await apiService.post("/api/albums", albumData);
      setAlbums((prevAlbums) => [...prevAlbums, response.data.data]);
      return response.data.data;
    } catch (error: any) {
      setError(error.response?.data?.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const fetchAlbumById = async (id: number) => {
    setLoading(true);
    try {
      const response = await apiService.get(`/api/albums/${id}`);
      return response.data.data;
    } catch (error: any) {
      setError(error.response?.data?.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const updateAlbum = async (id: number, albumData: Partial<Omit<Album, 'id' | 'created_at' | 'updated_at'>>) => {
    setLoading(true);
    try {
      const response = await apiService.put(`/api/albums/${id}`, albumData);
      setAlbums((prevAlbums) =>
        prevAlbums.map((album) =>
          album.id === id ? response.data.data : album
        )
      );
      return response.data.data;
    } catch (error: any) {
      setError(error.response?.data?.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const deleteAlbum = async (id: number) => {
    setLoading(true);
    try {
      await apiService.delete(`/api/albums/${id}`);
      setAlbums((prevAlbums) =>
        prevAlbums.filter((album) => album.id !== id)
      );
    } catch (error: any) {
      setError(error.response?.data?.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAlbums();
    fetchArtistsFromApi();
  }, [fetchAlbums, fetchArtistsFromApi]);

  return {
    albums,
    artists,
    loading,
    error,
    createAlbum,
    fetchAlbumById,
    updateAlbum,
    deleteAlbum,
    fetchArtistsFromApi,
    fetchAlbums
  };
};

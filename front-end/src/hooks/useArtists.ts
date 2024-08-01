import { useState, useEffect, useCallback } from "react";
import apiService from "../api/apiService";

interface Artist {
  id: number;
  name: string;
  genre: string;
}

export const useArtists = () => {
  const [artists, setArtists] = useState<Artist[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchArtists = useCallback(async () => {
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

  const createArtist = async (artistData: Omit<Artist, 'id'>) => {
    setLoading(true);
    try {
      const response = await apiService.post("/api/artists", artistData);
      setArtists((prevArtists) => [...prevArtists, response.data.data]);
      return response.data.data;
    } catch (error: any) {
      setError(error.response?.data?.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const fetchArtistById = async (id: number) => {
    setLoading(true);
    try {
      const response = await apiService.get(`/api/artists/${id}`);
      return response.data.data;
    } catch (error: any) {
      setError(error.response?.data?.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const updateArtist = async (id: number, artistData: Partial<Omit<Artist, 'id'>>) => {
    setLoading(true);
    try {
      const response = await apiService.put(`/api/artists/${id}`, artistData);
      setArtists((prevArtists) =>
        prevArtists.map((artist) =>
          artist.id === id ? response.data.data : artist
        )
      );
      return response.data.data;
    } catch (error: any) {
      setError(error.response?.data?.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const deleteArtist = async (id: number) => {
    setLoading(true);
    try {
      await apiService.delete(`/api/artists/${id}`);
      setArtists((prevArtists) =>
        prevArtists.filter((artist) => artist.id !== id)
      );
    } catch (error: any) {
      setError(error.response?.data?.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArtists();
  }, [fetchArtists]);

  return {
    artists,
    loading,
    error,
    createArtist,
    fetchArtistById,
    updateArtist,
    deleteArtist,
  };
};

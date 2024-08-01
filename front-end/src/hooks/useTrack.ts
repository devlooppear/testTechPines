import { useState, useEffect, useCallback } from 'react';
import apiService from '../api/apiService';
import { Album } from './useAlbums';

export interface Track {
  id: number;
  title: string;
  album_ids?: number[];
  albums?: Album[] | null; 
}

export const useTrack = () => {
  const [tracks, setTracks] = useState<Track[]>([]);
  const [track, setTrack] = useState<Track | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTracks = useCallback(async () => {
    setLoading(true);
    try {
      const response = await apiService.get('/api/tracks');
      setTracks(response.data.data);
    } catch (error: any) {
      setError(error.response?.data?.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchTrackById = async (id: number) => {
    setLoading(true);
    try {
      const response = await apiService.get(`/api/tracks/${id}`);
      setTrack(response.data.data);
    } catch (error: any) {
      setError(error.response?.data?.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const createTrack = async (trackData: Omit<Track, 'id'>) => {
    setLoading(true);
    try {
      const response = await apiService.post('/api/tracks', trackData);
      setTracks((prevTracks) => [...prevTracks, response.data.data]);
    } catch (error: any) {
      setError(error.response?.data?.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const updateTrack = async (id: number, updatedData: Partial<Omit<Track, 'id'>>) => {
    setLoading(true);
    try {
      const response = await apiService.put(`/api/tracks/${id}`, updatedData);
      setTracks((prevTracks) =>
        prevTracks.map((track) => (track.id === id ? response.data.data : track))
      );
      setTrack(response.data.data);
    } catch (error: any) {
      setError(error.response?.data?.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const deleteTrack = async (id: number) => {
    setLoading(true);
    try {
      await apiService.delete(`/api/tracks/${id}`);
      setTracks((prevTracks) => prevTracks.filter((track) => track.id !== id));
    } catch (error: any) {
      setError(error.response?.data?.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTracks();
  }, [fetchTracks]); 

  return {
    tracks,
    track,
    loading,
    error,
    fetchTracks,
    fetchTrackById,
    createTrack,
    updateTrack,
    deleteTrack,
  };
};

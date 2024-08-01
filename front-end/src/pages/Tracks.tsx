import React, { useEffect, useState } from "react";
import { Track, useTrack } from "../hooks/useTrack";
import { FaRegTrashAlt, FaRegEdit } from "react-icons/fa";
import { useAlbums } from "../hooks/useAlbums";

const Tracks = () => {
  const { tracks, loading, error, fetchTracks, deleteTrack, updateTrack } =
    useTrack();

  const { albums, fetchAlbums } = useAlbums();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTrack, setEditingTrack] = useState<Track | null>(null);
  const [formValues, setFormValues] = useState<Partial<Track>>({});

  useEffect(() => {
    fetchTracks();
    fetchAlbums(); 
  }, [fetchTracks, fetchAlbums]);

  const handleDelete = async (id: number) => {
    if (window.confirm("Você tem certeza que deseja deletar esta faixa?")) {
      try {
        await deleteTrack(id);
        alert("Faixa deletada com sucesso.");
      } catch {
        alert("Ocorreu um erro ao deletar a faixa.");
      }
    }
  };

  const handleEdit = (track: Track) => {
    setEditingTrack(track);
    setFormValues({
      title: track.title,
      album_ids: track.album_ids || [],
    });
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setEditingTrack(null);
    setFormValues({});
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;

    if (type === "select-one") {
      const selectedValue = Number(value);
      setFormValues((prev) => ({
        ...prev,
        album_ids: selectedValue ? [selectedValue] : [],
      }));
    } else {
      setFormValues((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingTrack) {
      try {
        await updateTrack(editingTrack.id, formValues);
        alert("Faixa atualizada com sucesso.");
        handleModalClose();
      } catch {
        alert("Ocorreu um erro ao atualizar a faixa.");
      }
    }
  };

  return (
    <div className="flex justify-center items-center">
      <div className="flex flex-col justify-center items-center gap-5">
        <section className="bg-neutral-200 mt-8 w-[90vw] max-w-[1580px] rounded-md px-3 py-2 min-h-[60vh] text-neutral-800 my-3">
          <h2 className="text-xl font-semibold mb-4">Lista de Faixas</h2>

          {loading && <p>Carregando faixas...</p>}
          {error && <p className="text-red-500">Erro: {error}</p>}

          {!loading && !error && tracks.length === 0 && (
            <p>Nenhuma faixa encontrada.</p>
          )}

          {!loading && !error && tracks.length > 0 && (
            <ul className="space-y-4">
              {tracks.map((track) => (
                <li
                  key={track.id}
                  className="p-4 bg-white rounded-md shadow-md flex justify-between items-center"
                >
                  <div>
                    <h3 className="text-lg font-bold">{track.title}</h3>
                    <p>
                      <strong>Álbuns:</strong>{" "}
                      {track.albums && track.albums.length > 0
                        ? track.albums.map((album) => album.title).join(", ")
                        : "Nenhum álbum associado"}
                    </p>
                  </div>
                  <div className="flex space-x-2 mr-3 gap-2">
                    <button
                      onClick={() => handleEdit(track)}
                      className="text-blue-500 hover:text-blue-700"
                    >
                      <FaRegEdit size={20} />
                    </button>
                    <button
                      onClick={() => handleDelete(track.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <FaRegTrashAlt size={20} />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-md shadow-md max-w-md w-full">
            <h3 className="text-lg font-semibold mb-4">Editar Faixa</h3>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Título</label>
                <input
                  type="text"
                  name="title"
                  value={formValues.title || ""}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Álbum</label>
                <select
                  name="album_ids"
                  value={(formValues.album_ids || [])[0] || ""}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                >
                  <option value="">Selecione um álbum</option>
                  {albums.map((album) => (
                    <option key={album.id} value={album.id}>
                      {album.title}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={handleModalClose}
                  className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                >
                  Salvar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Tracks;

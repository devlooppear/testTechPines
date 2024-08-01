import { useState } from "react";
import { Album, useAlbums } from "../hooks/useAlbums";
import { FaRegTrashAlt, FaRegEdit } from "react-icons/fa";

const Discographies = () => {
  const { albums, artists, loading, error, deleteAlbum, updateAlbum } = useAlbums();
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [editingAlbum, setEditingAlbum] = useState<Album | null>(null);
  const [formValues, setFormValues] = useState<Omit<Album, 'id' | 'created_at' | 'updated_at'> | null>(null);
  const [selectedArtistId, setSelectedArtistId] = useState<number | null>(null);

  const handleDelete = async (id: number) => {
    if (window.confirm("Você tem certeza que deseja deletar este álbum?")) {
      setIsDeleting(true);
      try {
        await deleteAlbum(id);
        alert("Álbum deletado com sucesso.");
      } catch (err) {
        alert("Ocorreu um erro ao deletar o álbum.");
      } finally {
        setIsDeleting(false);
      }
    }
  };

  const handleEdit = (album: Album) => {
    setEditingAlbum(album);
    setFormValues({
      title: album.title,
      artist_id: album.artist_id,
      release_year: album.release_year,
      label: album.label,
    });
    setSelectedArtistId(album.artist_id || null);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setEditingAlbum(null);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev!, [name]: value }));
  };

  const handleArtistChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const artistId = parseInt(e.target.value, 10);
    setSelectedArtistId(artistId);
    setFormValues((prev) => ({ ...prev!, artist_id: artistId }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingAlbum) {
      try {
        await updateAlbum(editingAlbum.id, formValues!);
        alert("Álbum atualizado com sucesso.");
        handleModalClose();
      } catch (err) {
        alert("Ocorreu um erro ao atualizar o álbum.");
      }
    }
  };

  return (
    <>
      <div className="flex justify-center items-center">
        <div className="flex flex-col justify-center items-center gap-5">
          <section className="bg-neutral-200 mt-8 w-[90vw] max-w-[1580px] rounded-md px-3 py-2 min-h-[60vh] text-neutral-800 my-3">
            <h2 className="text-xl font-semibold mb-4">Discografia</h2>
            
            {loading && <p>Carregando álbuns...</p>}
            {error && <p className="text-red-500">Erro: {error}</p>}
            
            {!loading && !error && albums.length === 0 && (
              <p>Nenhum álbum encontrado.</p>
            )}
            
            {!loading && !error && albums.length > 0 && (
              <ul className="space-y-4">
                {albums.map((album) => (
                  <li key={album.id} className="p-4 bg-white rounded-md shadow-md flex justify-between items-center">
                    <div>
                      <h3 className="text-lg font-bold">{album.title}</h3>
                      <p><strong>Artista:</strong> {album?.artist?.name}</p>
                      <p><strong>Ano de Lançamento:</strong> {album.release_year}</p>
                    </div>
                    <div className="flex space-x-2 mr-3 gap-2">
                      <button 
                        onClick={() => handleEdit(album)} 
                        className="text-blue-500 hover:text-blue-700"
                      >
                        <FaRegEdit size={20} />
                      </button>
                      <button 
                        onClick={() => handleDelete(album.id)} 
                        className="text-red-500 hover:text-red-700"
                        disabled={isDeleting}
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
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-md shadow-md max-w-md w-full">
            <h3 className="text-lg font-semibold mb-4">Editar Álbum</h3>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Título</label>
                <input
                  type="text"
                  name="title"
                  value={formValues?.title || ''}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Artista</label>
                <select
                  name="artist_id"
                  value={selectedArtistId || ''}
                  onChange={handleArtistChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                >
                  <option value="">Selecione o Artista</option>
                  {artists.map((artist) => (
                    <option key={artist.id} value={artist.id}>
                      {artist.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Ano de Lançamento</label>
                <input
                  type="number"
                  name="release_year"
                  value={formValues?.release_year || ''}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Label</label>
                <input
                  type="text"
                  name="label"
                  value={formValues?.label || ''}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
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
    </>
  );
};

export default Discographies;

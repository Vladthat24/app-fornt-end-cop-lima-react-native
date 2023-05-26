import { BASE_API } from "../utils/constants";

export async function getEstudiosByCopApi(ncop,ntipoestudio) {
  try {
    const cop = ncop.toString();
    const tipoEstudio=ntipoestudio.toString();
    const url = `${BASE_API}/api/gradosacademicos/?idcop__cop=${cop}&idtipo_estudio__idtipo_estudio=${tipoEstudio}`;
    const response = await fetch(url);
    const result = await response.json();
    return result;
  } catch (error) {
    throw error;
  }
}

export async function getTipoEstudiosApi() {
    try {
      const url = `${BASE_API}/api/tipoestudio/`;
      const response = await fetch(url);
      const result = await response.json();
      return result;
    } catch (error) {
      throw error;
    }
  }

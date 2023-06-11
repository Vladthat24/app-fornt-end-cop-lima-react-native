import { BASE_API } from "../utils/constants";

export async function getRegistroApi(token, page, perPage) {
  try {
    const url = `${BASE_API}/api/registro/?page=${page}&page_size=${perPage}`;
    const params = {
      Headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await fetch(url, params);
    const result = await response.json();
    return result;
  } catch (error) {
    throw error;
  }
}

export async function getRegistroSearchPaginationApi(page,perPage,searchTerm){
  const url = `${BASE_API}/api/registro/?page=${page}&page_size=${perPage}&search=${searchTerm}`;
  const response = await fetch(url);
  const result=await response.json();
  return result;
}


export async function getTotalRegistrosApi(){
  try{
    const url=`${BASE_API}/api/registro/total/`;
    const response= await fetch(url);
    const result = await response.json();
    return result;
  }catch(error){
    throw error;
  }
}

export async function getColegiadoByCopApi(ncop) {
  try {
    const cop = `cop=${ncop}`;
    const url = `${BASE_API}/api/registro/?${cop}`;
    const response = await fetch(url);
    const result = await response.json();
    return result;
  } catch (error) {
    throw error;
  }
}

export async function updateImgQRApi(id, imgenQR,token) {
  try {
    const url = `${BASE_API}/api/registro/${id}/`;
    const params = {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        imagenqr:imgenQR
      })
    };
    const response=await fetch(url,params);
    const result=await response.json();
    console.log(response);
    return result;
    
  } catch (error) {
    throw error;
  }
}

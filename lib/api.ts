// lib/api.ts
export async function getBrands() {
  try {
    const res = await fetch("http://127.0.0.1:8000/brand/all/", {
      cache: "no-store",
    });

    if (!res.ok) {
      console.error("API ERROR:", res.status);
      return [];
    }

    const data = await res.json();
    return data.response || [];
  } catch (err) {
    console.error("FETCH ERROR:", err);
    return [];
  }
}


export async function getProductsByBrand(brandId: number) {
  try {
    const res = await fetch(
      `http://127.0.0.1:8000/brand/${brandId}/product/`,
      {
        cache: "no-store",
      }
    );

    if (!res.ok) {
      console.error("API ERROR:", res.status);
      return [];
    }

    const data = await res.json();
    return data.response || [];
  } catch (err) {
    console.error("FETCH ERROR:", err);
    return [];
  }
}



export async function createBrand(data: {
  name: string;
  description?: string;
  image?: File;
}) {
  const formData = new FormData();

  formData.append("name", data.name);
  if (data.description) formData.append("description", data.description);
  if (data.image) formData.append("image", data.image);

  const res = await fetch(`http://127.0.0.1:8000/brand/new/`, {
    method: "POST",
    body: formData,
  });

  return res.json();
}
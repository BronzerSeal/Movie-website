import localApi from "@/services/localApi";

export async function handleUpload(file: File, userId: string) {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("userId", userId);

  const res = await localApi.post("/api/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return res.data.url;
}

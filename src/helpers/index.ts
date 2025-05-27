import supabaseConfig from "../config/supabase-config";

export const updateFileToSupabaseAndGetUrl = async (file: File) => {
  try {
    const filePath = file.name + Date.now();
    const response = await supabaseConfig.storage
      .from("basic")
      .upload(filePath, file, {
        cacheControl: "3600",
        upsert: false,
      });
    if (response.error) {
      throw new Error(response.error.message);
    }
    const urlResponse : any =  supabaseConfig.storage.from("basic").getPublicUrl(filePath);
    if (urlResponse.error){
        throw new Error(urlResponse.error.message);
    }
    const publicUrl = urlResponse.data.publicUrl
    return publicUrl;
  } catch (error: any) {
    throw new Error("Error Uploading file to supabase: " + error.message);
  }
};

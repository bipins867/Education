const supabase = require("../supabaseClient");

exports.uploadFile = async (file, fileName) => {
  const { data, error } = await supabase.storage
    .from(process.env.SUPABASE_BUCCKET)
    .upload(fileName, file);

  if (error) {
    return error;
  } else {
    return data;
  }
};

exports.getFileUrl = async (fileName) => {
  const { data } = supabase.storage
    .from(process.env.SUPABASE_BUCCKET)
    .getPublicUrl(fileName);

  return data;
};

exports.getAllFiles = async (folder) => {
  const { data, error } = await supabase.storage
    .from(process.env.SUPABASE_BUCCKET)
    .list(folder);

  if (error) {
    return error;
  } else {
    return data;
  }
};

exports.downloadFile = async (fileName) => {
  const { data, error } = await supabase.storage
    .from(process.env.SUPABASE_BUCCKET)
    .download(fileName);

  if (error) {
    return error;
  } else {
    const url = URL.createObjectURL(data);
    return url;
  }
};

exports.deleteFile = async (fileName) => {
  const { data, error } = await supabase.storage
    .from(process.env.SUPABASE_BUCCKET)
    .remove([fileName]);

  if (error) {
    return error;
  } else {
    return data;
  }
};

exports.updateFile = async (file, fileName) => {
  await supabase.storage.from(process.env.SUPABASE_BUCCKET).remove([fileName]);

  await supabase.storage
    .from(process.env.SUPABASE_BUCCKET)
    .upload(fileName, file);
};

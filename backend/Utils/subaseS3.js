const { S3_FILE_PATH } = require("../importantInfo");
const supabase = require("../supabaseClient");

exports.uploadFile = async (file, fileName) => {
  const { data, error } = await supabase.storage
    .from(process.env.SUPABASE_BUCCKET)
    .upload(fileName, file.buffer, {
      contentType: file.mimetype,
    });

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
  const newFileName = fileName.replace(S3_FILE_PATH + "/", "");
  const { data, error } = await supabase.storage
    .from(process.env.SUPABASE_BUCCKET)
    .remove([newFileName]);

  if (error) {
    return error;
  } else {
    return data;
  }
};

exports.updateFile = async (file, fileName, oldFile) => {
  if (oldFile) {
    const newFileName = oldFile.replace(S3_FILE_PATH + "/", "");

    await supabase.storage
      .from(process.env.SUPABASE_BUCCKET)
      .remove([newFileName]);
  }

  const { data, error } = await supabase.storage
    .from(process.env.SUPABASE_BUCCKET)
    .upload(fileName, file.buffer, {
      contentType: file.mimetype,
    });

  if (error) {
    return error;
  } else {
    return data;
  }
};

const getUrlExtension = (url: string) => {
  return url.split(/[#?]/)[0].split(".").pop()?.trim();
};

const getFilename = (url: string) => {
  return url.split("/").pop();
};

export const imageUrlToFile = async (imgUrl: string) => {
  getUrlExtension(imgUrl)
  const response = await fetch(imgUrl);
  const blob = await response.blob();

  const filename = getFilename(imgUrl) || "default_filename";
  const file = new File([blob], filename, {
    type: blob.type,
  });

  return file;
};

export const formatRealm = (str: string): string => {
  // Remove all non-word characters
  let formattedStr = str.replace(/[^\w\s]/gi, "");

  // Replace all spaces with a hyphen
  formattedStr = formattedStr.replace(/\s+/g, "-");

  // Convert to lowercase
  formattedStr = formattedStr.toLowerCase();

  return formattedStr;
};

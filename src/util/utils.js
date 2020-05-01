export const shortenUrl = (longUrl) => {
    const result = longUrl
      .split("/")
      .filter((fragment) => fragment.includes("."))[0];    // console.log(result);

    return result;
  };

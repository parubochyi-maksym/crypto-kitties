import { useState, useEffect } from "react";
import axios from "axios";

const defaultImage =
  "https://storage.googleapis.com/ck-kitty-image/0x06012c8cf97bead5deae237070f9587f8e7a266d/317408.svg";

export default function useImageCheck(src) {
  const [url, setUrl] = useState();

  useEffect(() => {
    if (!src) return;
    let cancel;
    axios({
      url: src,
      cancelToken: new axios.CancelToken((c) => (cancel = c)),
    })
      .then((res) => setUrl(res.config.url))
      .catch((err) => {
        if (!axios.isCancel(err)) return setUrl(defaultImage);
      });
    return () => cancel();
  }, [src]);

  return url;
}

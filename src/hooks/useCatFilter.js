import { useEffect, useState } from "react";
import axios from "axios";
import { get_cats_api } from "../data/api";
import { per_page } from "../data/constants";

export default function useCatFilter(sortBy, pageNumber) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [cats, setCats] = useState([]);
  const [hasMore, setHasMore] = useState(false);

  useEffect(() => {
    setCats([]);
  }, [sortBy]);

  useEffect(() => {
    setLoading(true);
    setError(false);
    let cancel;
    axios({
      method: "GET",
      url: get_cats_api,
      params: { sort_by: sortBy, page: pageNumber, per_page },
      cancelToken: new axios.CancelToken((c) => (cancel = c)),
    })
      .then((res) => {
        setCats((prevCats) => {
          const uniqueId = [...new Set([...prevCats.map((c) => c.id)])];
          return [
            ...prevCats,
            ...res.data.cats.filter((c) => !uniqueId.includes(c.id)),
          ];
        });
        setHasMore(res.data.cats.length > 0);
        setLoading(false);
      })
      .catch((e) => {
        if (axios.isCancel(e)) return;
        setError(true);
      });
    return () => cancel();
  }, [sortBy, pageNumber]);

  return { loading, error, cats, hasMore };
}

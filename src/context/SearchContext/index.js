import {
  createContext,
  useContext,
  useState,
  useEffect,
  startTransition,
} from "react";
import { useQuery } from "react-query";
import getTracks from "../../api/getTracks";
import useUser from "../../hooks/useUser";

const SearchContext = createContext(null);

export const SearchProvider = ({ children }) => {
  const [input, setInput] = useState("");
  const [query, setQuery] = useState("");
  const [isFocus, setIsFocus] = useState(false);
  const { token } = useUser();
  const { isFetched, isLoading, data } = useQuery(
    ["playlist", query],
    () => getTracks(query, token),
    {
      enabled: !!token || !!query,
    }
  );
  const [tracks, setTracks] = useState(data?.tracks?.items);

  useEffect(() => {
    if (input) {
      startTransition(() => {
        setQuery(input);
      });
    }

    if (!input) {
      startTransition(() => {
        setTracks(() => []);
      });
    }

    if (data?.tracks?.items && input) {
      setTracks(() => data?.tracks?.items);
    }
  }, [input, query, data]);

  return (
    <SearchContext.Provider
      value={{
        input,
        setInput,
        query,
        setQuery,
        isFocus,
        setIsFocus,
        isFetched,
        isLoading,
        data,
        tracks,
        setTracks,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = () => useContext(SearchContext);

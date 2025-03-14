import { useLoaderData } from "react-router-dom";
import axios from "axios";
import CocktailList from "../components/CocktailList";
import SearchForm from "../components/SearchForm";
import { useQuery } from "@tanstack/react-query";

const cocktailSearchUrl =
  "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=";

// eslint-disable-next-line react-refresh/only-export-components
export const loader =
  (queryClient) =>
  async ({ request }) => {
    const url = new URL(request.url);
    const searchTerm = url.searchParams.get("search") || "a";
    // const response = await axios.get(`${cocktailSearchUrl}${searchTerm}`);
    await queryClient.ensureQueryData(searchCocktailQuery(searchTerm));
    return { searchTerm };
  };

const searchCocktailQuery = (searchTerm) => {
  return {
    queryKey: ["search", searchTerm || "all"],
    queryFn: async () => {
      searchTerm = searchTerm || "a";
      const response = await axios.get(`${cocktailSearchUrl}${searchTerm}`);
      return response.data.drinks;
    },
  };
};

const Landing = () => {
  const { searchTerm } = useLoaderData();
  const { data: drinks } = useQuery(searchCocktailQuery(searchTerm));

  return (
    <>
      <SearchForm searchTerm={searchTerm} />
      <CocktailList drinks={drinks} />
    </>
  );
};
export default Landing;

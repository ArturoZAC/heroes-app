import { useQuery } from "@tanstack/react-query";
import { getSummaryAction } from "../actions/getSummary.action";

export const useHeroSummary = () => {
  return useQuery({
    queryKey: ["summary-information"],
    queryFn: getSummaryAction,
    staleTime: 1000 * 60 * 5,
  });
};

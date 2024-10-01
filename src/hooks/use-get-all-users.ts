import { useQuery } from "@tanstack/react-query";

const useGetAllUsers = () => {
  const { data } = useQuery({
    queryKey: ["getdata"],
    queryFn: () =>
      fetch("http://localhost:8080/api/get-all-users").then((res) =>
        res.json()
      ),
  });
  return { data };
};

export default useGetAllUsers;

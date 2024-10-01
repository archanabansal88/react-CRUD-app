import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UserType, ResponseType } from "../type";

const useCreateNewUser = () => {
  const queryClient = useQueryClient();

  const addUser = async (user: UserType): Promise<ResponseType> => {
    const response = await fetch("http://localhost:8080/api/add-user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    if (!response) {
      throw new Error("Failed to create post");
    }
    const data: ResponseType = await response.json();
    return data;
  };

  const createNewUserMutation = useMutation({
    mutationFn: addUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getdata"] });
    },
  });

  return { createNewUserMutation };
};

export default useCreateNewUser;

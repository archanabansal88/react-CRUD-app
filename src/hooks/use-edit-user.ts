import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UserType, ResponseType } from "../type";

const useUpdateUser = () => {
  const queryClient = useQueryClient();
  const updateUserMutation = useMutation({
    mutationFn: async (user: UserType): Promise<ResponseType> => {
      const response = await fetch(`/api/update-user`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      if (!response) {
        throw new Error("Failed to update user");
      }
      const data: ResponseType = await response.json();
      return data;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getdata"] });
    },
  });

  return { updateUserMutation };
};

export default useUpdateUser;

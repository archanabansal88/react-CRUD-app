import { useMutation, useQueryClient } from "@tanstack/react-query";

const useDeleteUser = () => {
  const queryClient = useQueryClient();
  const deleteUserMutation = useMutation({
    mutationFn: async (id: number): Promise<ResponseType> => {
      const response = await fetch(`/api/delete-user/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete item");
      }

      const data: ResponseType = await response.json();
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getdata"] });
    },
  });

  return { deleteUserMutation };
};

export default useDeleteUser;

import AddUserForm from "./components/add-user-form";
import UserTable from "./components/user-table";
import styled from "styled-components";
import "./App.css";
import useCreateNewUser from "./hooks/use-create-user";
import useGetAllUsers from "./hooks/use-get-all-users";
import useDeleteUser from "./hooks/use-delete-user";
import useUpdateUser from "./hooks/use-edit-user";
import { UserType } from "./type";
import { useState } from "react";

const Wrapper = styled.div`
  display: flex;
  width: 1000px;
  margin: auto;
  justify-content: center;
  flex-direction: column;
`;

function App() {
  const initialData = { id: null, name: "", username: "" };
  const [selectedUser, setSelectedUser] = useState<UserType>(initialData);
  const { createNewUserMutation } = useCreateNewUser();
  const { data } = useGetAllUsers();
  const { deleteUserMutation } = useDeleteUser();
  const { updateUserMutation } = useUpdateUser();

  const addNewUser = (user: UserType) => {
    createNewUserMutation.mutate({
      ...user,
      id: data.length === 0 ? 1 : data[data.length - 1].id + 1,
    });
  };

  const updateUser = (user: UserType) => {
    updateUserMutation.mutate(user);
    setSelectedUser(initialData);
  };

  const editSelectedUser = (user: UserType) => {
    setSelectedUser(user);
  };

  const deleteUser = (id: number | null) => {
    if (id) {
      deleteUserMutation.mutate(id);
    }
  };

  return (
    <Wrapper>
      <h1>CRUD App with Hooks</h1>
      <div className="container">
        <div className="user-form">
          <h2>Add User</h2>
          <AddUserForm
            addNewUser={addNewUser}
            editUser={selectedUser}
            updateUser={updateUser}
          />
        </div>
        <div className="user-table">
          <h2>View User</h2>
          <UserTable
            users={data}
            editUser={editSelectedUser}
            deleteUser={deleteUser}
          />
        </div>
      </div>
    </Wrapper>
  );
}

export default App;

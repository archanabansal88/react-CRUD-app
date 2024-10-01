import { UserType } from "../type";

type UserDataProps = {
  users: Array<UserType>;
  editUser: (user: UserType) => void;
  deleteUser: (id: number | null) => void;
};

const UserTable = ({ users, editUser, deleteUser }: UserDataProps) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Username</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {users &&
          users.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.username}</td>
              <td>
                <button onClick={() => editUser(user)}>Edit</button>
                <button onClick={() => deleteUser(user.id)}>Delete</button>
              </td>
            </tr>
          ))}
      </tbody>
    </table>
  );
};

export default UserTable;

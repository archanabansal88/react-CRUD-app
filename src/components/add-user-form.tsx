import { useEffect, useState } from "react";
import { UserType } from "../type";

type AddUserProps = {
  addNewUser: (user: UserType) => void;
  editUser: UserType;
  updateUser: (user: UserType) => void;
};

const AddUserForm = ({ addNewUser, editUser, updateUser }: AddUserProps) => {
  const initialData = { id: null, name: "", username: "" };
  const [user, setUser] = useState<UserType>(initialData);

  useEffect(() => {
    if (editUser.id) {
      setUser(editUser);
    }
  }, [editUser]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  };

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    if (!user.name || !user.username) return;
    editUser.id ? updateUser(user) : addNewUser(user);
    setUser(initialData);
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <div className="user-details">
        <label>Name</label>
        <input
          type="text"
          name="name"
          value={user.name}
          onChange={handleChange}
        />
      </div>
      <div className="user-details">
        <label>Username</label>
        <input
          type="text"
          name="username"
          value={user.username}
          onChange={handleChange}
        />
      </div>
      <div>
        {editUser.id ? (
          <button>Edit User</button>
        ) : (
          <button>Add new User</button>
        )}
      </div>
    </form>
  );
};

export default AddUserForm;

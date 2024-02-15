import { EmailProps } from "@/interfaces/emailProps";
import { UserRolesProps } from "@/interfaces/userRolesProps";
import style from "@/styles/InviteInputField.module.scss";

export const TableData = ({
  email,
  userRoles,
  handleChange,
  handleDelete,
  defaultRole,
}: {
  email: EmailProps;
  userRoles: UserRolesProps[];
  handleChange: Function;
  handleDelete: Function;
  defaultRole: string;
}): JSX.Element => {
  return (
    <tr>
      <td>{email.email}</td>
      <td>
        <select
          name='Role'
          onChange={(e) => handleChange(email.email, e.currentTarget.value)}
        >
          {userRoles.map((role) => (
            <option
              value={role.id}
              selected={role.id === defaultRole}
              key={role.id}
            >
              {role.title}
            </option>
          ))}
        </select>
      </td>
      <td>
        <button
          type='button'
          className={style.button}
          onClick={() => handleDelete(email)}
        >
          &times;
        </button>
      </td>
    </tr>
  );
};

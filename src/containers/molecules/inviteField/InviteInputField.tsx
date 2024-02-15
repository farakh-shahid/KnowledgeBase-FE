import React, { useEffect, useState } from 'react';
import style from '@/styles/InviteInputField.module.scss';
import { getAllRoles } from '@/services/api/roleService';
import { UserRolesProps } from '@/interfaces/userRolesProps';
import { TableData } from '../tableData/TableData';
import { EmailProps } from '@/interfaces/emailProps';
import { PLACEHOLDER } from '@/constants';

const InviteInputField = ({
  emails,
  setEmails,
}: {
  emails: EmailProps[];
  setEmails: React.Dispatch<React.SetStateAction<EmailProps[]>>;
}) => {
  const [value, setValue] = useState('');
  const [error, setError] = useState('');
  const [roles, setRoles] = useState<UserRolesProps[]>([]);
  const [defaultRole, setDefaultRole] = useState<string>('');
  const handleKeyDown = (evt: any) => {
    if (['Enter', 'Tab', ','].includes(evt.key)) {
      evt.preventDefault();
      let email = value.trim();
      const EmailTOAdd = {
        roleId: defaultRole,
        email: email,
      };
      if (value && isValid(value)) {
        setEmails([...emails, EmailTOAdd]);
        setValue('');
        setError('');
      }
    }
  };
  const getDefaultRole = () => {
    return roles.find((role) => {
      return role.title === 'TEST_ROLE';
    });
  };
  const handleChange = (evt: any) => {
    setValue(evt.target.value);
  };

  const handleDelete = (item: EmailProps) => {
    setEmails(emails.filter((i) => i.email !== item.email));
  };

  const isValid = (email: string) => {
    let error = null;
    if (isInList(email)) {
      error = `${email} has already been added.`;
    }
    if (!isEmail(email)) {
      error = `${email} is not a valid email address.`;
    }
    if (!email.includes('devsinc.com')) {
      error = `You cannot invite ${email}`;
    }
    if (error) {
      setError(error);
      return false;
    }
    return true;
  };

  const isInList = (emailToCheck: string) => {
    return emails.some((email) => email.email === emailToCheck);
  };

  const isEmail = (email: string) => {
    return /[\w\d\.-]+@[\w\d\.-]+\.[\w\d\.-]+/.test(email);
  };
  const updateRole = (email: string, role: string) => {
    const data = [...emails];
    const index = data.findIndex((obj) => {
      return obj.email === email;
    });
    data[index].roleId = role;
    setEmails([...data]);
  };

  useEffect(() => {
    const getUserRoles = async () => {
      try {
        const res = await getAllRoles();
        if (res.data) {
          setRoles(res.data);
          setTimeout(() => setDefaultRole(getDefaultRole()?.id as string), 100);
        }
      } catch (error) {}
    };
    getUserRoles();
  }, []);

  return (
    <div className={style.wrapper}>
      {emails.length > 0 ? (
        <table>
          <tr>
            <th>Email</th>
            <th>Role</th>
          </tr>
          {emails.map((item, index) => {
            return (
              <TableData
                email={item}
                key={index}
                userRoles={roles}
                handleChange={updateRole}
                handleDelete={handleDelete}
                defaultRole={defaultRole}
              />
            );
          })}
        </table>
      ) : null}
      <input
        className={style.input}
        placeholder={PLACEHOLDER.INVITE_EMAIL}
        value={value}
        onKeyDown={handleKeyDown}
        onChange={handleChange}
      />
      {error && <p className={style.error}>{error}</p>}
    </div>
  );
};

export default InviteInputField;

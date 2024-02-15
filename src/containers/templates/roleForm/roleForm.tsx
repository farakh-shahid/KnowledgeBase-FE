import { Checkbox, CheckboxGroup } from 'rsuite';
import { Modal } from 'rsuite';
import React, { useContext, useEffect } from 'react';
import InputField from '@/containers/atoms/inputField/InputField';
import Button from '@/containers/atoms/button/Button';
import { colors } from '@/assets/colors';
import styles from '@/styles/rolePage.module.scss';
import style from '@/styles/roleForm.module.scss';
import InfoOutlineIcon from '@rsuite/icons/InfoOutline';
import { Popover, Whisper } from 'rsuite';
import Divider from '@/containers/atoms/divider/Divider';
import { toast } from 'react-toastify';
import { checkObjectArrayAllEmpty } from '@/utils';
import { Permissions, Data } from '@/interfaces/rolePermissions';
import Check from '@/containers/atoms/checkBox/checkBox';
import { createRole, updateRole } from '@/services/api/roleService';
import { StoreContextState, StoreContext } from '@/contextStore/storeProvider';
import {
  roles,
  INPUT_TYPES,
  PLACEHOLDER,
  MESSAGES,
  PERMISSIONS_HEADER,
  LABELS,
} from '@/constants';

const RoleForm = (props: any) => {
  const { openModal, onClose, label, roleId } = props;
  const store = useContext<StoreContextState>(StoreContext);
  const [user] = store.user;
  const [title, setTitle] = React.useState('');
  const [permissions, setPermissions] = React.useState<Permissions>({});
  const [checkAll, setCheckAll] = React.useState<boolean>(false);
  const handleChange = (value: any, name: string) => {
    const updatedPermissions = { ...permissions };
    updatedPermissions[name] = value;
    setPermissions(updatedPermissions);
  };

  const addRole = async () => {
    const allPermissionsEmpty = permissions
      ? checkObjectArrayAllEmpty(permissions)
      : true;
    if (title === '' && allPermissionsEmpty) {
      toast.warn(MESSAGES.PERMISSION_TITLE_NOT_SET, {
        autoClose: 2000,
      });
    } else {
      const data: Data = {
        createdBy: user?.id as string,
        title: title,
        permissions: {},
        tenantId: user?.tenantId || '64393844c29bf29c7d244f41',
      };

      for (const key in permissions) {
        if (permissions[key] && permissions[key].length > 0) {
          data.permissions[key] = permissions[key];
        }
      }

      if (roleId) {
        try {
          const res = await updateRole(roleId, data);
          if (res) {
            onClose();
            toast.success(MESSAGES.UPDATED_SUCCESSFULLY);
          }
        } catch (error) {
          toast.error(MESSAGES.CANNOT_UPDATE);
        }
      } else {
        try {
          const res = await createRole(data);
          if (res) {
            onClose();
            toast.success(MESSAGES.CREATED_SUCCESSFULLY);
          }
        } catch (error) {
          toast.error(MESSAGES.CANNOT_CREATE);
        }
      }
    }
  };

  const handleCheckAll = (checked: boolean, name: string) => {
    setPermissions((prevPermissions) => ({
      ...prevPermissions,
      [name]: checked ? PERMISSIONS_HEADER : [],
    }));
  };

  const handleCheckAllChange = () => {
    const newCheckAll = !checkAll;
    setCheckAll(newCheckAll);
    roles.forEach((role) => handleCheckAll(newCheckAll, role.key));
  };

  useEffect(() => {
    if (roleId) {
      setTitle(props.roleTitle);
      setPermissions(props.rolePermissions);
    }
  }, [roleId]);

  return (
    <>
      <div className={styles.main__container}>
        <Modal open={openModal} onClose={onClose} backdrop="static" size="lg">
          <Modal.Header>
            <Modal.Title>{label}</Modal.Title>
            <span className={styles.label__footer}>Set Role & Permissions</span>
          </Modal.Header>
          <Modal.Body>
            <InputField
              placeholder={PLACEHOLDER.ADD_ROLE_TITLE_HERE}
              type={INPUT_TYPES.TEXT}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            <h6 className={styles.heading}>
              Role & Permissions{' '}
              <Whisper
                followCursor
                speaker={<Popover>Set Administrative Permissions </Popover>}
              >
                <InfoOutlineIcon />
              </Whisper>
            </h6>
            <div className={style.modalBody__parent}>
              <div className={styles.checkAll}>
                <div className={styles.checkAll__heading}>
                  <p>
                    Administrative Privileges
                    <br />
                  </p>
                </div>
                <div className={styles.checkAll__checkBox}>
                  <Check
                    onChange={handleCheckAllChange}
                    checked={roles.every(
                      (role) => permissions[role.key]?.length === 4
                    )}
                    label={LABELS.CHECK_ALL}
                  />
                </div>
              </div>
              <div className={styles.checkAll__permission__heading}>
                {PERMISSIONS_HEADER.map((check, index) => (
                  <p key={index} className={styles.chip}>
                    {check}
                  </p>
                ))}
              </div>
            </div>
            <Divider />

            <div className={style.main__check}>
              {roles.map((role) => (
                <>
                  <div className={styles.check__boxes} key={role.key}>
                    <p className={style.roles__name}>{role.name}</p>

                    {PERMISSIONS_HEADER.map((check) => {
                      const checkedPermissions = permissions[role.key] || [];
                      const isChecked = checkedPermissions.includes(check);

                      const handleChange = () => {
                        if (isChecked) {
                          const updatedPermissions = checkedPermissions.filter(
                            (permission) => permission !== check
                          );
                          setPermissions((prevPermissions) => ({
                            ...prevPermissions,
                            [role.key]: updatedPermissions,
                          }));
                        } else {
                          setPermissions((prevPermissions) => ({
                            ...prevPermissions,
                            [role.key]: [...checkedPermissions, check],
                          }));
                        }
                      };

                      return (
                        <Check
                          key={check}
                          checked={isChecked}
                          onChange={handleChange}
                        />
                      );
                    })}
                  </div>
                </>
              ))}
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button
              label={roleId ? LABELS.UPDATE_ROLE : LABELS.ADD_ROLE}
              backgroundColor={colors.bg.Java}
              color={colors.bg.white}
              onClick={() => addRole()}
            />
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
};
export default RoleForm;

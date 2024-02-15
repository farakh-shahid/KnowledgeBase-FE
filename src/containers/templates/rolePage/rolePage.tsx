import React, { useEffect, useState } from 'react';
import styles from '@/styles/rolePage.module.scss';
import Button from '@/containers/atoms/button/Button';
import { LABELS, MESSAGES } from '@/constants';
import Header from '@/containers/organisms/header/Header';
import 'rsuite/dist/rsuite.min.css';
import { colors } from '@/assets/colors';
import RoleForm from '../roleForm/roleForm';
import RoleTable from '@/containers/organisms/roleTable/roleTable';
import { getRolesByPagination } from '@/services/api/roleService';
import { toast } from 'react-toastify';
import { RolesData } from '@/interfaces/rolePermissions';

const RolePage = () => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [roleData, setRoleData] = useState<RolesData>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const handleOPenModal = () => {
    setOpenModal(true);
  };
  const onClose = () => {
    setOpenModal(false);
  };

  const getRoleData = async () => {
    try {
      const res = await getRolesByPagination(0);
      if (res.data) {
        setRoleData(res.data);
        setIsLoading(false);
      }
    } catch (error) {
      toast.error(MESSAGES.ERROR_WHILE_LOADING_DATA);
    }
  };

  useEffect(() => {
    getRoleData();
  }, []);

  return (
    <>
      <Header />
      <div className={styles.container}>
        <div className={styles.circle}></div>
        <div className={styles.role__heading}>
          <h4>Role Management</h4>
        </div>
        <div className={styles.role__button}>
          <div className={styles.button}>
            <Button
              label={LABELS.ADD_ROLE}
              width="100px"
              backgroundColor={colors.bg.Tarawera}
              onClick={handleOPenModal}
            />
          </div>
          <span className={styles.text__belowButton}>
            Add role, if id doesn&apos;t exist.
          </span>
        </div>
        <div className={styles.circle2}></div>
      </div>
      {openModal && (
        <>
          <RoleForm
            openModal={openModal}
            onClose={onClose}
            label={LABELS.ADD_ROLE}
          />
        </>
      )}

      <div className={styles.table}>
        <RoleTable
          roleData={roleData as RolesData}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
        />
      </div>
    </>
  );
};
export default RolePage;

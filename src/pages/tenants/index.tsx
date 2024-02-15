import Header from '@/containers/organisms/header/Header';
import style from '@/styles/TenantsPage.module.scss';
import Button from '@/containers/atoms/button/Button';
import { colors } from '@/assets/colors';
import { useEffect, useState } from 'react';
import TenantModalForm from '@/containers/templates/tenantsForm/tenantsForm';
import TableCell from '@/containers/organisms/table/tenantTable';
import { Tenant, TenantsData } from '@/interfaces/tenantsTableData';
import { getTenants } from '@/services/api/tenantsService';
import { LABELS, MESSAGES } from '@/constants';
import { toast } from 'react-toastify';
import React from 'react';
import { StoreContext, StoreContextState } from '@/contextStore/storeProvider';
import man from '@/assets/icons/manWithNote.png';
import Image from 'next/image';

const TenantsPage = () => {
  const store = React.useContext<StoreContextState>(StoreContext);
  const [tenantCheck, setTenantCheck] = store.tenantCheck;
  const [tenantsData, setTenantsData] = useState<TenantsData>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const getTenantData = async () => {
    try {
      const res = await getTenants(0);
      if (res.data) {
        setTenantsData(res.data);
        setIsLoading(false);
      }
    } catch (error: any) {
      toast.error(MESSAGES.ERROR_WHILE_LOADING_DATA);
    }
  };

  useEffect(() => {
    getTenantData();
  }, [tenantCheck]);

  const handleAddTenantsClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  return (
    <React.Fragment>
      <Header />
      <div className={style.main}>
        <div className={style.parent__container}>
          <div className={style.sub__Section}>
            <div className={style.heading__button}>
              <div className={style.heading}>
                <h1>Tenants</h1>
              </div>
              <div className={''}>
                <Button
                  label={LABELS.ADD_TENANT}
                  backgroundColor={colors.bg.Tarawera}
                  fontSize="1rem"
                  textColor={colors.common.white}
                  onClick={handleAddTenantsClick}
                  width="120px"
                  height="45px"
                />
              </div>
            </div>
            <div>
              <TableCell
                data={tenantsData}
                isLoading={isLoading}
                setIsLoading={setIsLoading}
              />
            </div>
          </div>
        </div>

        {isModalOpen && (
          <TenantModalForm
            onClose={handleCloseModal}
            isModalOpen={isModalOpen}
          />
        )}
      </div>
    </React.Fragment>
  );
};

export default TenantsPage;

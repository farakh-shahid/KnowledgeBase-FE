import React from 'react';
import { FormEvent, useCallback, useEffect, useState } from 'react';
import Button from '@/containers/atoms/button/Button';
import style from '@/styles/TenantsPage.module.scss';
import InputField from '@/containers/atoms/inputField/InputField';
import { INPUT_TYPES, LABELS, MESSAGES, PLACEHOLDER } from '@/constants';
import CardHeading from '@/containers/atoms/cardHeading/CardHeading';
import { toast } from 'react-toastify';
import { colors } from '@/assets/colors';
import { TenantModalForm } from '@/interfaces/tenantsTableData';
import { StoreContext, StoreContextState } from '@/contextStore/storeProvider';
import {
  createTenant,
  getTenantById,
  updateTenant,
} from '@/services/api/tenantsService';

const TenantModalForm = ({
  onClose,
  isModalOpen,
  tenantId,
}: TenantModalForm) => {
  const store = React.useContext<StoreContextState>(StoreContext);
  const [tenantCheck, setTenantCheck] = store.tenantCheck;
  const [tenantData, setTenantData] = useState<any>(null);
  const [name, setName] = useState('');
  const [domain, setDomain] = useState('');
  const [subdomains, setSubdomains] = useState<string[]>([]);
  const [newSubdomain, setNewSubdomain] = useState('');

  const handleSubdomainChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setNewSubdomain(event.target.value);
    },
    []
  );

  const handleSubdomainKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === 'Enter' && newSubdomain) {
        event.preventDefault();
        const trimmedSubdomain = newSubdomain.trim();
        if (subdomains.includes(trimmedSubdomain)) {
          toast.error(`${trimmedSubdomain} already exists!`, {
            autoClose: 1000,
          });
        } else {
          setSubdomains([...subdomains, trimmedSubdomain]);
          setNewSubdomain('');
        }
      }
    },
    [newSubdomain, subdomains]
  );

  const handleSubdomainRemove = useCallback((subdomain: string) => {
    setSubdomains((prevSubdomains) =>
      prevSubdomains.filter((s) => s !== subdomain)
    );
  }, []);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = { name, domain, subDomain: subdomains };
    if (tenantId) {
      try {
        const res = await updateTenant(tenantId, data);
        if (res) {
          toast.success(MESSAGES.TENANT_UPDATED);
          setTenantCheck(!tenantCheck);
          onClose();
        }
      } catch (error) {
        toast.error(MESSAGES.COULD_NOT_UPDATE_TENANT);
      }
    } else {
      try {
        const res = await createTenant(data);
        if (res) {
          toast.success(MESSAGES.TENANT_CREATED);
          setTenantCheck(!tenantCheck);
          onClose();
        }
      } catch (error: any) {
        const errorMessage =
          error?.response?.data?.errorMessage?.response?.message;

        if (errorMessage) {
          errorMessage.forEach((message: string) =>
            toast.error(message, { autoClose: 1000 })
          );
        } else {
          toast.error(error.response.statusText);
        }
      }
    }
  };

  const fetchTenantData = async () => {
    try {
      const res = await getTenantById(tenantId as string);
      if (res.data) {
        setTenantData(res.data);
        setName(res.data.name);
        setDomain(res.data.domain);
        setSubdomains(res.data.subDomain);
      }
    } catch (error) {
      toast.error(MESSAGES.ERROR_WHILE_LOADING_DATA);
    }
  };

  useEffect(() => {
    if (tenantId) {
      fetchTenantData();
    } else {
      setTenantData(null);
      setName('');
      setDomain('');
      setSubdomains([]);
    }
  }, [tenantId]);

  return (
    <div className={isModalOpen ? `${style.modal} ${style.show}` : style.modal}>
      {isModalOpen && (
        <>
          <div
            className={
              isModalOpen ? `${style.modal} ${style.show}` : style.modal
            }
          >
            <div className={style.modal__content}>
              <span className={style.close} onClick={onClose}>
                &times;
              </span>

              <form onSubmit={handleSubmit}>
                <div className={style.sub__heading}>
                  <CardHeading
                    heading={
                      !tenantId ? LABELS.ADD_TENANT : LABELS.UPDATE_TENANT
                    }
                  />
                </div>
                <div className={style.form__group}>
                  <label>Name</label>
                  <InputField
                    placeholder={PLACEHOLDER.ADD_TENANTS_NAME}
                    type={INPUT_TYPES.TEXT}
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                  />
                </div>
                <div className={style.form__group}>
                  <label>Domain</label>
                  <InputField
                    placeholder={PLACEHOLDER.ADD_DOMAIN_HERE}
                    type={INPUT_TYPES.TEXT}
                    value={domain}
                    onChange={(event) => setDomain(event.target.value)}
                  />
                </div>
                <div className={style.form__group}>
                  <label>Subdomains</label>
                  <div className={style.subdomains}>
                    <InputField
                      placeholder={PLACEHOLDER.ENTER_SUBDOMAN}
                      type={INPUT_TYPES.TEXT}
                      name="subdomains"
                      value={newSubdomain}
                      onChange={(event) => handleSubdomainChange(event)}
                      onKeyDown={(event) => handleSubdomainKeyDown(event)}
                    />
                    <div className={style.main__subdomain}>
                      {subdomains?.map((subdomain) => (
                        <>
                          <div className={style.chip} key={subdomain}>
                            {subdomain}
                            <span
                              className={style.closebtn}
                              onClick={() => handleSubdomainRemove(subdomain)}
                            >
                              &times;
                            </span>
                          </div>
                        </>
                      ))}
                    </div>
                  </div>
                </div>
                <div className={style.button}>
                  <Button
                    label={tenantId ? LABELS.UPDATE_TENANT : LABELS.ADD_TENANT}
                    backgroundColor={colors.bg.Java}
                    fontSize="1rem"
                    textColor={colors.common.white}
                  />
                </div>
              </form>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default TenantModalForm;

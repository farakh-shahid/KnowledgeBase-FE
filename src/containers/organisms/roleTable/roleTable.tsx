import { DatePicker, Table } from 'rsuite';
import React, { useEffect, useRef, useState } from 'react';
import { INPUT_TYPES, LABELS, MESSAGES, PERMISSIONS_HEADER } from '@/constants';
const { Column, HeaderCell, Cell } = Table;
import Divider from '@/containers/atoms/divider/Divider';
import {
  Role,
  RoleData,
  RoleTableProps,
  RowData,
} from '@/interfaces/rolePermissions';
import { colors } from '@/assets/colors';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faClose,
  faGear,
  faPen,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
import Button from '@/containers/atoms/button/Button';
import RoleForm from '@/containers/templates/roleForm/roleForm';
import Check from '@/containers/atoms/checkBox/checkBox';
import styles from '@/styles/rolePage.module.scss';
import GenericModal from '../modal/modal';
import {
  deleteRoleById,
  filterAllRoles,
  getRolesByPagination,
} from '@/services/api/roleService';
import { toast } from 'react-toastify';
import { ThreeDots } from 'react-loader-spinner';
import ConfirmationDialog from '../confirmationDialogue/confirmationDialogue';
import { colNameToUpperCase, formatDateToShowInTable } from '@/utils';
import { debounce } from 'lodash';
import { SearchQueries } from '@/interfaces/tenantsTableData';
import InputField from '@/containers/atoms/inputField/InputField';

const RoleTable = (props: RoleTableProps) => {
  const [open, setOpen] = useState<boolean>(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [allRoleData, setAllRoleData] = useState<Role[]>([]);
  const [tableData, setTableData] = useState<Role[]>([]);
  const [originalData, setOriginalData] = useState<Role[]>([]);
  const [selectedRow, setSelectedRow] = useState<RoleData | null>(null);
  const [roleId, setRoleId] = useState<string>('');
  const [showEditModal, setShowEditModal] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [roleTitle, setRoleTitle] = useState('');
  const [rolePermissions, setRolePermissions] = useState({});
  const { roleData, isLoading, setIsLoading } = props;
  const count = roleData?.count || 0;
  const [showDialog, setShowDialog] = useState<boolean>(false);
  const [scrollOnSearch, setScrollOnSearch] = useState<boolean>(true);
  const [showLoader, setShowLoader] = useState<boolean>(false);
  const [searchCount, setSearchCount] = useState<number>(0);
  const [searchQueries, setSearchQueries] = useState<SearchQueries>({});
  const [loaderForSearchFilter, setLoaderForSearchFilter] = useState(false);
  const [loaderCheck, setLoaderCheck] = useState<boolean>(true);
  const [date, setDate] = useState<Date | undefined>(undefined);

  const data = props?.roleData?.roles[0] ?? {};
  const { id, title, updatedAt, tenantId, permissions, ...rest } = data;
  const columnKeys = Object.keys(rest);

  const ExpandCell = ({ rowData, ...props }: any) => (
    <Cell {...props} style={{ padding: 10 }}>
      <div className={styles.permission__button}>
        <Button
          label={LABELS.VIEW_PERMISSIONS}
          onClick={() => {
            handleOpen();
            setSelectedRow(rowData);
          }}
          backgroundColor={colors.tableHeader.grey}
        />
      </div>
    </Cell>
  );

  const renderRowExpanded = (rowData: RowData) => {
    const permissions: { [key: string]: any } = {};

    Object.keys(rowData.permissions).forEach((key: any) => {
      const value = rowData.permissions[key];
      permissions[key] = Array.isArray(value) ? value : [value];
    });

    const permissionValues = Object.keys(PERMISSIONS_HEADER).map(
      (header: any) => {
        const permissionKey = PERMISSIONS_HEADER[header];
        return Object.keys(permissions).reduce((obj: any, key: any) => {
          obj[key] = permissions[key].includes(permissionKey);
          return obj;
        }, {});
      }
    );

    return (
      <>
        <div className={styles.permissionHeader__container}>
          {PERMISSIONS_HEADER.map((value) => (
            <div key={`${value}`} className={styles.permission__header}>
              {value}
            </div>
          ))}
        </div>
        <div className={styles.checkBox__container}>
          {Object.keys(permissions).map((key) => (
            <div key={key} className={styles.heading__checkbox}>
              {key}
              <div className={styles.permissions__checkboxes}>
                {permissionValues.map((obj, index) => (
                  <>
                    <div key={`${key}-${PERMISSIONS_HEADER[index]}`}>
                      {obj[key] ? (
                        <Check
                          key={obj[key]}
                          checked={obj[key]}
                          onChange={() => {}}
                        />
                      ) : (
                        <Check
                          key={obj[key]}
                          checked={false}
                          onChange={() => {}}
                        />
                      )}
                    </div>
                  </>
                ))}
              </div>
            </div>
          ))}
        </div>
      </>
    );
  };

  const handleCloseModal = () => {
    setShowDialog(false);
    setShowEditModal(false);
    setIsModalOpen(false);
  };
  const openModal = (id: string, title: string, permissions: any) => {
    setShowEditModal(true);
    setIsModalOpen(true);
    setRoleId(id);
    setRoleTitle(title);
    setRolePermissions(permissions);
  };

  const openDeleteConfirmantionDialog = (id: string) => {
    setShowDialog(true);
    setRoleId(id);
    setIsModalOpen(true);
  };

  const deleteRole = async (id: string) => {
    try {
      const res = await deleteRoleById(id);

      if (res) {
        toast.success(MESSAGES.ROLE_DELETED_SUCCESSFULLY);
      }
    } catch (error) {
      toast.error(MESSAGES.CANNOT_DELETE_ROLE);
    }
  };

  const rowActions = (rowData: any) => (
    <div className={styles.edit_delete_icons}>
      <div className={styles.edit__icon}>
        <FontAwesomeIcon
          icon={faPen}
          className={styles.icon}
          onClick={() => {
            openModal(rowData.id, rowData.title, rowData.permissions);
          }}
        />
      </div>
      <div className={styles.delete_icon}>
        <FontAwesomeIcon
          icon={faTrash}
          className={styles.icon}
          onClick={() => openDeleteConfirmantionDialog(rowData.id)}
        />
      </div>
    </div>
  );

  const headerContent = (
    <span className={styles.modal__header}>
      Permissions for {selectedRow?.title}
    </span>
  );

  const bodyContent = selectedRow !== null && renderRowExpanded(selectedRow);
  const footerContent = (
    <>
      <Divider />
      <div
        className={styles.modal__footer}
        onClick={() => {
          openModal(
            selectedRow?.id as string,
            selectedRow?.title as string,
            selectedRow?.permissions
          );
        }}
      >
        <p className={styles.modal__footer_title}>Manage Roles</p>
        <FontAwesomeIcon
          icon={faGear}
          className={styles.icon}
          style={{ color: colors.bg.Java }}
        />
      </div>
    </>
  );

  const loader = () => (
    <>
      <div className={styles.table__loader}>
        <ThreeDots
          radius="9"
          color={colors.bg.Java}
          ariaLabel="three-dots-loading"
          height={30}
        />
      </div>
    </>
  );

  const tableHeight = 400;

  const fetchMoreData = async () => {
    if (!showLoader) {
      setShowLoader(true);
      try {
        setTimeout(async () => {
          const res = await getRolesByPagination(allRoleData?.length as number);
          if (res.data) {
            setAllRoleData([...allRoleData, ...res.data.roles]);
            setShowLoader(false);
          }
        }, 1000);
      } catch (error: any) {
        toast.error(MESSAGES.ERROR_WHILE_LOADING_DATA);
      }
    }
  };

  const loadMoreData = debounce((x: number, y: number) => {
    const contextHeight = (allRoleData?.length as number) * 53;
    const top = Math.abs(y);
    if (contextHeight - top - tableHeight < 50 && count > allRoleData.length) {
      fetchMoreData();
    }
  }, 200);

  const checkSearchQueries = () => {
    if (Object.values(searchQueries).every((val) => val === '')) {
      setAllRoleData(originalData);
      return true;
    }
    return false;
  };
  const fetchMoreSearchedData = async () => {
    if (checkSearchQueries()) {
      setAllRoleData(originalData);
      return;
    }
    try {
      setShowLoader(true);
      const res = await filterAllRoles(searchQueries, tableData?.length);
      setTimeout(() => {
        if (res.data) {
          setAllRoleData([...allRoleData, ...res.data.roles]);
          setTableData([...tableData, ...res.data.roles]);
          setScrollOnSearch(false);
          setShowLoader(false);
        }
      }, 600);
    } catch (error: any) {
      toast.error(MESSAGES.ERROR_WHILE_LOADING_DATA);
    }
  };

  const loadMoreSearchData = debounce((x: number, y: number) => {
    const contextHeight = (allRoleData?.length as number) * 46;
    const top = Math.abs(y);
    if (
      contextHeight - top - tableHeight < 50 &&
      searchCount &&
      searchCount > tableData?.length &&
      !showLoader
    ) {
      fetchMoreSearchedData();
    }
  }, 200);

  const fetchSearchRecord = async () => {
    if (checkSearchQueries()) {
      setAllRoleData(originalData);
      return;
    }
    try {
      setLoaderCheck(false);
      const res = await filterAllRoles(searchQueries, 0);
      setLoaderForSearchFilter(true);
      if (res.data) {
        setAllRoleData(res.data.roles);
        setTableData(res.data.roles);
        setSearchCount(res.data.count);
        setLoaderForSearchFilter(false);
        setScrollOnSearch(false);
      }
    } catch (error: any) {
      toast.error(MESSAGES.ERROR_WHILE_LOADING_DATA);
    }
  };

  useEffect(() => {
    if (!checkSearchQueries()) {
      fetchSearchRecord();
    } else {
      setOriginalData((props?.roleData?.roles as Role[]) ?? []);
      setAllRoleData((props?.roleData?.roles as Role[]) ?? []);
      setTableData((props?.roleData?.roles as Role[]) ?? []);
    }
  }, [props]);

  useEffect(() => {
    let getSearchResult: ReturnType<typeof setTimeout>;
    if (checkSearchQueries()) {
      setScrollOnSearch(true);
      setLoaderForSearchFilter(false);
    }
    if (!checkSearchQueries()) {
      getSearchResult = setTimeout(() => {
        fetchSearchRecord();
      }, 600);
      return () => clearTimeout(getSearchResult);
    }
  }, [searchQueries]);
  return (
    <>
      {showDialog && (
        <ConfirmationDialog
          isModalOpen={isModalOpen}
          onClose={handleCloseModal}
          setIsModalOpen={setIsModalOpen}
          id={roleId}
          confirmDelete={deleteRole}
        />
      )}
      {showEditModal && (
        <RoleForm
          onClose={handleCloseModal}
          openModal={isModalOpen}
          roleId={roleId}
          label={LABELS.EDIT_ROLE_PERMISSIONS}
          roleTitle={roleTitle}
          rolePermissions={rolePermissions}
        />
      )}
      <div className={styles.table__container}>
        <Table
          wordWrap="break-word"
          bordered
          shouldUpdateScroll={false}
          data={allRoleData && allRoleData}
          height={400}
          autoHeight={allRoleData?.length < 5 ? true : false}
          headerHeight={80}
          renderLoading={loader}
          loading={loaderCheck ? isLoading : loaderForSearchFilter}
          hover={!isLoading}
          onScroll={scrollOnSearch ? loadMoreData : loadMoreSearchData}
        >
          (
          <>
            {!isLoading && (
              <>
                <Column width={50} align="center">
                  <HeaderCell>#</HeaderCell>
                  <Cell>
                    {(rowData, rowIndex) => (
                      <span>{(rowIndex as number) + 1}</span>
                    )}
                  </Cell>
                </Column>
                <Column width={150} flexGrow={1}>
                  <HeaderCell
                    style={{ backgroundColor: colors.tableHeader.grey }}
                    fullText
                  >
                    Name
                    <div className={styles.Table__inputFields}>
                      <InputField
                        placeholder={`Search by Name`}
                        type={INPUT_TYPES.SEARCH}
                        value={(searchQueries.name as string) || ''}
                        onChange={(e) => {
                          setSearchQueries({
                            ...searchQueries,
                            name: e.target.value,
                          });
                          setLoaderForSearchFilter(true);
                        }}
                        search="true"
                      />
                    </div>
                  </HeaderCell>
                  <Cell dataKey="title"></Cell>
                </Column>
                <Column width={200} align="left" flexGrow={1}>
                  <HeaderCell
                    style={{ backgroundColor: colors.tableHeader.grey }}
                    fullText
                  >
                    Permissions
                  </HeaderCell>
                  <ExpandCell />
                </Column>
              </>
            )}
            {!isLoading &&
              columnKeys.map((key) => {
                let name = colNameToUpperCase(key);
                let cellContent = <Cell dataKey={key}></Cell>;
                if (key === 'createdAt') {
                  cellContent = (
                    <Cell dataKey={key}>
                      {(rowData) => formatDateToShowInTable(rowData[key])}
                    </Cell>
                  );
                }
                return (
                  <Column key={key} align="left" flexGrow={1}>
                    <HeaderCell
                      fullText={name === 'Createdby' ? true : false}
                      style={{ backgroundColor: colors.tableHeader.grey }}
                    >
                      {name}
                      <>
                        {key === 'tenantName' && (
                          <>
                            <InputField
                              placeholder={`Search by ${name}`}
                              type={INPUT_TYPES.SEARCH}
                              value={(searchQueries.tenantName as string) || ''}
                              onChange={(e) => {
                                setSearchQueries({
                                  ...searchQueries,
                                  tenantName: e.target.value,
                                });
                                setLoaderForSearchFilter(true);
                              }}
                              search="true"
                            />
                          </>
                        )}
                        {key === 'createdAt' && (
                          <DatePicker
                            style={{ width: 190 }}
                            format={'MM-dd-yyyy'}
                            placeholder={`Search by Date`}
                            value={date}
                            oneTap
                            onChange={(date) => {
                              setLoaderForSearchFilter(true);
                              setDate(date as Date);
                              setSearchQueries({
                                ...searchQueries,
                                createdAt: date as Date | undefined,
                              } as SearchQueries);
                            }}
                          />
                        )}
                      </>
                    </HeaderCell>
                    {cellContent}
                  </Column>
                );
              })}

            {!isLoading && (
              <Column width={210} align="center">
                <HeaderCell
                  style={{ backgroundColor: colors.tableHeader.grey }}
                >
                  Action
                </HeaderCell>
                <Cell>{rowActions}</Cell>
              </Column>
            )}
          </>
          )
        </Table>
        {showLoader && (
          <ThreeDots
            radius="9"
            color={colors.bg.Java}
            ariaLabel="three-dots-loading"
            wrapperClass={styles.loader}
            visible={showLoader}
            height={30}
          />
        )}
      </div>
      <GenericModal
        open={open}
        onClose={handleClose}
        headerContent={headerContent}
        bodyContent={bodyContent}
        footerContent={footerContent}
        key={selectedRow?.id as string}
      />
    </>
  );
};

export default RoleTable;

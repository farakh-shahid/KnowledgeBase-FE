import { Table, Popover, Whisper, DatePicker } from 'rsuite';
import React, { useEffect, useState } from 'react';
import { Column, HeaderCell, Cell } from 'rsuite-table';
import {
  columnWidths,
  getProfileAvatar,
  INPUT_TYPES,
  LABELS,
  MESSAGES,
} from '@/constants';
import 'rsuite/dist/rsuite.min.css';
import UserAvatar from '@/containers/atoms/userAvatar/UserAvatar';
import styles from '@/styles/usersPage.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose, faTrash } from '@fortawesome/free-solid-svg-icons';
import {
  colNameToUpperCase,
  formatDateToShowInTable,
  getFullUserName,
} from '@/utils';
import { colors } from '@/assets/colors';
import { User, UserTableProps } from '@/interfaces/usersDataProps';
import { ThreeDots } from 'react-loader-spinner';
import InputField from '@/containers/atoms/inputField/InputField';
import {
  deleteUserById,
  filterUser,
  getAllUsers,
} from '@/services/api/userService';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import { SearchQueries } from '@/interfaces/tenantsTableData';
import { debounce } from 'lodash';
import ConfirmationDialog from '../confirmationDialogue/confirmationDialogue';

const UserTable = (props: UserTableProps) => {
  const router = useRouter();
  const { userData, isLoading } = props;
  const [allUserData, setAllUserData] = useState<User[]>([]);
  const [originalData, setOriginalData] = useState<User[]>([]);
  const [showLoader, setShowLoader] = useState<boolean>(false);
  const [searchQueries, setSearchQueries] = useState<SearchQueries>({});
  const [searchCount, setSearchCount] = useState<number>(0);
  const [scrollOnSearch, setScrollOnSearch] = useState<boolean>(true);
  const [tableData, setTableData] = useState<User[]>([]);
  const [loaderCheck, setLoaderCheck] = useState<boolean>(true);
  const [loaderForSearchFilter, setLoaderForSearchFilter] =
    useState<boolean>(false);
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [userId, setUserId] = useState<string>('');
  const [showDeleteConfirmationDialog, setShowDeleteConfirmationDialog] =
    useState<boolean>(false);

  const data = userData?.users[0] ?? {};
  const count = userData?.count;
  const { id, tenantId, createdAt, firstName, lastName, ...rest } = data;
  const columnKeys = Object.keys(rest);
  const ImageCell = ({ rowData, dataKey, ...props }: any) => (
    <>
      <Cell {...props} style={{ padding: 0 }}>
        <div
          className={styles.image__cell}
          onClick={() => {
            router.push(`/profile/${rowData.id}`);
          }}
        >
          <div>
            <UserAvatar
              size={39}
              onClick={() => {}}
              iconSize={30}
              avatar_url={
                rowData.picture ||
                getProfileAvatar(
                  getFullUserName(rowData.firstName, rowData.lastName)
                )
              }
            />
          </div>
          <p>{getFullUserName(rowData.firstName, rowData.lastName)}</p>
        </div>
      </Cell>
    </>
  );

  const NameCell = ({ rowData, dataKey, ...props }: any) => {
    if (!rowData.role) {
      return null;
    }
    const { title, permissions, tenantName, createdAt } = rowData?.role;
    const speaker = (
      <Popover title="Permissions" className={styles.popover}>
        {Object.keys(permissions).map(
          (key) =>
            permissions[key] !== null && (
              <div key={key} className={styles.popover__container}>
                <div>
                  <b>{key.charAt(0).toUpperCase() + key.slice(1)}:</b>
                </div>
                <div>
                  {permissions[key].map((permission: any) => (
                    <div key={permission} className={styles.chip}>
                      {permission}
                    </div>
                  ))}
                </div>
              </div>
            )
        )}
        <hr />
        <div className={styles.popover__footer}>
          <div>
            <p>Tenant Name: {tenantName}</p>
          </div>
          <div>
            <p>Date Created: {formatDateToShowInTable(createdAt)}</p>
          </div>
        </div>
      </Popover>
    );

    return (
      <Cell {...props}>
        <Whisper
          placement="top"
          speaker={speaker}
          followCursor={true}
          enterable
        >
          <p className={styles.role__chip}>{title}</p>
        </Whisper>
      </Cell>
    );
  };

  const DateCell = ({ rowData, dataKey, ...props }: any) => (
    <Cell {...props} style={{ padding: '1rem' }}>
      <p>{formatDateToShowInTable(rowData.createdAt)}</p>
    </Cell>
  );

  const openDeleteConfirmantionDialog = (id: string) => {
    setShowDeleteConfirmationDialog(true);
    setUserId(id);
    setIsModalOpen(true);
  };

  const deleteUser = async (id: string) => {
    try {
      const res = await deleteUserById(id);
      if (res) {
        toast.success(MESSAGES.USER_DELETED_SUCCESSFULLY);
      }
    } catch (error) {
      toast.error(MESSAGES.CANNOT_DELETE_ROLE);
    }
  };

  const rowActions = (rowData: any) => (
    <div className={styles.edit_delete_icons}>
      <div className={styles.delete_icon}>
        <FontAwesomeIcon
          icon={faTrash}
          className={styles.icon}
          onClick={() => openDeleteConfirmantionDialog(rowData.id)}
        />
      </div>
    </div>
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

  const checkSearchQueries = () => {
    if (Object.values(searchQueries).every((val) => val === '')) {
      setAllUserData(originalData);
      return true;
    }
    return false;
  };

  const fetchMoreData = async () => {
    setShowLoader(true);
    try {
      setTimeout(async () => {
        const res = await getAllUsers(allUserData?.length as number);
        if (res.data) {
          setAllUserData([...allUserData, ...res.data.users]);
          setShowLoader(false);
        }
      }, 1000);
    } catch (error: any) {
      toast.error(MESSAGES.ERROR_WHILE_LOADING_DATA);
    }
  };
  const tableHeight = 400;

  const loadMoreData = debounce((x: number, y: number) => {
    const contextHeight = (allUserData?.length as number) * 53;
    const top = Math.abs(y);
    if (contextHeight - top - tableHeight < 50 && count > allUserData?.length) {
      fetchMoreData();
    }
  }, 200);

  const fetchSearchRecord = async () => {
    if (checkSearchQueries()) {
      setAllUserData(originalData);
      return;
    }
    try {
      setLoaderCheck(false);
      setLoaderForSearchFilter(true);
      const res = await filterUser(searchQueries, 0);
      if (res.data) {
        setAllUserData(res.data.users);
        setTableData(res.data.users);
        setSearchCount(res.data.count);
        setLoaderForSearchFilter(false);
        setScrollOnSearch(false);
      }
    } catch (error: any) {
      toast.error(MESSAGES.ERROR_WHILE_LOADING_DATA);
    }
  };

  const fetchMoreSearchedData = async () => {
    if (checkSearchQueries()) {
      setAllUserData(originalData);
      return;
    }
    try {
      setShowLoader(true);
      const res = await filterUser(searchQueries, tableData?.length);
      setTimeout(() => {
        if (res.data) {
          setAllUserData([...allUserData, ...res.data.users]);
          setTableData([...tableData, ...res.data.users]);
          setScrollOnSearch(false);
          setShowLoader(false);
        }
      }, 600);
    } catch (error: any) {
      toast.error(MESSAGES.ERROR_WHILE_LOADING_DATA);
    }
  };
  const loadMoreSearchData = debounce((x: number, y: number) => {
    const contextHeight = (allUserData?.length as number) * 46;
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

  const handleCloseModal = () => {
    setShowDeleteConfirmationDialog(false);
    setIsModalOpen(false);
  };

  useEffect(() => {
    setAllUserData((props?.userData?.users as User[]) ?? []);
    setOriginalData((props?.userData?.users as User[]) ?? []);
  }, [props]);

  useEffect(() => {
    let getSearchResult: ReturnType<typeof setTimeout>;
    if (checkSearchQueries()) {
      setScrollOnSearch(true);
      setLoaderForSearchFilter(false);
    }
    if (!checkSearchQueries()) {
      setLoaderCheck(false);
      setLoaderForSearchFilter(true);
      getSearchResult = setTimeout(() => {
        fetchSearchRecord();
      }, 600);
      return () => clearTimeout(getSearchResult);
    }
  }, [searchQueries]);

  return (
    <>
      {showDeleteConfirmationDialog && (
        <ConfirmationDialog
          isModalOpen={isModalOpen}
          onClose={handleCloseModal}
          setIsModalOpen={setIsModalOpen}
          id={userId}
          confirmDelete={deleteUser}
        />
      )}

      <Table
        height={tableHeight}
        data={allUserData}
        id="table"
        bordered
        wordWrap="break-word"
        loading={loaderCheck ? isLoading : loaderForSearchFilter}
        renderLoading={loader}
        headerHeight={80}
        autoHeight={allUserData && allUserData.length < 6 ? true : false}
        onScroll={scrollOnSearch ? loadMoreData : loadMoreSearchData}
        rowHeight={46}
        shouldUpdateScroll={false}
      >
        {!isLoading && (
          <Column width={50} align="center">
            <HeaderCell>#</HeaderCell>
            <Cell>
              {(rowData, rowIndex) => <span>{(rowIndex as number) + 1}</span>}
            </Cell>
          </Column>
        )}

        {columnKeys.map((key, index) => (
          <Column
            key={index}
            width={columnWidths[key] || 200}
            align="left"
            flexGrow={1}
            verticalAlign="top"
          >
            <HeaderCell style={{ backgroundColor: colors.tableHeader.grey }}>
              {key === LABELS.PICTURE
                ? LABELS.USER_NAME
                : colNameToUpperCase(key)}
              <div className={styles.Table__inputFields}>
                <div className={styles.InputField__wrapper}>
                  {searchQueries[
                    key === LABELS.PICTURE ? LABELS.NAME : key
                  ] && (
                    <FontAwesomeIcon
                      icon={faClose}
                      width={20}
                      color={colors.common.grey}
                      className={styles.InputField__icon}
                      onClick={() =>
                        setSearchQueries({
                          ...searchQueries,
                          [key === LABELS.PICTURE ? LABELS.NAME : key]: '',
                        })
                      }
                    />
                  )}
                </div>
                <div className="fields">
                  <InputField
                    placeholder={
                      key === LABELS.PICTURE
                        ? 'Search by user name'
                        : `Search by ${key}`
                    }
                    type={INPUT_TYPES.TEXT}
                    search="true"
                    value={
                      (searchQueries[
                        key === LABELS.PICTURE ? LABELS.NAME : key
                      ] as string) || ''
                    }
                    onChange={(e) => {
                      const trimmedValue = e.target.value.replace(/^\s+/g, '');
                      setSearchQueries({
                        ...searchQueries,
                        [key === LABELS.PICTURE ? LABELS.NAME : key]:
                          trimmedValue,
                      });
                      setLoaderCheck(false);
                      setLoaderForSearchFilter(true);
                    }}
                  />
                </div>
              </div>
            </HeaderCell>
            {key === 'role' ? (
              <NameCell dataKey="role" />
            ) : key === LABELS.PICTURE ? (
              <ImageCell dataKey={key} key={key} />
            ) : (
              <Cell dataKey={key} />
            )}
          </Column>
        ))}
        {!isLoading && (
          <>
            <Column width={200} align="left" flexGrow={1}>
              <HeaderCell style={{ backgroundColor: colors.tableHeader.grey }}>
                Date Created
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
                  className={styles.custom_datepicker}
                />
              </HeaderCell>
              <DateCell />
            </Column>
            <Column width={120} align="center">
              <HeaderCell style={{ backgroundColor: colors.tableHeader.grey }}>
                Action
              </HeaderCell>
              <Cell>{rowActions}</Cell>
            </Column>
          </>
        )}
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
    </>
  );
};

export default UserTable;

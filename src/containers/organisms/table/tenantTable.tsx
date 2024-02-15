import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Table } from 'rsuite-table';
import { Column, HeaderCell, Cell } from 'rsuite-table';
import 'rsuite-table/dist/css/rsuite-table.css';
import style from '@/styles/TenantsPage.module.scss';
import { toast } from 'react-toastify';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import InputField from '@/containers/atoms/inputField/InputField';
import { INPUT_TYPES, MESSAGES } from '@/constants';
import TenantModalForm from '@/containers/templates/tenantsForm/tenantsForm';
import { StoreContext, StoreContextState } from '@/contextStore/storeProvider';
import { debounce } from 'lodash';
import 'rsuite/dist/rsuite.min.css';
import { DatePicker } from 'rsuite';
import {
  SearchQueries,
  TableCellProps,
  TenantsData,
} from '@/interfaces/tenantsTableData';
import {
  deleteTenantById,
  getTenants,
  searchTenant,
} from '@/services/api/tenantsService';
import { colors } from '@/assets/colors';
import { ThreeDots } from 'react-loader-spinner';
import { formatDateToShowInTable } from '@/utils';
import ConfirmationDialogue from '../confirmationDialogue/confirmationDialogue';

const TenantTable = (props: TableCellProps) => {
  const store = React.useContext<StoreContextState>(StoreContext);
  const [tenantCheck, setTenantCheck] = store.tenantCheck;
  const { data, isLoading } = props;
  const { tenants } = data ?? {};
  const count = data?.count || 0;
  const [allData, setAllData] = useState<TenantsData[]>([]);
  const [tableData, setTableData] = useState<TenantsData[]>([]);
  const [originalData, setOriginalData] = useState<TenantsData[]>([]);
  const [searchQueries, setSearchQueries] = useState<SearchQueries>({});
  const [scrollOnSearch, setScrollOnSearch] = useState<boolean>(true);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [tenantId, setTenantId] = useState<string>('');
  const [searchValue, setSearchValue] = useState<string>('');
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [loaderForSearchFilter, setLoaderForSearchFilter] = useState(false);
  const [loaderCheck, setLoaderCheck] = useState<boolean>(true);
  const [searchCount, setSearchCount] = useState<number>(0);
  const [showLoader, setShowLoader] = useState<boolean>(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState<boolean>(false);


  const handleCloseModal = () => {
    setShowModal(false);
    setShowConfirmDialog(false);
    setIsModalOpen(false);
  };

  const openModal = (id: string) => {
    setShowModal(true);
    setIsModalOpen(true);
    setTenantId(id);
  };

  const columns = useMemo(() => {
    const { id, updatedAt, ...rest } = tenants?.[0] ?? {};
    return Object.keys(rest).map((key) => ({
      name: key.charAt(0).toUpperCase() + key.slice(1),
      dataKey: key,
      width: 100,
    }));
  }, [data]);

  const deleteTenant = async (id: string) => {
    setTenantId(id);
    setShowConfirmDialog(true);
    setIsModalOpen(true);
  };

  const confirmDelete = async (id: string) => {
    try {
      const res = await deleteTenantById(id);
      if (res) {
        toast.success(MESSAGES.TENANT_DELETED_SUCCESSFULLY, {
          autoClose: 1000,
        });
        setTenantCheck(true);
      }
    } catch (error) {
      toast.error(MESSAGES.CANNOT_DELETE_TENANT);
    }
  };

  const tableHeight = 400;
  const rowActions = (rowData: any) => (
    <div className={style.edit_delete_icons}>
      <div className={style.edit__icon}>
        <FontAwesomeIcon
          icon={faEdit}
          className={style.icon}
          onClick={() => {
            openModal(rowData.id);
          }}
        />
      </div>
      <div className={style.delete_icon}>
        <FontAwesomeIcon
          icon={faTrash}
          className={style.icon}
          onClick={() => {
            deleteTenant(rowData.id);
          }}
        />
      </div>
    </div>
  );

  const fetchMoreData = async () => {
    if (!showLoader) {
      setShowLoader(true);
      try {
        setTimeout(async () => {
          const res = await getTenants(allData?.length as number);
          if (res.data) {
            setAllData([...allData, ...res.data.tenants]);
            setShowLoader(false);
          }
        }, 1000);
      } catch (error: any) {
        toast.error(MESSAGES.ERROR_WHILE_LOADING_DATA);
      }
    }
  };

  const loadMoreData = (x: number, y: number) => {
    const contextHeight = (allData?.length as number) * 53;
    const top = Math.abs(y);

    if (contextHeight - top - tableHeight < 50 && count > allData.length) {
      fetchMoreData();
    }
  };

  const checkSearchQueries = () => {
    if (Object.values(searchQueries).every((val) => val === '')) {
      setAllData(originalData);
      return true;
    }
    return false;
  };

  const fetchSearchRecord = async () => {
    if (checkSearchQueries()) {
      setAllData(originalData);
      return;
    }
    try {
      setLoaderCheck(false);
      const res = await searchTenant(searchQueries, 0);
      setLoaderForSearchFilter(true);
      if (res.data) {
        setAllData(res.data.tenants);
        setTableData(res.data.tenants);
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
      setAllData(originalData);
      return;
    }
    try {
      setShowLoader(true);
      const res = await searchTenant(searchQueries, tableData?.length);
      setTimeout(() => {
        if (res.data) {
          setAllData([...allData, ...res.data.tenants]);
          setTableData([...tableData, ...res.data.tenants]);
          setScrollOnSearch(false);
          setShowLoader(false);
        }
      }, 600);
    } catch (error: any) {
      toast.error(MESSAGES.ERROR_WHILE_LOADING_DATA);
    }
  };

  const loadMoreSearchData = debounce((x: number, y: number) => {
    const contextHeight = (allData?.length as number) * 46;
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

  useEffect(() => {
    if (!checkSearchQueries()) {
      fetchSearchRecord();
    } else {
      setOriginalData((data?.tenants as TenantsData[]) ?? []);
      setAllData((data?.tenants as TenantsData[]) ?? []);
      setTableData((data?.tenants as TenantsData[]) ?? []);
    }
  }, [props]);

  useEffect(() => {
    setAllData((data?.tenants as TenantsData[]) ?? []);
  }, [tenantCheck]);

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
      {showConfirmDialog && (
        <ConfirmationDialogue
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          onClose={handleCloseModal}
          id={tenantId}
          confirmDelete={confirmDelete}
        />
      )}

      {showModal && (
        <TenantModalForm
          onClose={handleCloseModal}
          isModalOpen={isModalOpen}
          tenantId={tenantId}
          key={tenantId}
        />
      )}
      {!showModal && (
        <div className={style.table}>
          <Table
            wordWrap="break-word"
            data={allData && allData}
            height={tableHeight}
            bordered
            loading={loaderCheck ? isLoading : loaderForSearchFilter}
            defaultExpandAllRows
            affixHorizontalScrollbar
            shouldUpdateScroll={false}
            onScroll={scrollOnSearch ? loadMoreData : loadMoreSearchData}
            headerHeight={85}
            rowHeight={46}
            autoHeight={allData.length < 6 ? true : false}
          >
            {!isLoading && (
              <Column width={60} align="center">
                <HeaderCell>#</HeaderCell>
                <Cell>
                  {(rowData, rowIndex) => (
                    <span>{(rowIndex as number) + 1}</span>
                  )}
                </Cell>
              </Column>
            )}

            {columns.map((column) => (
              <Column
                width={column.width}
                key={column.dataKey}
                flexGrow={2}
                align="left"
              >
                <HeaderCell
                  style={{
                    backgroundColor: colors.tableHeader.grey,
                  }}
                  className={style.headerCell}
                  fullText
                >
                  {column.name}
                  {column.name === 'CreatedAt' ? (
                    <>
                      <div className={'style.datePicker'}>
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
                              [column.name]: date as Date | undefined,
                            } as SearchQueries);
                          }}
                          className={style.custom_datepicker}
                        />
                      </div>
                    </>
                  ) : (
                    <>
                      <br />
                      <div className={style.Table__inputFields}>
                        <InputField
                          key={column.dataKey}
                          placeholder={`Search by ${column.name}`}
                          type={INPUT_TYPES.TEXT}
                          value={
                            (searchQueries[column.dataKey] as string) || ''
                          }
                          onChange={(e) => {
                            setSearchQueries({
                              ...searchQueries,
                              [column.dataKey]: e.target.value,
                            });
                            setLoaderForSearchFilter(true);
                            setSearchValue(e.target.value);
                          }}
                          search="true"
                        />
                      </div>
                    </>
                  )}
                </HeaderCell>
                <Cell dataKey={column.dataKey}>
                  {column.dataKey === 'subDomain'
                    ? (rowData) =>
                        rowData.subDomain.map((sub: string, i: number) => (
                          <span key={i} className={style.subdomain__chip}>
                            {sub} &ensp;&ensp;
                          </span>
                        ))
                    : column.dataKey === 'domain'
                    ? (rowData) => <span> {rowData.domain}</span>
                    : column.dataKey === 'createdAt'
                    ? (rowData) => (
                        <span className={style.Table__createdAt}>
                          {formatDateToShowInTable(rowData.createdAt)}
                        </span>
                      )
                    : undefined}
                </Cell>
              </Column>
            ))}

            {!isLoading && (
              <Column width={200} align="center">
                <HeaderCell
                  style={{ backgroundColor: colors.tableHeader.grey }}
                  className={style.headerCell}
                >
                  Action
                </HeaderCell>
                <Cell>{rowActions}</Cell>
              </Column>
            )}
          </Table>

          {showLoader && (
            <ThreeDots
              radius="9"
              color={colors.bg.Java}
              ariaLabel="three-dots-loading"
              wrapperClass={style.loader}
              visible={showLoader}
              height={30}
            />
          )}
        </div>
      )}
    </>
  );
};

export default TenantTable;

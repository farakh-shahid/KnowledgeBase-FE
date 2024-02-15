export interface Tenant {
  id?: string;
  name?: string;
  domain?: string;
  subDomain?: string[];
  createdAt?: string;
  updatedAt?: string;
}

export interface TenantsData {
  tenants: Tenant[];
  count?: number;
  [key: string]: any;
}

export interface TableCellProps {
  data?: TenantsData;
  isLoading?: boolean;
  setIsLoading?: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface TenantInterface {
  name: string;
  domain: string;
  subDomain: string[];
}

export type UpdateTennat = Partial<TenantInterface>;

export interface TenantModalForm {
  onClose: () => void;
  isModalOpen: boolean;
  tenantId?: string;
}

export interface SearchParams {
  name?: string;
  domain?: string;
  subDomain?: string;
  createdAt?: string;
}

export interface SearchQueries {
  [key: string]: string | Date | undefined;
}

export interface ModalProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setSearchQueries: React.Dispatch<React.SetStateAction<SearchQueries>>;
  searchQueries: SearchQueries;
  setDate: React.Dispatch<React.SetStateAction<Date | undefined>>;
  colName: string;
}

export interface Permissions {
  [key: string]: string[];
}
export interface Data {
  createdBy: string;
  title: string;
  permissions: Permissions;
  tenantId: string;
}
export interface RoleData {
  id: string;
  title: string;
  permissions: {
    question: Array<string> | null;
    demographics: Array<string> | null;
    invite: Array<string> | null;
    roles: Array<string> | null;
    reactions: Array<string> | null;
    content: Array<string> | null;
    users: Array<string> | null;
  };
  createdBy: string;
  createdAt: string;
  updatedAt: string;
  tenantId: string | null;
}

export interface UserRole {
  id: string;
  title: string;
  permissions: {
    question: Array<string> | null;
    demographics: Array<string> | null;
    invite: Array<string> | null;
    roles: Array<string> | null;
    reactions: Array<string> | null;
    content: Array<string> | null;
    users: Array<string> | null;
  };
  createdBy: string;
  createdAt: string;
  updatedAt: string;
  tenantId: string | null;
  tenantName: string | null;
}

export interface Role {
  id: string;
  title: string;
  permissions: {
    question: string[] | null;
    demographics: string[] | null;
    invite: string[] | null;
    roles: string[] | null;
    reactions: string[] | null;
    content: string[] | null;
    users: string[] | null;
  };
  createdBy: string;
  createdAt: string;
  updatedAt: string;
  tenantId: string | null;
  tenantName: string | null;
}

export interface RolesData {
  roles: Role[];
  count: number;
}

export interface RoleTableProps {
  roleData: RolesData;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}
export interface RowData {
  permissions: { [key: string]: string[] | string | null };
}

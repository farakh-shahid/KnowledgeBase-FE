interface Role {
  title: string;
  permissions: {
    question: string[];
    demographics: string[];
    invite: string[] | null;
    roles: string[] | null;
    reactions: string[] | null;
    content: string[] | null;
    users: string[] | null;
  };
  createdAt: string;
  tenantId: string;
  tenantName: string;
}

export interface User {
  id: string;
  picture: string | null;
  email: string;
  firstName: string;
  lastName: string;
  createdAt: string;
  tenantId: string;
  role: Role;
  tenantName: string;
}

export interface UserResponse {
  users: User[];
  count: number;
}

export interface UserTableProps {
  isLoading: boolean;
  userData: UserResponse;
}

export interface UserRolesProps {
  id: string;
  title: string;
  permissions: {
    questions: string[];
    demographics: string[];
  };
}

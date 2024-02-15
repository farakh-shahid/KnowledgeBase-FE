export interface GenericModalProps {
  open: boolean;
  onClose: () => void;
  headerContent?: React.ReactNode;
  bodyContent?: React.ReactNode;
  footerContent?: React.ReactNode;
}
export interface ModalDialogProps {
  isModalOpen?: boolean;
  setIsModalOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  onClose?: () => void;
  id?: string;
  confirmDelete?: (id: string) => Promise<void>;
}

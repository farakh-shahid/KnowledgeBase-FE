import { GenericModalProps } from '@/interfaces/modalProps';
import { Modal } from 'rsuite';

const GenericModal = ({
  open,
  onClose,
  headerContent,
  bodyContent,
  footerContent,
}: GenericModalProps) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Modal.Header>
        <Modal.Title>{headerContent}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{bodyContent}</Modal.Body>
      <Modal.Footer>{footerContent}</Modal.Footer>
    </Modal>
  );
};

export default GenericModal;

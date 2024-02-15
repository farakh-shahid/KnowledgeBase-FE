import { Modal } from 'rsuite';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWarning } from '@fortawesome/free-solid-svg-icons';
import Button from '@/containers/atoms/button/Button';
import { LABELS } from '@/constants';
import style from '@/styles/TenantsPage.module.scss';
import { colors } from '@/assets/colors';
import { ModalDialogProps } from '@/interfaces/modalProps';

const ConfirmationDialog = (props: ModalDialogProps) => {
  const { isModalOpen, setIsModalOpen, confirmDelete, id } = props;
  const confirmDeletion = () => {
    if (id) {
      setIsModalOpen?.(false);
      confirmDelete?.(id);
    }
  };
  const handleClose = () => {
    setIsModalOpen?.(false);
  };

  return (
    <>
      <div className={style.modal__container}>
        <Modal
          backdrop="static"
          role="alertdialog"
          open={isModalOpen}
          onClose={props.onClose}
          size="xs"
          className={style.modal__container}
        >
          <Modal.Body>
            <div className={style.modalBody__content}>
              <FontAwesomeIcon
                icon={faWarning}
                className={style.faWarning}
                color={colors.common.yellow}
              />
              <h3>Are You Sure?</h3>
              <p>You won&apos;t be able to revert this!</p>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <div className={style.actionButtons}>
              <Button
                label={LABELS.YES_DELETE_IT}
                onClick={confirmDeletion}
                backgroundColor={colors.bg.Java}
              />
              <Button
                label={LABELS.CANCEL}
                onClick={handleClose}
                backgroundColor={colors.bg.red}
              />
            </div>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
};

export default ConfirmationDialog;

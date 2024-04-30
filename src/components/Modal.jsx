import { useEffect, useState } from "react";
import { Dialog } from "../imports/import";

const Modal = ({
  btn,
  btnStyle,
  children,
  headerText,
  headerTextStyle,
  headerStyle,
  handleClose,
}) => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(handleClose);
  }, [handleClose]);
  return (
    <>
      <button onClick={() => setOpen(true)} className={btnStyle}>
        {btn}
      </button>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        fullWidth={true}
        maxWidth="md"
      >
        <div className={`flex justify-between items-center p-4 ${headerStyle}`}>
          <div className={headerTextStyle}>{headerText}</div>
          <button
            onClick={() => setOpen(false)}
            className="font-semibold transition duration-300 hover:bg-gray-200 text-gray-600 text-2xl rounded-full w-11 h-11 flex items-center justify-center"
          >
            X
          </button>
        </div>

        {children}
      </Dialog>
    </>
  );
};

export default Modal;

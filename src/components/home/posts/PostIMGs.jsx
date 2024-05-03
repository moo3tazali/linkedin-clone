import { useState } from "react";

const PostIMGs = ({ imageUrl, mediaLength }) => {
  const [isOpen, setIsOpen] = useState(false);
  const openImage = () => {
    setIsOpen(true);
  };

  const closeImage = () => {
    setIsOpen(false);
  };
  return (
    <>
      <img
        src={imageUrl}
        alt="Click to open"
        onClick={openImage}
        className={`max-w-full w-full cursor-pointer object-cover ${
          mediaLength > 1 ? "col-span-6" : "col-span-12"
        }`}
      />
      {isOpen && (
        <div
          className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-[9999]"
          onClick={closeImage}
        >
          <img src={imageUrl} alt="Opened" className="max-w-90 max-h-90" />
        </div>
      )}
    </>
  );
};

export default PostIMGs;

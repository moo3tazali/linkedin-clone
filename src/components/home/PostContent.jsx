import { useState } from "react";

const PostContent = ({ content = "" }) => {
  const [expanded, setExpanded] = useState(false);

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  return (
    <div className="max-w-full my-2">
      <p className="break-word text-sm text-linkedBlack my-2 px-4">
        {expanded ? content : content.substring(0, 150)}
        {content.length > 150 && (
          <button
            className="px-2 pt-2 font-semibold text-sm text-secondary"
            onClick={toggleExpanded}
          >
            {expanded ? "See less" : "...See more"}
          </button>
        )}
      </p>

      <img src="https://media.licdn.com/dms/image/D5622AQH7hl7j3Dur8g/feedshare-shrink_800/0/1710231799281?e=1713398400&v=beta&t=-KBdTE7oxuK-ALIpNeEnwlD_104k5UoYfcTh4m9ouC4" alt="" className=" max-w-full object-contain" />
    </div>
  );
};

export default PostContent;

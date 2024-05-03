import FollowCard from "../../FollowCard";
import TriggersTooltips from "../../TriggersTooltips";
import AssignmentLateIcon from "@mui/icons-material/AssignmentLate";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useProfile } from "../../../services/queries";

import { useSelector } from "react-redux";
import { Fragment } from "react";

const Widgets = () => {
  const { userId } = useSelector((state) => state.userData);
  const { data: users } = useProfile();

  return (
    <div className="bg-white rounded-lg p-3 col-span-3 md:block hidden">
      <div className="flex justify-between items-center">
        <h1 className="text-sm font-semibold">Add to your feed</h1>
        <TriggersTooltips
          title="Follow things that interest you to personalize your feed."
          icon={<AssignmentLateIcon sx={{ fontSize: "large" }} />}
        />
      </div>
      {users?.map(
        (user, index) =>
          user.id !== userId &&
          index <= 3 && (
            <Fragment key={user.id}>
              <FollowCard user={user} />
            </Fragment>
          )
      )}
      <div className="text-sm font-semibold text-secondary mt-5 px-2 rounded transition duration-300 hover:bg-background w-fit cursor-pointer">
        <span>View all recommendations</span>
        <ArrowForwardIcon />
      </div>
    </div>
  );
};

export default Widgets;

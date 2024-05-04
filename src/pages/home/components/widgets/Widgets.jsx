import { Fragment } from "react";
import { useSelector } from "react-redux";

import FollowCard from "../../../../components/cards/FollowCard";
import TriggersTooltips from "../../../../components/tooltip/TriggersTooltips";
import { useProfile } from "../../../../hooks/queries";
import {
  ArrowForwardIcon,
  AssignmentLateIcon,
} from "../../../../imports/import";

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

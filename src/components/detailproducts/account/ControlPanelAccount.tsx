import { useSession } from "next-auth/react";

const ControlPanelAccount = () => {
  const {data:session} = useSession();

  return (
    // control panel account
    <div className="w-full h-[50px] flex justify-end">
      <div className="rounded-full overflow-hidden mr-2 mt-2 border-[5px] border-zinc-600">
        <img
          src={`${session?.user?.image}`}
          alt=""
          className="h-full w-full object-cover "
        />
      </div>
    </div>
  );
};

export default ControlPanelAccount;

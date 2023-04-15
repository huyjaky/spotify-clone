import { AppDispatch } from "@/store/store";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import BackButton from "./controlButton/BackButton";
import NextButton from "./controlButton/NextButton";
import PlayPause from "./controlButton/PlayPause";
import ReplyButton from "./controlButton/ReplyButton";
import SwitchButton from "./controlButton/SwitchButton";
import Volumn from "./volumn/Volum";
import { fetchDevice, getDevice } from "@/slices/Device";

const Play = () => {
  const { data: session } = useSession();
  const dispatch = useDispatch<AppDispatch>();
  const Device = useSelector(getDevice);

  const fetchDevice_ = () => {
    if (session && Device.length == 0) {
      return dispatch(fetchDevice());
    }
  };

  useEffect(() => {
    fetchDevice_();
  }, [session]);

  return (
    <div className="bg-slate-800 h-full w-full box-border px-3 pb-3">
      <div className="bg-slate-700 w-full h-full rounded-xl">
        {/* Protect div */}
        <div className="w-full h-full flex overflow-hidden">
          {/* Music is playing */}
          <div className="flex-1 w-full h-full"></div>

          {/* control process */}
          <div className="flex-1 w-full h-full ">
            <div className="h-[50%] flex justify-center space-x-16">
              {/* switch song */}
              <SwitchButton />

              {/* back button */}
              <BackButton />

              {/* play/pause button */}
              <PlayPause />

              {/* next button */}
              <NextButton />

              {/* reply button */}
              <ReplyButton />
            </div>

            <div className="w-full h-[50%] flex-1">
              <div className="w-full h-full">check</div>
            </div>
          </div>

          {/* volumn */}
          <Volumn />
        </div>
      </div>
    </div>
  );
};

export default Play;

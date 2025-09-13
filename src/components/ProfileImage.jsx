import { useRef } from "react";
import { useCardTilt } from "../hooks/useCardTilt";
import profile from "../assets/profile.png";

function ProfileImage() {
  const ref = useRef(null);
  useCardTilt(ref);
  return (
    <div ref={ref} style={{ width: 144, height: 144 }}>
      <img
        src={profile}
        alt="Profile"
        className="w-36 h-36 sm:w-44 sm:h-44 rounded-full shadow-xl border-4 border-[#5f6caf] object-cover"
      />
    </div>
  );
}

export default ProfileImage;


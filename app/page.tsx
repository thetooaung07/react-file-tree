import AppV1 from "@/components/v1/AppV1";
import { AppV2 } from "@/components/v2/AppV2";
import { AppV3 } from "@/components/v3/AppV3";
import { AppV4 } from "@/components/v4/AppV4";

export default function Home() {
  return (
    <div className="w-full flex justify-center">
      {/* <AppV1></AppV1> */}
      {/* <AppV2></AppV2> */}
      {/* <AppV3></AppV3> */}
      <AppV4></AppV4>
    </div>
  );
}

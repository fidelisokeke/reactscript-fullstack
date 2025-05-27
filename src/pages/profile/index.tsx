import { Button } from "antd";
import usersGlobalStore, {
  type IUsersGlobalStore,
} from "../../global-store/users-store";
import dayjs from "dayjs";
import { useState } from "react";
import ChangePasswordModal from "./components/change-password-modal";
import UpdateProfileModal from "./components/update-profile-modal";

function ProfilePage() {
  const { user } = usersGlobalStore() as IUsersGlobalStore;
  const [openChangePasswordModal, setOpenChangePasswordModal] = useState(false);
  const [openUpdateProfileModal, setOpenUpdateProfileModal] = useState(false);
  console.log("user", user);
  const renderUserProperty = (label: string, value: any) => {
    return (
      <div>
        <h1 className="text-xs text-gray-500">{label}</h1>
        <p className="font-semibold text-sm">{value}</p>
      </div>
    );
  };
  return (
    <div>
      <h1 className="text-xl font-bold"> profile page</h1>
      {user?.profile_pic &&(
        <img src={user?.profile_pic} className="h-36 rounded-lg mt-5 object-contain p-2 border border-gray-400" />
      )}
      <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-5 mt-7">
        {renderUserProperty("User ID", user?.id)}
        {renderUserProperty("Name", user?.name)}
        {renderUserProperty("Email", user?.email)}
        {renderUserProperty(
          "Created at",
          dayjs(user?.createdAt).format("MMM DD YYYY hh:mm A")
        )}
        {renderUserProperty(
          "Last sign in",
          dayjs(user?.last_sign_in_at).format("MMM DD YYYY hh:mm A")
        )}
      </div>
      <div className="flex justify-end gap-5 mt-7">
        <Button
        onClick={()=>setOpenUpdateProfileModal(true)}>Update Profile</Button>
        <Button type="primary" onClick={() => setOpenChangePasswordModal(true)}>
          Change Password
        </Button>
      </div>
      {openChangePasswordModal && (
        <ChangePasswordModal
          openChangePasswordModal={openChangePasswordModal}
          setOpenChangePasswordModal={setOpenChangePasswordModal}
        />
      )}
      {openUpdateProfileModal && (
        <UpdateProfileModal
        openUpdateProfileModal ={openUpdateProfileModal}
        setOpenUpdateProfileModal={setOpenUpdateProfileModal}/>
      )}
    </div>
  );
}

export default ProfilePage;

import { Button, Input, message, Modal, Upload } from "antd";
import { useState } from "react";
import usersGlobalStore, {
  type IUsersGlobalStore,
} from "../../../global-store/users-store";
import { updateFileToSupabaseAndGetUrl } from "../../../helpers";
import { updateUserProfile } from "../../../services/users";
// import React from 'react'

function UpdateProfileModal({
  openUpdateProfileModal,
  setOpenUpdateProfileModal,
}: {
  openUpdateProfileModal: boolean;
  setOpenUpdateProfileModal: (openUpdateProfileModal: boolean) => void;
}) {
  const { user, setUser } = usersGlobalStore() as IUsersGlobalStore;
  const [newName, setNewName] = useState(user?.name || "");
  const [loading, setLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [messageApi, contextHolder] = message.useMessage();

  const handleUpdateProfile = async () => {
    try {
      setLoading(true);
      let newProfilepic = user?.profile_pic;
      if (selectedFile) {
        newProfilepic = await updateFileToSupabaseAndGetUrl(selectedFile);
      }
      const response: any = await updateUserProfile({
        name: newName,
        profile_pic: newProfilepic,
        id: user?.id,
      });
      if (response.error) {
        throw new Error(response.error.message);
      }
      messageApi.success("Profile updated Successfully!");
      const newUserObj: any ={
        ...user,
        name: newName,
        profile_pic: newProfilepic,
      };
      setTimeout(() => {
        setUser(newUserObj)
        setOpenUpdateProfileModal(false);
      }, 1000);
    } catch (error: any) {
      messageApi.error(error.message || "something went wrong");
    } finally {
      setLoading(false);
    }
  };
  return (
    <Modal
      open={openUpdateProfileModal}
      onCancel={() => setOpenUpdateProfileModal(false)}
      centered
      footer={null}
      width={500}
    >
      <h1 className="text-xl font-bold">Update Profile</h1>
      {contextHolder}
      <div className="flex flex-col gap-7">
        <div>
          <h1 className="text-sm"> Name </h1>
          <Input value={newName} onChange={(e) => setNewName(e.target.value)} />
        </div>
      </div>
      <div>
        <div>
          <h1 className="text-sm"> Profile Picture </h1>
          <Upload
            beforeUpload={(file) => {
              setSelectedFile(file);
              return false; //prevent automatic uploads
            }}
            listType="picture-card"
          >
            Upload
          </Upload>
        </div>
      </div>

      <div className="flex justify-end">
        <Button disabled={loading}>cancel</Button>
        <Button
          type="primary"
          className="ml-2"
          loading={loading}
          disabled={loading}
          onClick={handleUpdateProfile}
        >
          Update Profile
        </Button>
      </div>
    </Modal>
  );
}

export default UpdateProfileModal;

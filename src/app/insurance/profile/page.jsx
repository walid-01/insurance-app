"use client";

import { useContext, useEffect, useState } from "react";
import { UserContext } from "@/context/UserContext";
import CitySelect from "@/components/CitySelect";
import useUser from "@/hooks/useUser";
import ImageTitle from "@/components/ImageTitle"; // Added import for ImageTitle

export default function EditProfile() {
  const { editProfile } = useUser();

  const userContext = useContext(UserContext);
  const { user, fetchUserData } = userContext;

  const [isEditing, setIsEditing] = useState(false);
  const [isPasswordChanged, setIsPasswordChanged] = useState(false);
  const [error, setError] = useState(null);

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [agencyCode, setAgencyCode] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  const showDefaultData = () => {
    setName(user.name);
    setAddress(user.address);
    setCity(user.city);
    setAgencyCode(user.agencyCode);
    setCurrentPassword("");
    setNewPassword("");
    setConfirmNewPassword("");
  };

  useEffect(() => {
    showDefaultData();
  }, [user]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);

    if (newPassword !== "" && newPassword !== confirmNewPassword) {
      setError("Passwords do not match");
      return;
    }

    const resStatus = await editProfile({
      address,
      city,
      agencyCode,
      name,
      currentPassword,
      newPassword: isPasswordChanged ? newPassword : null,
    });

    if (resStatus === 200) {
      fetchUserData();
      setIsEditing(false);
    } else if (resStatus === 401) setError("Wrong Password");
  };

  return (
    <>
      <ImageTitle imgName="office.jpg" titleText="Profile" />{" "}
      {/* Added ImageTitle component */}
      <form
        onSubmit={handleSubmit}
        className="space-y-4 flex flex-col m-auto w-1/2"
      >
        {error && (
          <div className="text-red-800 bg-red-100 h-10 flex items-center justify-center">
            <p className="text-sm">{error}</p>
          </div>
        )}
        <div className="gap-4 flex items-center justify-between">
          <label className="w-1/3" htmlFor="name">
            Insurance Name
          </label>
          <input
            id="name"
            type="text"
            readOnly
            value={name}
            className="w-2/3 rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-1 focus:ring-cyan-800"
          />
        </div>
        <div className="gap-4 flex items-center justify-between">
          <label className="w-1/3" htmlFor="address">
            Address
          </label>
          <input
            readOnly={!isEditing}
            required
            id="address"
            type="text"
            value={address}
            onChange={(event) => setAddress(event.target.value)}
            className="w-2/3 rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-1 focus:ring-cyan-800"
          />
        </div>
        <div className="gap-4 flex items-center justify-between">
          <label className="w-1/3" htmlFor="agencyCode">
            Agency Code
          </label>
          <input
            readOnly={!isEditing}
            required
            id="agencyCode"
            type="number"
            value={agencyCode}
            onChange={(event) => setAgencyCode(event.target.value)}
            className="w-2/3 rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-1 focus:ring-cyan-800"
          />
        </div>
        {isEditing && (
          <>
            <div className="gap-4 flex items-center justify-between">
              <label className="w-1/3" htmlFor="currentPassword">
                Current Password
              </label>
              <input
                readOnly={!isEditing}
                required
                id="currentPassword"
                type="password"
                value={currentPassword}
                onChange={(event) => setCurrentPassword(event.target.value)}
                className="w-2/3 rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-1 focus:ring-cyan-800"
              />
            </div>
            <button
              type="button"
              onClick={() => setIsPasswordChanged(!isPasswordChanged)}
              className="bg-cyan-700 text-white py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-800 transition-colors duration-300 ease-in-out hover:bg-cyan-800"
            >
              Change Password
            </button>
            {isPasswordChanged && (
              <div className="flex flex-col gap-4">
                <p>Change Current Password</p>
                <div className="gap-4 flex items-center justify-between">
                  <label className="w-1/3" htmlFor="newPassword">
                    New Password
                  </label>
                  <input
                    readOnly={!isEditing}
                    id="newPassword"
                    type="password"
                    value={newPassword}
                    onChange={(event) => setNewPassword(event.target.value)}
                    className="w-2/3 rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-1 focus:ring-cyan-800"
                  />
                </div>
                <div className="gap-4 flex items-center justify-between">
                  <label className="w-1/3" htmlFor="confirmNewPassword">
                    Confirm New Password
                  </label>
                  <input
                    readOnly={!isEditing}
                    id="confirmNewPassword"
                    type="password"
                    value={confirmNewPassword}
                    onChange={(event) =>
                      setConfirmNewPassword(event.target.value)
                    }
                    className="w-2/3 rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-1 focus:ring-cyan-800"
                  />
                </div>
              </div>
            )}
            <button
              type="submit"
              disabled={
                address === user.address &&
                city === user.city &&
                agencyCode === user.agencyCode &&
                newPassword === ""
              }
              className="w-full bg-cyan-700 text-white py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-800 disabled:bg-gray-400 transition-colors duration-300 ease-in-out hover:bg-cyan-800"
            >
              Save Changes
            </button>
            <button
              type="button"
              onClick={() => {
                setIsEditing(false);
                showDefaultData();
              }}
              className="w-full bg-gray-300 text-gray-700 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors duration-300 ease-in-out hover:bg-gray-400"
            >
              Cancel
            </button>
          </>
        )}
        {!isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className="w-full bg-cyan-700 text-white py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-800 transition-colors duration-300 ease-in-out hover:bg-cyan-800"
          >
            Edit
          </button>
        )}
      </form>
    </>
  );
}

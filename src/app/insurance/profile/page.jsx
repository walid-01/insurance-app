"use client";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "@/context/UserContext";
import CitySelect from "@/components/CitySelect";
import useUser from "@/hooks/useUser";

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
      <h1>Profile</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Insurance Name</label>
          <input id="name" type="text" readOnly value={name} />
        </div>
        <div>
          <label htmlFor="address">Address</label>
          <input
            readOnly={!isEditing}
            required
            id="address"
            type="text"
            value={address}
            onChange={(event) => setAddress(event.target.value)}
          />
        </div>
        <div>
          <label htmlFor="city">City</label>
          <CitySelect city={city} setCity={setCity} isDisabled={!isEditing} />
        </div>
        <div>
          <label htmlFor="agencyCode">Agency Code</label>
          <input
            readOnly={!isEditing}
            required
            id="agencyCode"
            type="number"
            value={agencyCode}
            onChange={(event) => setAgencyCode(event.target.value)}
          />
        </div>
        {isEditing && (
          <>
            <div>
              <label htmlFor="currentPassword">Current Password</label>
              <input
                readOnly={!isEditing}
                required
                id="currentPassword"
                type="password"
                value={currentPassword}
                onChange={(event) => setCurrentPassword(event.target.value)}
              />
            </div>
            <button
              type="button"
              onClick={() => setIsPasswordChanged(!isPasswordChanged)}
            >
              Change Password
            </button>
            {isPasswordChanged && (
              <div>
                <p>Change Current Password</p>
                <div>
                  <label htmlFor="newPassword">New Password</label>
                  <input
                    readOnly={!isEditing}
                    id="newPassword"
                    type="password"
                    value={newPassword}
                    onChange={(event) => setNewPassword(event.target.value)}
                  />
                </div>
                <div>
                  <label htmlFor="confirmNewPassword">
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
            >
              Save Changes
            </button>
            <button
              type="button"
              onClick={() => {
                setIsEditing(false);
                showDefaultData();
              }}
            >
              Cancel
            </button>
          </>
        )}
      </form>
      {!isEditing && <button onClick={() => setIsEditing(true)}>Edit</button>}
      {error && <p className="text-red-600">{error}</p>}
    </>
  );
}

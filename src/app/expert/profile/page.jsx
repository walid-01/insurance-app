"use client";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "@/context/UserContext";
import useUser from "@/hooks/useUser";

export default function ExpertEditProfile() {
  const { editProfile } = useUser();

  const userContext = useContext(UserContext);
  const { user, fetchUserData } = userContext;

  const [isEditing, setIsEditing] = useState(false);
  const [isPasswordChanged, setIsPasswordChanged] = useState(false);
  const [error, setError] = useState(null);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  const showDefaultData = () => {
    setFirstName(user.firstName);
    setLastName(user.lastName);
    setAddress(user.address);
    setPhoneNumber(user.phoneNumber);
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
      firstName,
      lastName,
      address,
      phoneNumber,
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
          <label htmlFor="firstName">First Name</label>
          <input
            readOnly={!isEditing}
            required
            id="firstName"
            type="text"
            value={firstName}
            onChange={(event) => setFirstName(event.target.value)}
          />
        </div>
        <div>
          <label htmlFor="lastName">Last Name</label>
          <input
            readOnly={!isEditing}
            required
            id="lastName"
            type="text"
            value={lastName}
            onChange={(event) => setLastName(event.target.value)}
          />
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
          <label htmlFor="phoneNumber">Phone Number</label>
          <input
            readOnly={!isEditing}
            required
            id="phoneNumber"
            type="tel"
            value={phoneNumber}
            onChange={(event) => setPhoneNumber(event.target.value)}
          />
        </div>
        {isEditing && (
          <>
            <div>
              <label htmlFor="currentPassword">Current Password</label>
              <input
                readOnly={!isEditing}
                // required
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
                firstName === user.firstName &&
                lastName === user.lastName &&
                address === user.address &&
                phoneNumber === user.phoneNumber &&
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

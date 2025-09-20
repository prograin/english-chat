// features/users/pages/ProfileEdit.page.jsx
import React from "react";
import ProfileForm from "../components/ProfileFormComponent";
import useProfile from "../hooks/useProfile";

export default function ProfileEditPage() {
  const { user, loading, error, saving, isDirty, handleChange, handleSave, handleDiscard } =
    useProfile();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="profile-edit-page">
      <h2>Edit Profile</h2>
      <ProfileForm
        user={user}
        onChange={handleChange}
        onSave={handleSave}
        onDiscard={handleDiscard}
        saving={saving}
        isDirty={isDirty}
      />
    </div>
  );
}

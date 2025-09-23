import React from "react";
import ProfileForm from "../components/organisms/ProfileForm";
import useProfile from "../hooks/useProfile";
import Loader from "../components/atoms/Loader";
import ErrorMessage from "../components/atoms/ErrorMessage";

export default function ProfileEditPage() {
  const { user, loading, error, saving, isDirty, handleChange, handleSave, handleDiscard } =
    useProfile();

  if (loading) return <Loader message="Loading profile..." />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div className="bg-gradient-to-r from-blue-800 via-purple-500 to-pink-800 animate-gradient min-h-screen flex justify-center items-start p-6">
      <div className="w-full max-w-3xl mt-10 px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">Edit Profile</h2>
        <ProfileForm
          user={user}
          onChange={handleChange}
          onSave={handleSave}
          onDiscard={handleDiscard}
          saving={saving}
          isDirty={isDirty}
        />
      </div>
    </div>
  );
}

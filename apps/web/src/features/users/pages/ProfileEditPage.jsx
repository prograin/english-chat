import React from "react";
import ProfileForm from "../components/organisms/ProfileForm";
import useProfile from "../hooks/useProfile";
import Loader from "../components/atoms/Loader";
import ErrorMessage from "../components/atoms/ErrorMessage";

export default function ProfileEditPage() {
  const {
    user,
    loading,
    saving,
    error,
    isDirty,
    handleChange,
    handleSave,
    handleDiscard,
    handleInterests,
    handleLocation,
    statesOption,
    countriesOption,
    citiesOption,
  } = useProfile();

  if (loading) return <Loader message="Loading profile..." />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div
      className="min-h-screen flex justify-center items-center p-6
                 animate-gradient bg-gradient-to-r from-primary via-secondary to-accent"
    >
      <div
        className="w-full max-w-3xl mt-3 p-6 sm:p-8 rounded-2xl
                   bg-surface/20 backdrop-blur-md shadow-lg"
      >
        <h2 className="text-2xl sm:text-3xl font-bold text-text-primary mb-6 font-sans">
          Edit Profile
        </h2>
        <ProfileForm
          user={user}
          onChange={handleChange}
          onSave={handleSave}
          onDiscard={handleDiscard}
          onChangeInterests={handleInterests}
          onChangeLocation={handleLocation}
          saving={saving}
          isDirty={isDirty}
          options={{ statesOption, countriesOption, citiesOption }}
        />
      </div>
    </div>
  );
}

import React from "react";
import ProfileForm from "../components/organisms/ProfileForm";
import useProfile from "../hooks/useProfile";
import Loader from "../components/atoms/Loader";
import ErrorMessage from "../components/atoms/ErrorMessage";
import Modal from "../components/atoms/Modal";

export default function ProfileEditPage() {
  const {
    user,
    loading,
    saving,
    error,
    isDirty,
    modal,
    closeModal,
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
    <div className="flex justify-center p-2 pt-5">
      <div
        className="w-full max-w-3xl p-6 sm:p-8 rounded-2xl
             bg-surface/20 backdrop-blur-md shadow-lg"
      >
        <h2 className="text-2xl sm:text-3xl font-bold text-[var(--text-primary)] mb-6 font-sans">Edit Profile</h2>
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

      <Modal open={modal?.open} onClose={closeModal} message={modal?.message} type={modal?.type} />
    </div>
  );
}

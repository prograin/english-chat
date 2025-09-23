import React from "react";
import ProfileField from "./ProfileField";
import { PROFILE_FIELDS } from "../../constants/fields";
import SaveButton from "../atoms/SaveButton";
import DiscardButton from "../atoms/DiscardButton";

export default function ProfileForm({ user, onChange, onSave, onDiscard, saving, isDirty }) {
  return (
    <form className="space-y-6">
      {PROFILE_FIELDS.map((field) => (
        <ProfileField key={field.name} field={field} value={user[field.name]} onChange={onChange} />
      ))}

      <div className="flex gap-3 mt-6">
        <SaveButton onClick={onSave} disabled={!isDirty || saving} saving={saving} />
        <DiscardButton onClick={onDiscard} disabled={!isDirty} />
      </div>
    </form>
  );
}

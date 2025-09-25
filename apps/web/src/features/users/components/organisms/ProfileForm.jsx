import React from "react";
import ProfileField from "../molecules/ProfileField";
import { PROFILE_FIELDS } from "../../constants/fields";
import SaveButton from "../atoms/SaveButton";
import DiscardButton from "../atoms/DiscardButton";
import FieldRow from "../molecules/FieldRow";

export default function ProfileForm({
  user,
  onChange,
  onSave,
  onDiscard,
  onChangeInterests,
  onChangeLocation,
  saving,
  isDirty,
  options,
}) {
  return (
    <form className="space-y-md font-sans">
      <FieldRow>
        <ProfileField field={PROFILE_FIELDS[0]} value={user.first_name} onChange={onChange} />
        <ProfileField field={PROFILE_FIELDS[1]} value={user.last_name} onChange={onChange} />
      </FieldRow>

      <FieldRow>
        <ProfileField field={PROFILE_FIELDS[2]} value={user.age} onChange={onChange} />
        <ProfileField field={PROFILE_FIELDS[3]} value={user.gender} onChange={onChange} />
      </FieldRow>

      <ProfileField field={PROFILE_FIELDS[4]} value={user.career} onChange={onChange} />
      <ProfileField field={PROFILE_FIELDS[5]} value={user.interests} onChange={onChangeInterests} />

      <FieldRow>
        <ProfileField
          field={{ ...PROFILE_FIELDS[6], options: options.countriesOption }}
          value={user.country}
          onChange={onChangeLocation}
        />
        <ProfileField
          field={{ ...PROFILE_FIELDS[7], options: options.statesOption }}
          value={user.state}
          onChange={onChangeLocation}
        />
        <ProfileField
          field={{ ...PROFILE_FIELDS[8], options: options.citiesOption }}
          value={user.city}
          onChange={onChangeLocation}
        />
      </FieldRow>

      <ProfileField field={PROFILE_FIELDS[9]} value={user.description} onChange={onChange} />

      <div className="flex gap-sm mt-md">
        <SaveButton
          onClick={onSave}
          disabled={!isDirty || saving}
          saving={saving}
          className="button-glass"
        />
        <DiscardButton onClick={onDiscard} disabled={!isDirty} className="button-glass" />
      </div>
    </form>
  );
}

// features/users/components/ProfileForm.component.jsx
import React from "react";

export default function ProfileForm({ user, onChange, onSave, onDiscard, saving, isDirty }) {
  return (
    <form className="profile-form">
      <label>
        First Name:
        <input name="firstName" value={user.firstName} onChange={onChange} />
      </label>
      <label>
        Last Name:
        <input name="lastName" value={user.lastName} onChange={onChange} />
      </label>
      <div style={{ marginTop: "1rem" }}>
        <button type="button" onClick={onSave} disabled={!isDirty || saving}>
          {saving ? "Saving..." : "Save"}
        </button>
        <button
          type="button"
          onClick={onDiscard}
          disabled={!isDirty}
          style={{ marginLeft: "1rem" }}
        >
          Discard
        </button>
      </div>
    </form>
  );
}

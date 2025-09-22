// features/users/hooks/useProfile.js
import { useEffect, useState, useCallback } from "react";
import { fetchUserProfile, updateUserProfile } from "../services/userService";
import { useAuthContext } from "../../auth/context/AuthContext";

export default function useProfile() {
  const [user, setUser] = useState({ first_name: "", last_name: "" });
  const [originalUser, setOriginalUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchUserProfile()
      .then((data) => {
        setUser(data);
        setOriginalUser(data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load profile");
        setLoading(false);
      });
  }, []);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  }, []);

  const handleSave = useCallback(async () => {
    setSaving(true);
    try {
      await updateUserProfile(user);
      setOriginalUser(user);
    } catch {
      setError("Failed to update profile");
    } finally {
      setSaving(false);
    }
  }, [user]);

  const handleDiscard = useCallback(() => setUser(originalUser), [originalUser]);

  const isDirty =
    user.first_name !== originalUser.first_name || user.last_name !== originalUser.last_name;

  return {
    user,
    loading,
    saving,
    error,
    isDirty,
    handleChange,
    handleSave,
    handleDiscard,
  };
}

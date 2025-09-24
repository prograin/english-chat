// features/users/hooks/useProfile.js
import { useEffect, useState, useCallback } from "react";
import { fetchUserProfile, updateUserProfile } from "../services/userService";
import { DEFAULT_PROFILE } from "../constants/defaults.js";
import { PROFILE_FIELDS } from "../constants/fields.js";
import { getStates, getCities, getCountries } from "../services/locationService.js";

export default function useProfile() {
  const [user, setUser] = useState({ first_name: "", last_name: "" });
  const [originalUser, setOriginalUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [statesOption, setStatesOption] = useState([]);
  const [citiesOption, setCitiesOption] = useState([]);
  const [countriesOption, setCountriesOption] = useState([]);

  useEffect(() => {
    fetchUserProfile()
      .then((data) => {
        const { id, user_id, latitude, longitude, capital, ...cleaned } = data;
        const normalized = { ...DEFAULT_PROFILE, ...cleaned };
        setUser(normalized);
        setOriginalUser(normalized);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load profile");
        setLoading(false);
      });

    setCountriesOption(getCountries());
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

  const handleInterests = useCallback(
    async (e) => {
      const { checked, value: option } = e.target;
      handleChange({
        target: {
          name: "interests",
          value: (user.interests || [])
            .concat(checked ? [option] : [])
            .filter((v) => checked || v !== option),
        },
      });
    },
    [handleChange, user.interests]
  );

  const handleLocation = useCallback(
    async (e) => {
      const { name, value } = e.target;
      if (name === "country") {
        const states = getStates(value);
        setStatesOption(states);
        setCitiesOption([]);
      } else if (name === "state") {
        const cities = getCities(value);
        setCitiesOption(cities);
      }
      handleChange({ target: { name, value } });
    },
    [handleChange]
  );

  const handleDiscard = useCallback(() => setUser(originalUser), [originalUser]);

  const isDirty = PROFILE_FIELDS.some((field) => {
    const key = field.name;
    return user[key] !== originalUser[key];
  });

  return {
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
  };
}

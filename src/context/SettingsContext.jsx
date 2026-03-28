import { createContext, useContext, useEffect, useState } from "react";
import { getCurrentSettings } from "../api/settings";

const SettingsContext = createContext(null);

export const SettingsProvider = ({ children }) => {
  const [settings, setSettings] = useState(null);
  const [settingsLoaded, setSettingsLoaded] = useState(false);

  const refreshSettings = async () => {
    try {
      const res = await getCurrentSettings();
      setSettings(res.data.settings ?? res.data);
    } catch (error) {
      console.error(error);
    } finally {
      setSettingsLoaded(true);
    }
  };

  useEffect(() => {
    refreshSettings();
  }, []);

  return (
    <SettingsContext.Provider value={{ settings, setSettings, refreshSettings, settingsLoaded }}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => useContext(SettingsContext);

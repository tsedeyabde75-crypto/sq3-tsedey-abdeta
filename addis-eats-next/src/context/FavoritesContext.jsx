"use client";
import { createContext, useContext, useState, useEffect } from "react";

const FavoritesContext = createContext();

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem("addis_eats_favorites");
    if (saved) {
      try {
        setFavorites(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to load favorites", e);
      }
    }
  }, []);

  const toggleFavorite = (item) => {
    setFavorites((prev) => {
      const exists = prev.some((fav) => fav.id === item.id);
      const updated = exists
        ? prev.filter((fav) => fav.id !== item.id)
        : [...prev, item];

      localStorage.setItem("addis_eats_favorites", JSON.stringify(updated));
      window.dispatchEvent(new Event("favoritesUpdated"));
      return updated;
    });
  };

  const removeFavorite = (id) => {
    setFavorites((prev) => {
      const updated = prev.filter((fav) => fav.id !== id);
      localStorage.setItem("addis_eats_favorites", JSON.stringify(updated));
      window.dispatchEvent(new Event("favoritesUpdated"));
      return updated;
    });
  };

  const isFavorite = (itemId) => {
    return favorites.some((fav) => fav.id === itemId);
  };

  return (
    <FavoritesContext.Provider
      value={{ favorites, toggleFavorite, removeFavorite, isFavorite }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

export const useFavorites = () => useContext(FavoritesContext);
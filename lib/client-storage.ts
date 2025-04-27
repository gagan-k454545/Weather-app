// Helper function to save search to localStorage
export const saveSearchToLocalStorage = (city: string) => {
  try {
    if (typeof window !== "undefined" && window.localStorage) {
      const searches = JSON.parse(localStorage.getItem("searches") || "[]")
      searches.unshift({ city, timestamp: new Date().toISOString() })
      localStorage.setItem("searches", JSON.stringify(searches.slice(0, 20)))
    }
  } catch (error) {
    console.warn("Failed to save search to localStorage:", error)
  }
}

// Helper function to get searches from localStorage
export const getSearchesFromLocalStorage = () => {
  try {
    if (typeof window !== "undefined" && window.localStorage) {
      return JSON.parse(localStorage.getItem("searches") || "[]")
    }
  } catch (error) {
    console.warn("Failed to get searches from localStorage:", error)
  }
  return []
}

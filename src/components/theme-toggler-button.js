import React, { useContext } from "react";
import { ThemeContext, themes } from "../context/theme-context";
import { Button } from '../components/button'

export const ThemeTogglerButton = () => {
    
    const { theme, setTheme } = useContext(ThemeContext)

    return (
        <div>
            <Button onClick= { () => setTheme(theme === themes.light ? themes.dark : themes.light)}>Alternar tema</Button>
        </div>
    )

}
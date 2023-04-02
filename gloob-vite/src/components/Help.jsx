import { useState } from "react";
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';

export default function Help() {
    const [showHelp, setShowHelp] = useState(false);
    return (
        <div className="flex flex-row items-center justify-center w-1/3 h-40">
            
            <HelpOutlineIcon sx={{color: 'white', fontSize: 40}} onCLick={() => setShowHelp(!showHelp)}/>
    
            <div className={"transition-all- duration-100 "+ (showHelp?"w-full":"w-0")}>
                <p>Click countries to start learning about deforestation! Click the satellite to be beamed 
                    to some organizations doing good work
                </p>
            </div>
        </div>
    )
}

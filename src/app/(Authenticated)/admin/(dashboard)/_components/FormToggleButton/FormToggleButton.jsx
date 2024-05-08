import styles from "./FormToggleButton.module.css";
import ToggleButton from 'react-toggle-button';
import { VscDebugBreakpointLogUnverified } from "react-icons/vsc";

export default function FormToggleButton({inactiveLabelText, activeLabelText, isRequired}){
    return (
        <div className={`${styles.toggleButtonContainer}`}>

            <label for={numberInputName} className={`${styles.numberInputLabel} font-montserrat`}>
                {labelText} {isRequired && `*`}
            </label>

            <ToggleButton
                inactiveLabel={inactiveLabelText}
                activeLabel={activeLabelText}
                colors={{
                    activeThumb: {
                        base: 'rgb(250,250,250)',
                    },
                    inactiveThumb: {
                        base: 'rgb(62,130,247)',
                    },
                    active: {
                        base: 'rgb(207,221,245)',
                        hover: 'rgb(177, 191, 215)',
                    },
                    inactive: {
                        base: 'rgb(65,66,68)',
                        hover: 'rgb(95,96,98)',
                    }
                }}
                // trackStyle={styles.trackStyle}
                // thumbStyle={styles.thumbStyle}
                thumbAnimateRange={[-10, 36]}
                thumbIcon={<VscDebugBreakpointLogUnverified />}
                value={null}
                onToggle={(value) => {
                    
                }}
            />

        </div>
    );
}
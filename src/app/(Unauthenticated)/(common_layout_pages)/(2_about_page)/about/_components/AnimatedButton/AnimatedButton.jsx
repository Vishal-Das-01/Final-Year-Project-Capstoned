"use client";

import { motion } from 'framer-motion';
import styles from "./AnimatedButton.module.css";
import { GiStripedSun } from "react-icons/gi";

export default function AnimatedButton({onClick}){

	const buttonVariants = {
		initial: {
			borderRadius: '50%',
		},
		hover: {
			borderRadius: '10px', 
			transition: {
				duration: 0.3,
				when: "beforeChildren", 
			}
		},
		unhover: {
			borderRadius: '50%',
			transition: {
				duration: 0.3,
				when: "afterChildren",
			}
		}
	};

	const innerDivVariants = {
	    initial: {
			borderRadius: '50%',
		},
		hover: {
			borderRadius: '10px',
			width: '100%',
			height: '100%',
			transition: {
				duration: 0.2,
				delay: 0.2,
			}
		},
		unhover: {
			borderRadius: '50%',
			transition: {
				duration: 0.1,
				delay: 0.2,
			}
		}	
  	};

	return (
		<>

			<motion.button 
				className={`${styles.btn} flex items-center justify-center relative rounded-full bg-neutral-700`}
				initial="initial"
				whileHover="hover"
				animate="unhover"
				variants={buttonVariants}
				onClick={onClick}
			>
				
				<motion.div 
					className={`${styles.innerDiv} flex items-center justify-center absolute rounded-full bg-blue-300`} 
					variants={innerDivVariants}
				/>
			
			</motion.button>

		</>
	);
}

// <GiStripedSun color={`white`} size={`25px`}/>
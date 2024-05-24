"use client";

import styles from "./TextContent.module.css";
import AnimatedButton from "../AnimatedButton/AnimatedButton.jsx";
import {useState} from "react";

export default function TextContent(){
	
	const [aboutDataIndex, setAboutDataIndex] = useState(0);

	const aboutData = [
		{
			"title": "Our Mission.",
			"text": "In the fast-paced world of technology and innovation, managing a final year project can be a daunting task for undergraduate students. Recognizing the need for a streamlined, efficient, and user-friendly platform, Capstoned was born. Capstoned is designed to bridge the gap between complex project management and academic requirements, facilitating a smoother journey from conception to completion."
		}, 
		{
			"title": "Features.",
			"text": "Capstoned is packed with features tailored to meet the unique demands of final year projects, including:",
			"features": [
				{
					"name": "Project Timeline Management: ",
					"description": "Visualize your project's progress with our intuitive timeline feature, helping you stay on track from start to finish"
				},
				{
					"name": "Collaboration Hub: ",
					"description": "Teamwork made easy with real-time collaboration tools, allowing team members to share ideas, documents, and feedback seamlessly."
				},
				{
					"name": "Milestone Tracking: ",
					"description": "Set and monitor key milestones to ensure your project meets its objectives and deadlines."
				},
				{
					"name": "Resource Allocation: ",
					"description": "Efficiently manage resources, assign tasks, and balance workloads to optimize team productivity."
				},
				{
					"name": "Supervisor Interaction: ",
					"description": "Streamline communication with your project supervisor through integrated messaging and feedback mechanisms."
				}
			]
		}, 
		{
			"title": "Why Capstoned?",
			"text": "Developed by students for students, Capstoned understands the unique challenges and pressures of final year projects. Our platform not only simplifies project management but also enhances the learning experience by encouraging organization, teamwork, and strategic planning. Whether you're an aspiring software developer, an innovative engineer, or a creative thinker, Capstoned is your companion on the journey to turning your academic goals into reality."
		},
		{
			"title": "Join Us.",
			"text": "Embrace the future of project management with Capstoned. Start your project with us today and experience a seamless, efficient, and rewarding project management journey. Together, let's bring your ideas to life and pave the way for future innovations."
		}
	];

	function handleClick(){
		if(aboutDataIndex + 1 === aboutData.length){
			setAboutDataIndex(0);
		}
		else{
			setAboutDataIndex((prevVal) => prevVal + 1);	
		}
	}

	return (
		<>

			<div className={`${styles.textContentWrapper} h-full flex flex-col items-center justify-center `}>

				<div className={`${styles.headingWrapper} w-full my-4 `}>

					<h1 className={`${styles.heading} font-montserrat font-semibold text-blue-300`}>
						{aboutData[aboutDataIndex].title}
					</h1>
					
				</div>

				<div className={`${styles.textWrapper} pr-4 overflow-y-scroll`}>

					{(aboutDataIndex != 1) ? 
						(
							<p className={`${styles.text} font-montserrat text-justify text-neutral-700`}>
								{aboutData[aboutDataIndex].text}
							</p>
						)
						: 
						(
							<>
								<p className={`${styles.text} font-montserrat text-justify text-neutral-700`}>
									{aboutData[aboutDataIndex].text}
								</p>
								<ul>
									{aboutData[aboutDataIndex].features.map((feature,index) => {
										return (<li key={index} className={`${styles.listItem}  text-neutral-700 my-1 text-justify font-montserrat`}>
													<span className={`text-blue-300 font-semibold`}>{feature.name}</span>
													{feature.description}
												</li>)
									})}
								</ul>
							</>
						)
					}

				</div>

			</div>

			<div className={`${styles.btnWrapper} h-full flex items-center justify-center `}>
				
				<AnimatedButton onClick={handleClick}/>

			</div>

		</>
	);
}
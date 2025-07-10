import React from 'react';
import { motion } from 'framer-motion';

const internationalCollege = new URL('../assets/2.png', import.meta.url).href;
const softwareEngineer= new URL('../assets/1.png', import.meta.url).href;

const educationData = [
	{
		institution: 'University of Tripoli',
		degree: 'Software Engineering',
		department: 'Faculty of Information Technology',
		image: softwareEngineer,
	},
	{
		institution: 'International College for Languages',
		degree: 'High Diploma in English Language',
		department: 'English Language Department',
		image: internationalCollege,
	},
];

const EducationCard = ({ item, index }) => (
	<motion.div
		initial={{ opacity: 0, x: 50 }}
		whileInView={{ opacity: 1, x: 0 }}
		viewport={{ once: true, amount: 0.2 }}
		transition={{ duration: 0.6, delay: index * 0.1 }}
		className="relative flex-shrink-0 w-[320px] h-[560px] rounded-3xl overflow-hidden shadow-2xl group"
	>
		<img
			src={item.image}
			alt={item.institution}
			className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
		/>
		<div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/20" />
		<div className="relative z-10 flex flex-col justify-between h-full p-6 text-white">
			<div>
				<h3 className="text-base font-semibold tracking-wide">{item.institution}</h3>
				<p className="text-2xl font-bold mt-1 tracking-tight">{item.degree}</p>
				<p className="text-sm font-bold mt-1 tracking-tight">{item.department}</p>
			</div>
			<div className="self-end">
				<button className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white text-2xl font-light transition-all hover:bg-white/30 hover:scale-110">
					+
				</button>
			</div>
		</div>
	</motion.div>
);

const Education = () => {
	return (
		<section
			id="education"
			className="min-h-screen bg-gray-100 dark:bg-gradient-to-br from-dark-start via-dark-mid to-dark-end py-24 sm:py-32 overflow-hidden"
		>
			<div className="container mx-auto px-6 lg:px-8">
				<div className="mb-12">
					<h2 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl">
						Get to know my Education.
					</h2>
				</div>
				<div className="flex overflow-x-auto space-x-8 -mx-6 px-6 pb-8">
					{educationData.map((item, index) => (
						<EducationCard key={index} item={item} index={index} />
					))}
				</div>
			</div>
		</section>
	);
};

export default Education;

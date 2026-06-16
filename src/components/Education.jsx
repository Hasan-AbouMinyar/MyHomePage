import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

const internationalCollege = new URL('../assets/2.png', import.meta.url).href;
const softwareEngineer= new URL('../assets/1.png', import.meta.url).href;

const EducationCard = ({ item, image }) => (
	<div
		className="group relative h-[500px] w-[min(82vw,320px)] flex-shrink-0 snap-start overflow-hidden rounded-3xl shadow-2xl sm:h-[560px]"
	>
		<img
			src={image}
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
	</div>
);

const Education = () => {
	const { t } = useLanguage();
	const educationItems = t('education.items') || [];
	const educationImages = [softwareEngineer, internationalCollege];

	return (
		<section
			id="education"
			className="min-h-screen overflow-hidden bg-white py-20 dark:bg-black sm:py-32"
		>
			<motion.div
				initial={{ opacity: 0, scale: 0.96, filter: 'blur(10px)' }}
				whileInView={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
				viewport={{ once: false, amount: 0.15 }}
				transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
				className="container mx-auto px-6 lg:px-8"
			>
				<div className="mb-10 sm:mb-12">
					<h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-5xl">
						{t('education.title')}
					</h2>
					<p className="mt-4 text-base leading-7 text-zinc-600 dark:text-zinc-400 sm:text-lg">
						{t('education.subtitle')}
					</p>
				</div>
				<div className="scrollbar-none flex snap-x snap-mandatory gap-5 overflow-x-auto pb-8 sm:gap-8">
					{educationItems.map((item, index) => (
						<EducationCard 
							key={index} 
							item={item} 
							image={educationImages[index]} 
						/>
					))}
				</div>
			</motion.div>
		</section>
	);
};

export default Education;

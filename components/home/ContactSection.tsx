import React from 'react';

interface ContactSectionProps {
	mapEmbedId: string;
}

const ContactSection: React.FC<ContactSectionProps> = ({ mapEmbedId }) => {
	return (
		<>
			{/* Contact Section - Full width */}
			<div id="contact" className="w-full bg-neutral-900 py-16">
				<div className="max-w-6xl mx-auto px-4">
					<div className="text-center mb-12 relative">
						<h3
							className="text-4xl font-extrabold text-center text-white uppercase tracking-wider relative z-10 inline-block px-8 py-2"
							style={{
								fontFamily: "'Courier New', monospace",
								textShadow: '2px 2px 0 rgba(0,0,0,0.5)',
								background:
									'linear-gradient(to right, rgba(153, 27, 27, 0.8), rgba(120, 20, 20, 0.8))',
								borderRadius: '0.5rem',
								boxShadow:
									'0 4px 10px rgba(0,0,0,0.3), inset 0 0 0 2px rgba(255,255,255,0.1)',
								transform: 'rotate(-1deg)',
							}}
						>
							Contact us
						</h3>
						<div
							className="absolute h-1 w-32 bg-amber-300 left-1/2 transform -translate-x-1/2 bottom-0 z-0"
							style={{
								boxShadow: '0 0 8px rgba(251, 191, 36, 0.6)',
								transform: 'translateY(6px) rotate(1deg)',
							}}
						></div>
					</div>

					<p className="text-center text-gray-300 mb-8">Write or call us!</p>

					{/* Contact buttons - moved above the map */}
					<div className="flex flex-col md:flex-row justify-center items-center gap-6 mb-12">
						<a
							href="tel:+40721234567"
							className="inline-flex items-center bg-neutral-800 text-white px-6 py-3 rounded-md font-bold 
              hover:bg-neutral-700 focus:ring-2 focus:ring-neutral-700 focus:outline-none 
              transition-colors transform hover:-translate-y-0.5 shadow-md border border-neutral-700
              uppercase tracking-wide"
							style={{ fontFamily: "'Courier New', monospace" }}
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="h-5 w-5 mr-2"
								viewBox="0 0 20 20"
								fill="currentColor"
							>
								<path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
							</svg>
							Call Now
						</a>
						<a
							href="mailto:contact@taqueria.ro"
							className="inline-flex items-center bg-red-800 text-white px-6 py-3 rounded-md font-bold 
              hover:bg-red-700 focus:ring-2 focus:ring-red-700 focus:outline-none 
              transition-colors transform hover:-translate-y-0.5 shadow-md border border-red-700
              uppercase tracking-wide"
							style={{ fontFamily: "'Courier New', monospace" }}
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="h-5 w-5 mr-2"
								viewBox="0 0 20 20"
								fill="currentColor"
							>
								<path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
								<path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
							</svg>
							Email Us
						</a>
					</div>

					{/* Weekly Schedule Table */}
					<div className="mx-auto max-w-3xl mb-16">
						<div className="text-center mb-8 relative">
							<h3
								className="text-3xl font-extrabold text-center text-amber-300 uppercase tracking-wide relative z-10 inline-block px-6 py-1"
								style={{
									fontFamily: "'Courier New', monospace",
									textShadow: '2px 2px 0 rgba(0,0,0,0.5)',
									transform: 'rotate(-1deg)',
								}}
							>
								Our Opening Hours
							</h3>
							<div
								className="absolute h-1 w-24 bg-red-600 left-1/2 transform -translate-x-1/2 bottom-0 z-0"
								style={{
									boxShadow: '0 0 8px rgba(220, 38, 38, 0.6)',
									transform: 'translateY(4px) rotate(1deg)',
								}}
							></div>
						</div>

						<div
							className="relative overflow-hidden rounded-lg transform rotate-0.5deg"
							style={{
								boxShadow:
									'0 15px 25px -12px rgba(0,0,0,0.6), 0 0 10px rgba(0,0,0,0.25) inset',
							}}
						>
							{/* Card background with texture */}
							<div
								className="absolute inset-0 bg-neutral-800"
								style={{
									backgroundImage:
										"url('https://www.transparenttextures.com/patterns/concrete-wall.png')",
									opacity: 0.9,
								}}
							></div>

							{/* Stylized border */}
							<div className="absolute inset-0 border-2 border-neutral-700 rounded-lg opacity-60"></div>

							{/* Red accent corner */}
							<div
								className="absolute w-16 h-16 bg-red-700 -right-8 -top-8 rotate-45"
								style={{
									boxShadow: '0 0 8px rgba(185, 28, 28, 0.5) inset',
								}}
							></div>

							{/* Table Content */}
							<div className="relative p-6 z-10">
								<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
									{/* Day Column */}
									<div className="space-y-4">
										{[
											{ day: 'Monday', hours: '11:00 - 22:00' },
											{ day: 'Tuesday', hours: '11:00 - 22:00' },
											{ day: 'Wednesday', hours: '11:00 - 23:00' },
											{ day: 'Thursday', hours: '11:00 - 23:00' },
											{ day: 'Friday', hours: '11:00 - 00:00' },
											{ day: 'Saturday', hours: '12:00 - 00:00' },
											{ day: 'Sunday', hours: '12:00 - 22:00' },
										].map((item, index) => (
											<div
												key={index}
												className="flex items-center p-2 transition-transform duration-200 hover:translate-x-1"
											>
												<div
													className="text-red-600 font-bold text-lg mr-3"
													style={{
														textShadow: '0 0 3px rgba(220, 38, 38, 0.3)',
													}}
												>
													•
												</div>
												<div className="flex-1 flex justify-between items-center">
													<span
														className="text-white font-bold tracking-wide"
														style={{
															fontFamily: "'Courier New', monospace",
															textShadow: '1px 1px 0 rgba(0,0,0,0.5)',
														}}
													>
														{item.day}
													</span>
													<div className="flex-grow mx-4 border-b-2 border-dotted border-neutral-600 opacity-40"></div>
													<span
														className="text-amber-300 font-medium"
														style={{
															fontFamily: "'Courier New', monospace",
															textShadow: '1px 1px 0 rgba(0,0,0,0.5)',
														}}
													>
														{item.hours}
													</span>
												</div>
											</div>
										))}
									</div>

									{/* Notes Column */}
									<div
										className="p-5 bg-neutral-900 rounded-lg border border-neutral-700 flex flex-col justify-between"
										style={{
											backgroundImage:
												'linear-gradient(135deg, rgba(40, 38, 38, 0.9) 0%, rgba(25, 25, 25, 0.9) 100%)',
											boxShadow:
												'0 4px 15px rgba(0,0,0,0.2), 0 1px 3px rgba(0,0,0,0.3) inset',
										}}
									>
										<div>
											<h4
												className="text-red-600 font-bold mb-5 uppercase tracking-wider"
												style={{
													fontFamily: "'Courier New', monospace",
													textShadow: '1px 1px 0 rgba(0,0,0,0.5)',
													borderBottom: '1px solid rgba(185, 28, 28, 0.3)',
													paddingBottom: '0.5rem',
												}}
											>
												Special Notes
											</h4>
											<ul className="space-y-3.5">
												{[
													'Happy Hour: Monday-Friday 16:00-20:00',
													'Live Music: Friday & Saturday from 20:00',
													'Taco Tuesday: 25% off all tacos!',
													'Sunday Family Special: Kids eat free',
												].map((note, index) => (
													<li
														key={index}
														className="text-gray-300 text-sm flex items-start group transition-all duration-200 hover:translate-x-1"
													>
														<span
															className="text-amber-300 mr-2 transition-all duration-200 group-hover:scale-110"
															style={{
																textShadow: '0 0 3px rgba(251, 191, 36, 0.4)',
															}}
														>
															✓
														</span>
														<span>{note}</span>
													</li>
												))}
											</ul>
										</div>
										<div
											className="text-xs text-amber-200 mt-5 p-2 bg-neutral-800 bg-opacity-50 border-t border-neutral-700 font-medium uppercase tracking-wide text-center rounded"
											style={{
												fontFamily: "'Courier New', monospace",
												boxShadow: '0 2px 4px rgba(0,0,0,0.2) inset',
											}}
										>
											Kitchen closes 30 minutes before closing time
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* Truly full-width map container (edge-to-edge) */}
			<div className="w-full h-[600px] relative">
				{/* Google Maps integration using map ID */}
				<iframe
					className="absolute inset-0 w-full h-full border-0"
					src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2848.8331711076716!2d26.10100941554901!3d44.44147297910183!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40b1ff4770adb5b7%3A0xb89d1b5b2fc13e80!2s123%20Strada%20Mihai%20Eminescu%2C%20Bucure%C8%99ti!5e0!3m2!1sen!2sro!4v1603456384249!5m2!1sen!2sro!3m2!1sid!2s${encodeURIComponent(
						mapEmbedId
					)}!4v1603456384249`}
					allowFullScreen
					loading="lazy"
					referrerPolicy="no-referrer-when-downgrade"
					title="Taqueria Location Map"
				></iframe>
			</div>
		</>
	);
};

export default ContactSection;

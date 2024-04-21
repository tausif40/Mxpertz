import React, { useEffect, useState } from 'react';
import './design2.css';
import NavBar from '../NavBar/NavBar';
import { cardDataUrl } from '../../app.url';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Loader from '../Loading/Loader';

function Design2() {
	const params = useParams();
	const [ cartDetails, setCartDetails ] = useState();
	const [ isLoading, setIsLoading ] = useState(false);
	const [ selectedTab, setSelectedTab ] = useState('Wordexplore');
	const [ noItem, setNoItem ] = useState(false);
	const [ showAnswer, setShowAnswer ] = useState([]);

	const changeOption = (option) => {
		setSelectedTab(option);
	};
	const toggleShowAnswer = (index) => {
		setShowAnswer((prevShowAnswer) => {
			const newShowAnswer = [ ...prevShowAnswer ];
			newShowAnswer[ index ] = !newShowAnswer[ index ];
			return newShowAnswer;
		});
	}
	useEffect(() => {
		setIsLoading(true);
		axios
			.get(cardDataUrl + `/${params._id}`)
			.then((response) => {
				setCartDetails(response.data);
				setIsLoading(false);
				if (response.data.Wordexplore.length === 0) {
					setNoItem(true)
				}
			})
			.catch((err) => {
				console.log(err);
			});
	}, [ params._id ]);

	return (
		<>
			<section className='section'>
				<header className='container'>
					<NavBar />
					<div className='navHeading text-2xl font-bold text-white flex justify-center py-10'>
						<p><span>The Lost City of</span> Future Earth</p>
					</div>
				</header>
				<div className='cartDetails text-white'>
					<div className='container flex justify-center items-center flex-col pt-10'>
						<div className='flex gap-14'>
							<div className={`button exploreBtn ${selectedTab === 'Wordexplore' ? 'active' : ''}`}
								onClick={() => changeOption('Wordexplore')}>
								World Explore
							</div>

							<div className={`button storyBtn ${selectedTab === 'Storyadvenure' ? 'active' : ''}`}
								onClick={() => changeOption('Storyadvenure')}>
								Story Adventure
							</div>
							<div className={`button questBtn ${selectedTab === 'Brainquest' ? 'active' : ''}`}
								onClick={() => changeOption('Brainquest')}>
								Brain Quest
							</div>
						</div>
						<p className='py-8 text-sm'>Drag Picture to the matching Words, Light up correct pairs, shake for a retry</p>
					</div>
					<div className='container mt-8 flex gap-5 w-full items-start'>
						<div className='w-[39rem]'>
							<div className='mainCard p-2'>
								<div>
									<span className='correction text-xl font-bold'>Correction</span>
									<span className='text'> (Noun)</span>
								</div>
								<p className='text-xs pb-2'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque neque assumenda esse nostrum.</p>
								<img src='/assets/images/dummy-img.jpg' alt='' className='' />
							</div>
							<div className='next-pre flex justify-center gap-16 my-5'>
								<button className='size-10'>&lt;</button>
								<button className='size-10'>&gt;</button>
							</div>
						</div>
						<div className='flex gap-2 flex-wrap justify-center w-full mb-10'>
							{noItem && (<div className='text-5xl'>No item</div>)}
							{isLoading ? (<Loader />) : selectedTab === 'Wordexplore' ? (
								cartDetails?.Wordexplore.map((data) => (
									<div className='Wordexplore w-44 p-2' key={data._id}>
										<img src={`https://ik.imagekit.io/dev24/${data?.Storyimage[ 0 ]}`} alt='img' />
										<p className='text-xs my-2'>{data.Storyitext}</p>
									</div>
								))
							) : selectedTab === 'Storyadvenure' ? (
								cartDetails?.Storyadvenure.content.map((data, index) => (
									<div className='Storyadvenure w-full p-2 mb-4' key={index}>
										<img src={`https://ik.imagekit.io/dev24/${data?.Storyimage[ 0 ]}`} alt='' className='size-52 mr-4 mb-4 float-left' />
										{data?.Paragraph.map((item, index) => (
											<p className='text-xs mb-2' key={index}>{item}</p>
										))}
									</div>
								))
							) : selectedTab === 'Brainquest' ? (
								cartDetails?.Brainquest.map((data, index) => (
									<div className='cartOption w-[48%] p-2 mb-2' key={index}>
										<p><span className='font-bold'>Q. </span>{data?.Question}</p>
										{data?.Option.map((option, index) => (
											<p p className='text-xs my-2' key={option} > <span className='font-bold'>opt-{index + 1}) </span> {option} </p>
										))}
										<p className='h-12'><span className='font-bold ans' onClick={() => toggleShowAnswer(index)}>Show Answer: {' '}</span> {showAnswer[ index ] && <span>{data?.Answer}</span>} </p>
									</div>
								))
							) : null}
						</div>
					</div>
				</div>
			</section >
		</>
	);
}

export default Design2;

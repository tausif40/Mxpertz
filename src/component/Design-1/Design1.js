import React, { useEffect, useState } from 'react'
import './design1.css'
import { cardDataUrl } from '../../app.url';
import axios from 'axios';
import { Link } from 'react-router-dom';
import NavBar from '../NavBar/NavBar';
import Loader from '../Loading/Loader';

function Design1() {
	const [ cardData, setCartData ] = useState([]);
	const [ isLoading, setIsLoading ] = useState(false);
	const [ currentPage, setCurrentPage ] = useState(1)
	const cartInPage = 8;

	useEffect(() => {
		setIsLoading(true)
		axios.get(cardDataUrl)
			.then((response) => {
				setCartData(response.data)
				setIsLoading(false)
			}).catch((err) => {
				console.log(err);
			});
	}, [])

	const lastCard = currentPage * cartInPage;
	const fistCart = lastCard - cartInPage;
	const currentCart = cardData.slice(fistCart, lastCard)

	if (currentPage > 1) {

	}
	return (
		<>
			<main>
				<div className='topBar container'>
					<NavBar />/
				</div >
				{/* <div className='wave'> </div> */}
				<section className='pt-16'>
					<div className='flex justify-center items-center flex-col'>
						<h2 className='text-3xl font-bold text-white'>Science Fiction Stories</h2>
						<div className='infoBtnGroup flex gap-5 pt-12 text-white flex-wrap justify-center'>
							<div className='button bg-[#1c84ff]'>New</div>
							<div className='button bg-[#ffbf1a]'>In Progress</div>
							<div className='button bg-[#22d154]'>Completed</div>
							<div className='button clearBtn'>Clear All</div>
						</div>
					</div >
				</section >

				<section className='cartBg mt-40'>
					<svg viewBox="0 0 500 200" preserveAspectRatio="xMinYMin meet">
						<path d="M0, 100 C150, 150 300, 50 500, 100 L500, 200 L0, 200 Z" style={{ stroke: 'none', fill: '#0d031e' }}></path>
					</svg>
					<div className='container flex flex-wrap justify-center gap-4'>
						{isLoading === true ? <Loader /> :
							currentCart.map((value,) => (
								<Link to={`/cartDetails/${value._id}`} className='z-20 cursor-default'>
									<div className='card p-4 rounded-xl mb-10'>
										<img src={`https://ik.imagekit.io/dev24/${value?.Image[ 0 ]}`} alt="img break" className='w-72 h-72 cursor-pointer rounded-md' />
										<p className='text-white py-3'>{value.Title}</p>
										<button className={`button w-full bg-white font-semibold ${value.Status === "New" ? 'text-[#1c84ff]' : value.Status === "In Progress" ? 'text-[#ffbf1a]' : value.Status === 'Completed' ? 'text-[#40c556]' : ''}`}>{value.Status}</button>
									</div>
								</Link>
							))}
					</div>
					<div className='ChangePage container text-xl font-bold pb-10'>
						{currentPage > 1 && (
							<button className='previousBtn' onClick={() => { setCurrentPage(currentPage - 1) }}>&lt; Previous</button>
						)}
						{currentCart.length === cartInPage && (
							<button className='nextBtn' onClick={() => { setCurrentPage(currentPage + 1) }}> Next &gt;</button>
						)}
					</div>
				</section>
			</main >
		</>
	)
}

export default Design1;
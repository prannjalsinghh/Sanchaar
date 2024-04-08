import React from 'react';
import user1 from '../images/Home/user1.png';
import user3 from '../images/Home/user3.png';
import shield from '../images/Home/shield-fill.png';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

const InvitePeople = () => {
    return (
        <div className='w-11/12 mx-auto pb-20'>
            <div className='flex items-center justify-between mb-4'>
                <p className='font-semibold text-sm text-[#416C87]'>Invite on imagebook</p>
                <p className='underline font-semibold text-[#47B5FF] text-xs'>More</p>
            </div>
            <div className='mb-6'>
                <Swiper
                    spaceBetween={5}
                    slidesPerView={3}
                    onSlideChange={() => {}}
                    onSwiper={(swiper) => {}}
                >
                    <SwiperSlide>
                        <div className='bg-[#EBF1F4] w-[100px] h-[123px] rounded-2xl flex flex-col items-center justify-center space-y-1'>
                            <img src={user1} alt="" />
                            <p className='text-xs text=[#416C87] '>Martin</p>
                            <div className='w-[70px] h-[20px] bg-gradient-to-r from-[#6A11CB] to-[#2575FC] rounded-[30px] flex items-center justify-center space-x-1'>
                                <img src={shield} alt="" />
                                <p className='font-semibold text-xs text-white'>134%</p>
                            </div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className='bg-[#EBF1F4] w-[100px] h-[123px] rounded-2xl flex flex-col items-center justify-center space-y-1'>
                            <img src={user3} alt="" />
                            <p className='text-xs text=[#416C87] '>Sebastin</p>
                            <div className='w-[70px] h-[20px] bg-gradient-to-r from-[#6A11CB] to-[#2575FC] rounded-[30px] flex items-center justify-center space-x-1'>
                                <img src={shield} alt="" />
                                <p className='font-semibold text-xs text-white'>134%</p>
                            </div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className='bg-[#EBF1F4] w-[100px] h-[123px] rounded-2xl flex flex-col items-center justify-center space-y-1'>
                            <img src={user3} alt="" />
                            <p className='text-xs text=[#416C87] '>Sebastin</p>
                            <div className='w-[70px] h-[20px] bg-gradient-to-r from-[#6A11CB] to-[#2575FC] rounded-[30px] flex items-center justify-center space-x-1'>
                                <img src={shield} alt="" />
                                <p className='font-semibold text-xs text-white'>134%</p>
                            </div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className='bg-[#EBF1F4] w-[100px] h-[123px] rounded-2xl flex flex-col items-center justify-center space-y-1'>
                            <img src={user1} alt="" />
                            <p className='text-xs text=[#416C87] '>Martin</p>
                            <div className='w-[70px] h-[20px] bg-gradient-to-r from-[#6A11CB] to-[#2575FC] rounded-[30px] flex items-center justify-center space-x-1'>
                                <img src={shield} alt="" />
                                <p className='font-semibold text-xs text-white'>134%</p>
                            </div>
                        </div>
                    </SwiperSlide>
                </Swiper>
            </div>

        </div>
    );
};

export default InvitePeople;
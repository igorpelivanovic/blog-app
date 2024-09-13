import { HTMLMotionProps, motion } from "framer-motion"
import { forwardRef } from "react";
import { FaXmark } from "react-icons/fa6";
import { FaCircleXmark } from "react-icons/fa6";
import { RiLoader3Fill } from "react-icons/ri";
import { FaUser } from "react-icons/fa";
import { FaEye } from "react-icons/fa";


const animateConfigData: HTMLMotionProps<'div'> = {
    initial: {
        opacity: 0,
        height: "0",
    },
    animate: {
        opacity: 1,
        height: "auto",

    },
    transition: {
        duration: .4,
        ease: 'easeInOut',
        opacity: {
            duration: .2,
            ease: 'easeInOut',
        }
    },
    exit: {
        opacity: 0,
        height: 0,

    }
}


const SearchBox = forwardRef(()=> {
    return(
        <motion.div {...animateConfigData} className="absolute top-0 overflow-hidden left-1/2 -translate-x-1/2 w-3/5 bg-white rounded-b-lg px-5 flex flex-col justify-end gap-8 box-shadow-1">
            <div className="flex w-full justify-between mt-3">
                <p className="first-letter:capitalize text-2xl font-semibold">search</p>
                <button type="button" className="p-1"><FaXmark /></button>
            </div>
            <div>
                <form>
                    <label htmlFor="search" className="flex items-center w-full border-2 py-1 px-2 rounded-md gap-1">
                        <input type="search" id="search" name="search" placeholder="search post..." className="flex-1 outline-none placeholder:capitalize" />
                        <button type="button">
                            <FaCircleXmark />
                        </button>
                    </label>
                </form>
            </div>
            <div className="mb-5 space-y-5">
                {/* <div className="text-center">
                    <RiLoader3Fill className="mx-auto text-3xl animate-rotate-full-linear" />
                </div> */}
                <div className="grid grid-cols-3 gap-6">
                    <div className="grid grid-rows-subgrid row-span-2 gap-0 border border-gray-500 rounded-lg overflow-hidden cursor-pointer group">
                        <div className="aspect-square border-image-fill-gradient group-hover:border-image-fill-gradient-hover relative overflow-hidden">
                            <img src="https://picsum.photos/id/1/200/200" className="object-cover w-full h-full " />                        
                            <div className="absolute top-full left-0 group-hover:-translate-y-full w-full transition">
                                <p className="w-full inline-flex justify-between py-1 px-2 items-center" >
                                    <a href="" className="inline-flex gap-1 items-center hover:underline"><FaUser />username</a>
                                    <span className="inline-flex gap-1 items-center" ><FaEye />254</span>
                                </p>
                            </div>
                        </div>
                        <div className="p-2 overflow-hidden gap-2 flex flex-col justify-between">
                            <p className="font-semibold text-lg">His mother had always taught him</p>
                            <p className="text-sm font-semibold text-gray-500 space-x-2 overflow-hidden text-end text-ellipsis">
                                <a href="" className="hover:underline">#history</a>
                                <a href="" className="hover:underline">#american</a>
                                <a href="" className="hover:underline">#american</a>
                            </p>
                        </div>
                    </div>
                    
                </div>
                <div className="text-center">
                    <button type="button" className="bg-black text-white capitalize py-1 px-8 rounded-xl">more</button>
                </div>
            </div>
        </motion.div>
    )
})

export default SearchBox
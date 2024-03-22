import React, { useEffect } from "react"
import Glide from "@glidejs/glide"

export default function CarouselLogo() {
  useEffect(() => {
    const slider = new Glide(".glide-09", {
      type: "carousel",
      autoplay: 1,
      animationDuration: 6500,
      animationTimingFunc: "linear",
      perView: 4,
      classes: {
        nav: {
          active: "[&>*]:bg-wuiSlate-700",
        },
      },
      breakpoints: {
        1024: {
          perView: 2,
        },
        640: {
          perView: 1,
          gap: 16,
        },
      },
    }).mount()

    return () => {
      slider.destroy()
    }
  }, [])

  return (
    <>
    <div className='mx-6 flex justify-center items-center flex-col ' id ="sponsor">
        <h1 className='fontsponsor font-bold lg:text-5xl md:text-4xl text-4xl my-20 text-white'>InnovateU Partners</h1>
        {/* <div className='h-2 w-56 bg-purple-600 rounded-full'></div> */}
      </div>
      {/*<!-- Component: Testimonial carousel --> */}
      <div className="glide-09 relative w-full">
        {/* <!-- Slides --> */}
        <div data-glide-el="track">
          <ul className="whitespace-no-wrap flex-no-wrap [backface-visibility: hidden] [transform-style: preserve-3d] [touch-action: pan-Y] [will-change: transform] relative flex w-full overflow-hidden p-0">
            {/* <li>
              <img
                src="https://res.cloudinary.com/dst73auvn/image/upload/v1708706777/cutm_fx3suh.png"
                className="m-auto h-20 max-h-full w-auto max-w-full"
              />
            </li> */}
            <li>
              <img
                src="https://res.cloudinary.com/dst73auvn/image/upload/v1708706562/GeeksforGeekslogo_xeopue.png"
                className="m-auto h-20 max-h-full w-auto max-w-full"
              />
            </li>
            <li>
              <img
                src="https://res.cloudinary.com/dst73auvn/image/upload/v1708894953/gramtaranglogo-removebg-preview_iye5iz.png"
                className="m-auto h-20 max-h-full w-auto max-w-full"
              />
            </li>
            <li>
              <img
                src="https://res.cloudinary.com/dst73auvn/image/upload/v1708895114/GT_Tech_nmck1u.png"
                className="m-auto h-20 max-h-full w-auto max-w-full"
              />
            </li>
            <li>
              <img
                src="https://res.cloudinary.com/dst73auvn/image/upload/v1708926623/ieee_fgsw6d.png"
                className="m-auto h-20 max-h-full w-auto max-w-full"
              />
            </li>
            {/* <li>
              <img
                src="https://Tailwindmix.b-cdn.net/carousel/logos/carousel-logo-image-6.svg"
                className="m-auto h-20 max-h-full w-auto max-w-full"
              />
            </li> */}
          </ul>
        </div>
      </div>
      {/*<!-- End Testimonial carousel --> */}
    </>
  )
}
import React from 'react'

const Spinner = () => {
  
  return (
    <div className='h-[80vh] flex justify-center items-center absolute'>
      <style jsx>
{`
@keyframes rotate {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

/* Apply the rotation animation to the image */
.img-rotation {

  /* Apply the animation */
  animation: rotate linear infinite;
}

/* Speed control using animation-duration */
.img-rotation-slow {
  animation-duration: 10s; /* Adjust the duration for slower rotation */
}

.img-rotation-fast {
  animation-duration: 1s; /* Adjust the duration for faster rotation */
}
`}
</style>
      <div className='flex flex-col items-center justify-center gap-2'>
      <img
                src="https://res.cloudinary.com/dst73auvn/image/upload/v1698952130/2-removebg-preview_ljkree.png"
                alt=""
                className="h-1/8 w-28 -scale-90 img-rotation img-rotation-fast"
              />
              <div class="race-by"></div>
      </div>

</div>
  )
}

export default Spinner


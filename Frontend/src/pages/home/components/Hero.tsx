

const Hero = () => {
  return (
    <>
       <div className="container relative mx-auto flex min-h-screen flex-col gap-16 px-4 py-16 text-center lg:flex-row lg:gap-0 lg:px-8 lg:py-32 lg:text-left xl:max-w-7xl">

       {/* <div className="container relative mx-auto flex flex-col gap-16 px-4 py-16 text-center lg:flex-row lg:gap-0 lg:px-8 lg:py-32 lg:text-left xl:max-w-7xl"> */}
      <div className="lg:flex lg:w-1/2 lg:items-center">
        <div>
   
          <h1 className="mb-4 text-4xl font-black text-black dark:text-white">
            Shop Smarter 
            <span className="text-blue-600 dark:text-blue-500">
              Live Better.
            </span>
          </h1>
          <h2 className="text-xl font-medium leading-relaxed text-gray-700 dark:text-gray-300">
Discover top deals, trending products, and exclusive offers—all in one place.
          </h2>
          <div className="flex flex-col justify-center gap-2 pb-16 pt-10 sm:flex-row sm:items-center lg:justify-start">
          
          </div>
        </div>
      </div>
      <div className="lg:ml-16 lg:flex lg:w-1/2 lg:items-center lg:justify-center">
        <div className="relative mx-5 lg:w-96">
          <div className="bg-tranparent absolute left-0 top-0 -ml-20 -mt-16 size-40 rounded-full border border-blue-200 dark:border-blue-900 lg:size-72" />
          <div className="bg-tranparent absolute left-0 top-0 -ml-14 -mt-20 size-40 rounded-full border border-blue-100 dark:border-blue-950 lg:size-72" />
          <div className="bg-tranparent absolute bottom-0 right-0 -mb-16 -mr-20 size-40 rounded-full border border-blue-200 dark:border-blue-900 lg:size-72" />
          <div className="bg-tranparent absolute bottom-0 right-0 -mb-20 -mr-14 size-40 rounded-full border border-blue-100 dark:border-blue-950 lg:size-72" />
          <div className="absolute inset-0 -m-6 -rotate-2 rounded-xl bg-gray-200 dark:bg-gray-800" />
          <div className="absolute inset-0 -m-6 rotate-1 rounded-xl bg-blue-800/75 shadow-inner dark:bg-blue-900/75" />
          <img
            src="https://tse1.mm.bing.net/th/id/OIP.Z9blStOWK3BjYPqLfLt1rwHaE4?rs=1&pid=ImgDetMain&o=8&rm=4"
            className="relative mx-auto rounded-lg shadow-lg"
            alt="Hero Image"
          />
        </div>
      </div>
    </div>
    </>
  )
}

export default Hero
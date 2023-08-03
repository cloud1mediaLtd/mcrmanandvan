import { createSignal } from 'solid-js';

function Gallery({ images }) {
    const [isOpen, setIsOpen] = createSignal(true);
    const [currentIndex, setCurrentIndex] = createSignal(0); // The first image (at index 0) is selected by default

    const openLightbox = (index: any) => {
        setCurrentIndex(index);
        setIsOpen(true);
    };

    // const closeLightbox = () => {
    //    setIsOpen(false);
    // };

    const nextImage = () => {
        setCurrentIndex((currentIndex() + 1) % images.length);
    };

    const previousImage = () => {
        setCurrentIndex((currentIndex() + images.length - 1) % images.length);
    };

    return (
        <div class='px-5 lg:px-0'>


            {isOpen() && (
                <div class='relative pb-5' id="lightbox" >
                    <img class='rounded-xl overflow-hidden max-h-96 w-full object-cover' src={images[currentIndex()]} alt="" />
                    <button
                        style={{ position: 'absolute', top: '50%', left: '10px', transform: 'translateY(-50%)' }}
                        onClick={previousImage}
                    >
                        <div class="bg-white rounded-full p-1 shadow hover:shadow-md">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ height: '24px', width: '24px' }}>
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                            </svg>
                        </div>

                    </button>
                    <button
                        style={{ position: 'absolute', top: '50%', right: '10px', transform: 'translateY(-50%)' }}
                        onClick={nextImage}
                    >
                        <div class="bg-white rounded-full p-1 shadow hover:shadow-md">

                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ height: '24px', width: '24px' }}>
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                            </svg>
                        </div>
                    </button>
                </div>
            )}
            <div class='flex pb-2 gap-1'>
                {images.map((src: string | undefined, index: any) => (
                    <img
                        src={src}
                        alt={`image-${index}`}
                        style={{ cursor: "pointer" }}
                        onClick={() => openLightbox(index)}
                        class={` rounded-xl overflow-hidden object-cover h-14 ${index === currentIndex() ? 'activeimage' : ''}`}
                    />
                ))}
            </div>
        </ div>
    );
}

export default Gallery;
